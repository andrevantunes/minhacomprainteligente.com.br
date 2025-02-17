import { Module } from '@nestjs/common';
import { ReceivablesService } from './receivables.service';
import { ReceivablesController } from './receivables.controller';
import { PrismaService } from '../../database/prisma.service';

@Module({
  controllers: [ReceivablesController],
  providers: [ReceivablesService, PrismaService],
})
export class ReceivablesModule {}
