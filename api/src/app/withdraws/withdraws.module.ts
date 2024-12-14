import { Module } from '@nestjs/common';
import { WithdrawsService } from './withdraws.service';
import { WithdrawsController } from './withdraws.controller';
import { PrismaService } from '../../database/prisma.service';
import { BalancesService } from '../balances/balances.service';

@Module({
  controllers: [WithdrawsController],
  providers: [WithdrawsService, BalancesService, PrismaService],
})
export class WithdrawsModule {}
