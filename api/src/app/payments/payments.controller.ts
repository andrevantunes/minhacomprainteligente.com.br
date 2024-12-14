import {
  Controller,
  Get,
  Post,
  // Body,
  // Put,
  // Param,
  // Delete,
  // UseGuards,
  // SerializeOptions,
  HttpCode,
  HttpStatus,
  // Logger,
  Req,
  Res,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CartsService } from '../carts/carts.service';
import { OrdersService } from '../orders/orders.service';
// import { CreatePageDto } from './dto/create-page.dto';
// import { UpdatePageDto } from './dto/update-page.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// import { Roles } from '../roles/roles.decorator';
// import { RoleEnum } from '../roles/roles.enum';
// import { AuthGuard } from '@nestjs/passport';
// import { RolesGuard } from '../roles/roles.guard';
import PagarmeTransaction from '../../utils/pagarme';
import { ProductsService } from '../products/products.service';

@ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Payments')
@Controller({
  path: 'payments',
  version: '1',
})
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly ordersService: OrdersService,
    private readonly cartsService: CartsService,
    private readonly productsService: ProductsService,
  ) {}

  private async recaptcha(token?: string, expectedAction = 'PAY') {
    if (!process.env.RECAPTCHA_USER_AUTH || !process.env.RECAPTCHA_SITE_KEY)
      return true;
    const siteKey = process.env.RECAPTCHA_SITE_KEY;
    return fetch(
      `https://recaptchaenterprise.googleapis.com/v1/projects/minhacompraintel-1733872724443/assessments?key=${process.env.RECAPTCHA_USER_AUTH}`,
      {
        method: 'POST',
        body: JSON.stringify({ event: { token, expectedAction, siteKey } }),
      },
    )
      .then(async (r) => r.status === 200)
      .catch((_) => false);
  }

  @Post()
  async create(@Req() request: any, @Res() response) {
    // Recaptcha:
    // { "event": { "token": recaptcha_token, "expectedAction": "PAY", "siteKey": "6Ldf6pcqAAAAAC0mpeEfrhwR29jPb1Xsecc1T7rm" } }
    const {
      payment_method,
      recaptcha_token,
      hash,
      fingerprint,
      ...createPageDto
    }: any = request.body;
    const valid = await this.recaptcha(recaptcha_token);

    if (!valid) {
      response.status(403);
      response.json({ error: 'invalid recaptcha' });
      return null;
    }


    const cart = await this.cartsService.cartWithProducts({
      where: { hash: hash },
    });

    const validProducts =
      await this.productsService.validateProductsFromProperty(
        cart.products,
        cart.property_id,
      );

    if (!validProducts) {
      response.status(403);
      response.json({ error: 'invalid product quantities' });
      return null;
    }
    const transaction = new PagarmeTransaction();
    transaction.setCode(hash);
    transaction.setCustomer(
      this.customer(createPageDto.customer, hash, fingerprint),
    );
    transaction.setItemsFromCartProducts(cart.products);

    if (payment_method === 'credit_card') {
      transaction.setCreditCardPayment({
        number: createPageDto.card_number,
        holder_name: createPageDto.card_holder,
        expire_date: createPageDto.expire_date,
        cvv: createPageDto.cvv,
        billing_address: this.billingAddress(createPageDto.billing_address),
      });
    }
    if (payment_method === 'pix') {
      transaction.setPixPayment();
      if (this.isTest()) {
        response.json(this.mockPixResponse());
        return undefined;
      }
    }
    const acquiredOrder = await transaction
      .executeTransaction()
      .then((acquiredResponse: any) => {
        if (acquiredResponse.status === 'failed') {
          return Promise.reject(acquiredResponse);
        }
        return acquiredResponse;
      })
      .catch((acquiredResponse) => {
        response.status(403);
        return acquiredResponse;
      });
    const order = await this.ordersService.createOrder({
      acquirer: 'pagarme',
      acquirer_id: acquiredOrder.id,
      acquirer_metadata: { customer: acquiredOrder.customer },
      amount: cart.total_price,
      currency: acquiredOrder.currency,
      name: acquiredOrder.customer?.name,
      document_number: acquiredOrder.customer?.document,
      status: acquiredOrder.status,
      fingerprint,
      cart: {
        connect: {
          id: cart.id,
        },
      },
    });
    const acquirerPayment = acquiredOrder.charges?.[0];
    if (acquirerPayment) {
      await this.paymentsService.createPayment({
        fingerprint,
        acquirer: 'pagarme',
        acquirer_id: acquirerPayment.id,
        acquirer_metadata: {
          last_transaction: acquirerPayment.last_transaction,
        },
        order_id: order.id,
        amount: acquirerPayment.amount,
        currency: acquirerPayment.currency,
        status:
          acquirerPayment.last_transaction?.status || acquirerPayment.status,
        method: acquirerPayment.payment_method,
      });
      // TODO remover do estoque
      void this.productsService.removeProductsFromProperty(
        cart.products,
        cart.property_id,
      );
    } else {
      response.status(403);
    }
    response.json(acquiredOrder);
  }

  // @SerializeOptions({
  //   groups: ['admin'],
  // })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const payments = await this.paymentsService.payments({});
    return { payments };
  }
  //
  // @Get('/:hash(*)')
  // async findOne(@Param('hash') hash: string) {
  //   //TODO deve verificar se a pessoa tem acesso a página antes de devolver
  //   const cart = await this.cartsService.cartWithProducts({
  //     where: { hash: hash },
  //   });
  //   return { cart };
  // }

  // @SerializeOptions({
  //   groups: ['admin'],
  // })
  // @Put('/:hash(*)')
  // update(@Param('hash') hash: string, @Req() request: any) {
  //   const updatePageDto: any = request.body;
  //   return this.cartsService.updateCart({
  //     where: { hash },
  //     data: updatePageDto,
  //   });
  // }

  // @SerializeOptions({
  //   groups: ['admin'],
  // })
  // @Delete('/:path(*)')
  // remove(@Param('path') path: string) {
  //   return this.propertiesService.deletePage({ path });
  // }
  private billingAddress(_address: any) {
    return {
      line_1: '545, Avenida Veiga, Aparício Borges',
      line_2: '',
      zip_code: '91510120',
      city: 'Porto Alegre',
      state: 'RS',
      country: 'BR',
    };
  }

  private customer(
    customer: any = {},
    cartHash?: string,
    fingerprint?: string,
  ) {
    return {
      name: customer.name ?? `Venda direta: ${cartHash} - ${fingerprint}`,
      email: customer.email ?? `${cartHash}-${fingerprint}@mci.com.br`,
      document: customer.document ?? '01529151090',
      type: 'individual',
      document_type: 'cpf',
      phones: {
        mobile_phone: {
          number: customer.phone ?? '992472756',
          country_code: '55',
          area_code: customer.phone_area ?? '51',
        },
      },
    };
  }

  private mockPixResponse() {
    // TODO remover no futuro
    return {
      id: 'or_v1bkZk4xceiQ7Dy4',
      code: '1732916862330',
      amount: 1090,
      currency: 'BRL',
      closed: true,
      items: [
        {
          id: 'oi_520XWWcL8cRPXqLg',
          type: 'product',
          description: 'Cerveja Heineken 330ml',
          amount: 1090,
          quantity: 1,
          status: 'active',
          created_at: '2024-11-29T22:08:25Z',
          updated_at: '2024-11-29T22:08:25Z',
          code: '1',
        },
      ],
      customer: {
        id: 'cus_Ddq0jnJH9Hbjr6Jy',
        name: 'André Antunes Vieira',
        email: 'andre@minhacomprainteligente.com.br',
        document: '98968911096',
        document_type: 'cpf',
        type: 'individual',
        delinquent: false,
        created_at: '2024-11-29T21:27:46Z',
        updated_at: '2024-11-29T21:27:46Z',
        phones: {
          mobile_phone: {
            country_code: '55',
            number: '992472756',
            area_code: '51',
          },
        },
      },
      status: 'pending',
      created_at: '2024-11-29T22:08:25Z',
      updated_at: '2024-11-29T22:08:25Z',
      closed_at: '2024-11-29T22:08:25Z',
      charges: [
        {
          id: 'ch_XgQO3VQCbJt23RpG',
          code: '1732916862330',
          gateway_id: '3603723961',
          amount: 1090,
          status: 'pending',
          currency: 'BRL',
          payment_method: 'pix',
          created_at: '2024-11-29T22:08:25Z',
          updated_at: '2024-11-29T22:08:25Z',
          customer: {
            id: 'cus_Ddq0jnJH9Hbjr6Jy',
            name: 'André Antunes Vieira',
            email: 'andre@minhacomprainteligente.com.br',
            document: '98968911096',
            document_type: 'cpf',
            type: 'individual',
            delinquent: false,
            created_at: '2024-11-29T21:27:46Z',
            updated_at: '2024-11-29T21:27:46Z',
            phones: {
              mobile_phone: {
                country_code: '55',
                number: '992472756',
                area_code: '51',
              },
            },
          },
          last_transaction: {
            pix_provider_tid: '3603723961',
            qr_code:
              '00020101021226820014br.gov.bcb.pix2560pix.stone.com.br/pix/v2/d1ab1cae-6ff9-4aed-9fb8-94a6e7229f3e520400005303986540510.905802BR5925DIGITAL FLUX ANTUNES ACAD6014RIO DE JANEIRO62290525126794236aad0b766fce68c826304743B',
            qr_code_url:
              'https://api.pagar.me/core/v5/transactions/tran_KAM46zKTLHka1bqX/qrcode?payment_method=pix',
            expires_at: '2024-11-30T22:08:25Z',
            id: 'tran_KAM46zKTLHka1bqX',
            transaction_type: 'pix',
            gateway_id: '3603723961',
            amount: 1090,
            status: 'waiting_payment',
            success: true,
            created_at: '2024-11-29T22:08:25Z',
            updated_at: '2024-11-29T22:08:25Z',
            gateway_response: {},
            antifraud_response: {},
            metadata: {},
          },
        },
      ],
    };
  }

  private isTest() {
    return String(process.env.PAGARME_API_KEY).match(/test/);
  }
}
