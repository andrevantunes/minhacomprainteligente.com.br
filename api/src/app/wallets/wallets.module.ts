import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { PrismaService } from '../../database/prisma.service';
import { WithdrawsService } from '../withdraws/withdraws.service';
import { UserService } from '../../users/user.service';

@Module({
  controllers: [WalletsController],
  providers: [WalletsService, PrismaService, WithdrawsService, UserService],
})
export class WalletsModule {}
