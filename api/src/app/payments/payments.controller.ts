import {
  Controller,
  // Get,
  Post,
  // Body,
  // Put,
  // Param,
  // Delete,
  // UseGuards,
  // SerializeOptions,
  // HttpCode,
  // HttpStatus,
  // Logger,
  Req,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
// import { CreatePageDto } from './dto/create-page.dto';
// import { UpdatePageDto } from './dto/update-page.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// import { Roles } from '../roles/roles.decorator';
// import { RoleEnum } from '../roles/roles.enum';
// import { AuthGuard } from '@nestjs/passport';
// import { RolesGuard } from '../roles/roles.guard';
import request from 'request';

@ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Payments')
@Controller({
  path: 'payments',
  version: '1',
})
export class PaymentsController {
  constructor(private readonly cartsService: PaymentsService) {}

  @Post()
  create(@Req() request: any) {
    const createPageDto: any = request.body;
    console.log(createPageDto);
    return handlePagarme(createPageDto);
  }

  // @SerializeOptions({
  //   groups: ['admin'],
  // })
  // @Get()
  // @HttpCode(HttpStatus.OK)
  // async findAll() {
  //   const properties = await this.propertiesService.properties({ include: { address: true } });
  //   return { properties, test: 'Abc123' };
  // }
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
  //   console.log('update', updatePageDto);
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
}

async function handlePagarme({
  card_holder,
  card_number,
  expire_date,
  cvv,
  total_price,
  hash,
}) {
  const [exp_month, expYear] = expire_date.split('/');

  const options = {
    method: 'POST',
    uri: 'https://api.pagar.me/core/v5/orders',
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.PAGARME_API_KEY}:`,
      ).toString('base64')}`,
      'Content-Type': 'application/json',
    },
    json: {
      amount: total_price,
      code: hash,
      antifraud_enabled: false,
      customer: {
        name: 'André Antunes Vieira',
        email: 'andre@minhacomprainteligente.com.br',
        document: '98968911096',
        type: 'individual',
        document_type: 'cpf',
        phones: {
          mobile_phone: {
            number: '992472756',
            country_code: '55',
            area_code: '51',
          },
        },
      },
      items: [
        { code: 1, amount: 1200, quantity: 1, description: 'Sem descrição' },
      ],
      payments: [
        {
          payment_method: 'credit_card',
          credit_card: {
            amount: total_price,
            installments: 1,
            card: {
              number: card_number,
              holder_name: card_holder,
              exp_month: exp_month,
              exp_year: expYear.slice(-2),
              cvv: cvv,
              billing_address: {
                line_1: '123, Rua Exemplo, Bairro Exemplo',
                line_2: 'Apto 202',
                zip_code: '91510120',
                city: 'Porto Alegre',
                state: 'RS',
                country: 'BR',
              },
            },
          },
        },
      ],
    },
  };

  request(options, function (error, response, body) {
    console.log('error', error);
    console.log('response.body', response.body);
    console.log('body', body);

    if (response.body && response.body.charges) {
      console.log(
        'Last Transaction Details:',
        response.body.charges[0].last_transaction,
      );
      console.log(
        'Last Transaction Details:',
        response.body.charges[0].last_transaction.gateway_response,
      );
    }
  });
}
