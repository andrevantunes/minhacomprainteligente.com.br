import { Module } from '@nestjs/common';
import { WithdrawsService } from './withdraws.service';
import { WithdrawsController } from './withdraws.controller';
import { PrismaService } from '../../database/prisma.service';

@Module({
  controllers: [WithdrawsController],
  providers: [WithdrawsService, PrismaService],
})
export class WithdrawsModule {}
