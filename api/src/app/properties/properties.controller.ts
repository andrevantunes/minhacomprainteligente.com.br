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
import { PropertiesService } from './properties.service';
// import { CreatePageDto } from './dto/create-page.dto';
// import { UpdatePageDto } from './dto/update-page.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  // @Post()
  // create(@Req() request: any) {
  //   const createPageDto: any = request.body;
  //   Logger.log(JSON.stringify(createPageDto));
  //   return this.propertiesService.createPage(createPageDto);
  // }

  // @SerializeOptions({
  //   groups: ['admin'],
  // })
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
  //
  // @SerializeOptions({
  //   groups: ['admin'],
  // })
  // @Put('/:path(*)')
  // update(@Param('path') path: string, @Req() request: any) {
  //   const updatePageDto: any = request.body;
  //   return this.propertiesService
  //     .updatePage({
  //       where: { path },
  //       data: { value: updatePageDto.value },
  //     })
  //     .catch((e) => {
  //       console.log('erro ao editar, criando', e);
  //       return this.propertiesService.createPage({ ...updatePageDto, path });
  //     });
  // }
  //
  // @SerializeOptions({
  //   groups: ['admin'],
  // })
  // @Delete('/:path(*)')
  // remove(@Param('path') path: string) {
  //   return this.propertiesService.deletePage({ path });
  // }
}
