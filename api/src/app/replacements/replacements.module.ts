import { Module } from '@nestjs/common';
import { ReplacementsService } from './replacements.service';
import { ReplacementsController } from './replacements.controller';
import { PrismaService } from '../../database/prisma.service';
import { PropertiesService } from '../properties/properties.service';

@Module({
  controllers: [ReplacementsController],
  providers: [ReplacementsService, PropertiesService, PrismaService],
})
export class ReplacementsModule {}
