import {
  Controller,
  Get,
  // Post,
  // Body,
  // Put,
  Param,
  // Delete,
  // UseGuards,
  // SerializeOptions,
  HttpCode,
  HttpStatus,
  // Logger,
  // Req,
} from '@nestjs/common';
// import { CreatePageDto } from './dto/create-page.dto';
// import { UpdatePageDto } from './dto/update-page.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PropertiesService } from '../properties/properties.service';
// import { Roles } from '../roles/roles.decorator';
// import { RoleEnum } from '../roles/roles.enum';
// import { AuthGuard } from '@nestjs/passport';
// import { RolesGuard } from '../roles/roles.guard';

@ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Properties')
@Controller({
  path: 'properties',
  version: '1',
})
export class ProductsController {
  constructor(private readonly propertiesService: PropertiesService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const properties = await this.propertiesService.properties({
      include: { address: true },
    });
    return { properties, test: 'Abc123' };
  }

  @Get('/:hash(*)')
  async findOne(@Param('hash') hash: string) {
    //TODO deve verificar se a pessoa tem acesso a página antes de devolver
    const property = await this.propertiesService.propertyWithProducts({
      hash: hash,
    });
    return { property };
  }
}
