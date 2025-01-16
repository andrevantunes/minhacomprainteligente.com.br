import { Module } from '@nestjs/common';
import { ReplacementsService } from './replacements.service';
import { ReplacementsController } from './replacements.controller';
import { PrismaService } from '../../database/prisma.service';

@Module({
  controllers: [ReplacementsController],
  providers: [ReplacementsService, PrismaService],
})
export class ReplacementsModule {}
