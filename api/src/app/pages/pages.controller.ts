import {
  Controller,
  Get,
  Post,
  // Body,
  Put,
  Param,
  Delete,
  // UseGuards,
  SerializeOptions,
  HttpCode,
  HttpStatus,
  Logger,
  Req,
} from '@nestjs/common';
import { PagesService } from './pages.service';
// import { CreateReplacementDto } from './dto/create-page.dto';
// import { UpdatePageDto } from './dto/update-page.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// import { Roles } from '../roles/roles.decorator';
// import { RoleEnum } from '../roles/roles.enum';
// import { AuthGuard } from '@nestjs/passport';
// import { RolesGuard } from '../roles/roles.guard';

@ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Pages')
@Controller({
  path: 'pages',
  version: '1',
})
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Post()
  create(@Req() request: any) {
    const createPageDto: any = request.body;
    Logger.log(JSON.stringify(createPageDto));
    return this.pagesService.createPage(createPageDto);
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    //TODO somente admin pode listar todas as páginas (com filtro)
    return this.pagesService.pages({});
  }

  @Get('/:path(*)')
  findOne(@Param('path') path: string) {
    //TODO deve verificar se a pessoa tem acesso a página antes de devolver
    return this.pagesService.page({ path: path.replace(/\?.*/, '') });
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Put('/:path(*)')
  update(@Param('path') path: string, @Req() request: any) {
    const updatePageDto: any = request.body;
    return this.pagesService
      .updatePage({
        where: { path },
        data: { value: updatePageDto.value },
      })
      .catch((e) => {
        console.log('erro ao editar, criando', e);
        return this.pagesService.createPage({ ...updatePageDto, path });
      });
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Delete('/:path(*)')
  remove(@Param('path') path: string) {
    return this.pagesService.deletePage({ path });
  }
}
