import { Controller, Get, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthorizationToken } from '../../utils/AuthorizationToken';

@ApiBearerAuth()
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
  async findAll(@AuthorizationToken() token: string) {
    const properties =
      await this.propertiesService.userPropertiesFromSessionToken(
        // this.getAuthorizationToken(request),
        token,
      );

    return { properties };
  }

  @Get('/:hash(*)')
  async findOne(@Param('hash') hash: string) {
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
  private getAuthorizationToken(request): string {
    const token = request.headers.authorization;
    if (!token) return '';
    return token.replace(/bearer /, '');
  }
}
