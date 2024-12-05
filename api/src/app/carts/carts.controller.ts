import {
  Controller,
  Get,
  Post,
  // Body,
  Put,
  Param,
  // Delete,
  // UseGuards,
  SerializeOptions,
  // HttpCode,
  // HttpStatus,
  // Logger,
  Req,
} from '@nestjs/common';
import { CartsService } from './carts.service';
// import { CreatePageDto } from './dto/create-page.dto';
// import { UpdatePageDto } from './dto/update-page.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaymentsService } from '../payments/payments.service';
import { OrdersService } from '../orders/orders.service';
import PagarmeTransaction from '../../utils/pagarme';
// import { Roles } from '../roles/roles.decorator';
// import { RoleEnum } from '../roles/roles.enum';
// import { AuthGuard } from '@nestjs/passport';
// import { RolesGuard } from '../roles/roles.guard';

@ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Carts')
@Controller({
  path: 'carts',
  version: '1',
})
export class CartsController {
  constructor(
    private readonly cartsService: CartsService,
    private readonly ordersService: OrdersService,
    private readonly paymentsService: PaymentsService,
  ) {}

  @Post()
  create(@Req() request: any) {
    const createPageDto: any = request.body;
    return this.cartsService.createCart(createPageDto);
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
  @Get('/payment/:hash(*)')
  async findCartPayment(@Param('hash') hash: string) {
    const cart = await this.cartsService.cart({ where: { hash: hash } });
    const order = await this.ordersService.order({
      where: { cart_id: cart.id },
      orderBy: { id: 'desc' },
    });
    // order.acquirer_id
    let acquirerOrder: any = {};
    if (order?.acquirer_id && order.status !== 'paid') {
      const pagarme = new PagarmeTransaction();
      acquirerOrder = await pagarme.find(order.acquirer_id);
      if (acquirerOrder.status === 'paid') {
        order.status = 'paid';
        await this.ordersService.updateOrder(
          { id: order.id },
          { updated_at: new Date(), status: order.status },
        );
      }
    }
    return { cart, order, acquirerOrder };
  }
  @Get('/:hash(*)')
  async findOne(@Param('hash') hash: string) {
    //TODO deve verificar se a pessoa tem acesso a página antes de devolver
    const cart = await this.cartsService.cartWithProducts({
      where: { hash: hash },
    });
    return { cart };
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Put('/:hash(*)')
  update(@Param('hash') hash: string, @Req() request: any) {
    const updatePageDto: any = request.body;
    return this.cartsService.updateCart({
      where: { hash },
      data: updatePageDto,
    });
  }

  // @SerializeOptions({
  //   groups: ['admin'],
  // })
  // @Delete('/:path(*)')
  // remove(@Param('path') path: string) {
  //   return this.propertiesService.deletePage({ path });
  // }
}
