import { Module } from '@nestjs/common';
import { BalancesService } from './balances.service';
import { BalancesController } from './balances.controller';
import { PrismaService } from '../../database/prisma.service';

@Module({
  controllers: [BalancesController],
  providers: [BalancesService, PrismaService],
})
export class BalancesModule {}
