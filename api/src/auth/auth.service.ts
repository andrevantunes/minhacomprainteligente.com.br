import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import ms from 'ms';
import { JwtService } from '@nestjs/jwt';
import { Users } from '../users/entities/user.entity';
import bcrypt from 'bcryptjs';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthUpdateDto } from './dto/auth-update.dto';
import { RoleEnum } from '../roles/roles.enum';
import { StatusEnum } from '../statuses/statuses.enum';
import { plainToClass } from 'class-transformer';
import { Status } from '../statuses/entities/status.entity';
import { Role } from '../roles/entities/role.entity';
import { SocialInterface } from '../social/interfaces/social.interface';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';
import { NullableType } from '../utils/types/nullable.type';
import { LoginResponseType } from './types/login-response.type';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../config/config.type';
import { SessionService } from '../session/session.service';
import { JwtRefreshPayloadType } from './strategies/types/jwt-refresh-payload.type';
import { Session } from '../session/entities/session.entity';
import { JwtPayloadType } from './strategies/types/jwt-payload.type';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private sessionService: SessionService,
    // private mailService: MailService,
    private configService: ConfigService<AllConfigType>,
    private prisma: PrismaService,
  ) {}

  async validateLogin(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _loginDto: AuthEmailLoginDto,
  ): Promise<LoginResponseType> {
    throw new HttpException(
      {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          email: 'notFound',
        },
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
    return {} as any;

    // const user: any = await this.prisma.users.findUnique({
    //   where: { email: loginDto.email },
    // } as any);
    //
    // if (!user) {
    //   throw new HttpException(
    //     {
    //       status: HttpStatus.UNPROCESSABLE_ENTITY,
    //       errors: {
    //         email: 'notFound',
    //       },
    //     },
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
    //
    // if (user.provider !== AuthProvidersEnum.email) {
    //   throw new HttpException(
    //     {
    //       status: HttpStatus.UNPROCESSABLE_ENTITY,
    //       errors: {
    //         email: `needLoginViaProvider:${user.provider}`,
    //       },
    //     },
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
    //
    // const isValidPassword = await bcrypt.compare(
    //   loginDto.password,
    //   user.password,
    // );
    //
    // if (!isValidPassword) {
    //   throw new HttpException(
    //     {
    //       status: HttpStatus.UNPROCESSABLE_ENTITY,
    //       errors: {
    //         password: 'incorrectPassword',
    //       },
    //     },
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
    //
    // const session = await this.prisma.users.create({
    //   data: user,
    // });
    //
    // const { token, refreshToken, tokenExpires } = await this.getTokensData({
    //   id: user.id,
    //   roleId: user.roleId,
    //   sessionId: session.id,
    // });
    //
    // return {
    //   refreshToken,
    //   token,
    //   tokenExpires,
    //   user,
    // };
  }

  async validateSocialLogin(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _authProvider: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _socialData: SocialInterface,
  ): Promise<LoginResponseType> {
    throw new HttpException(
      {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          user: 'userNotFound',
        },
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
    // let user: NullableType<User> = null;
    // const socialEmail = socialData.email?.toLowerCase();
    // let userByEmail: NullableType<User> = null;
    //
    // if (socialEmail) {
    //   userByEmail = await this.prisma.users.findUnique({
    //     where: { email: socialEmail },
    //   });
    // }
    //
    // // if (socialData.id) {
    // //   user = await this.prisma.users.findUnique({
    // //     where: {
    // //       socialId: socialData.id,
    // //       provider: authProvider,
    // //     },
    // //   });
    // // }
    //
    // if (user) {
    //   if (socialEmail && !userByEmail) {
    //     user.email = socialEmail;
    //   }
    //   await this.prisma.users.update({
    //     where: { id: user.id },
    //     data: user,
    //   });
    // } else if (userByEmail) {
    //   user = userByEmail;
    // } else {
    //   user = await this.prisma.users.create({
    //     data: {
    //       email: socialEmail, // ?? null,
    //       name: socialData.firstName || 'null', // lastName: socialData.lastName ?? null,
    //       socialId: socialData.id,
    //       provider: authProvider,
    //       roleId: RoleEnum.user,
    //       status: StatusEnum.active,
    //     },
    //   });
    //
    //   // user = await this.prisma.users.findUnique({
    //   //   where: { id: user.id },
    //   // });
    // }
    //
    // if (!user) {
    //   throw new HttpException(
    //     {
    //       status: HttpStatus.UNPROCESSABLE_ENTITY,
    //       errors: {
    //         user: 'userNotFound',
    //       },
    //     },
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
    //
    // const session = await this.sessionService.create({
    //   user,
    // });
    //
    // const {
    //   token: jwtToken,
    //   refreshToken,
    //   tokenExpires,
    // } = await this.getTokensData({
    //   id: user.id,
    //   roleId: user.roleId,
    //   sessionId: session.id,
    // });
    //
    // return {
    //   refreshToken,
    //   token: jwtToken,
    //   tokenExpires,
    //   user,
    // };
  }

  async register(dto: AuthRegisterLoginDto): Promise<any> {
    const user = await this.usersService.create({
      name: dto.email,
      email: dto.email,
      password: dto.password,
      role: dto.role,
    });
    console.log('created', user)
    return user;

    // const hash = await this.jwtService.signAsync(
    //   {
    //     confirmEmailUserId: user.id,
    //   },
    //   {
    //     secret: this.configService.getOrThrow('auth.confirmEmailSecret', {
    //       infer: true,
    //     }),
    //     expiresIn: this.configService.getOrThrow('auth.confirmEmailExpires', {
    //       infer: true,
    //     }),
    //   },
    // );

    // await this.mailService.userSignUp({
    //   to: dto.email,
    //   data: {
    //     hash,
    //   },
    // });
  }

  async confirmEmail(hash: string): Promise<void> {
    let userId: Users['id'];

    try {
      const jwtData = await this.jwtService.verifyAsync<{
        confirmEmailUserId: Users['id'];
      }>(hash, {
        secret: this.configService.getOrThrow('auth.confirmEmailSecret', {
          infer: true,
        }),
      });

      userId = jwtData.confirmEmailUserId;
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            hash: `invalidHash`,
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const user = await this.usersService.findOne({
      id: userId,
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `notFound`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    // user.status = plainToClass(Status, {
    //   id: StatusEnum.active,
    // });
    await user.save();
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.usersService.findOne({
      email,
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'emailNotExists',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const hash = await this.jwtService.signAsync(
      {
        forgotUserId: user.id,
      },
      {
        secret: this.configService.getOrThrow('auth.forgotSecret', {
          infer: true,
        }),
        expiresIn: this.configService.getOrThrow('auth.forgotExpires', {
          infer: true,
        }),
      },
    );

    // await this.mailService.forgotPassword({
    //   to: email,
    //   data: {
    //     hash,
    //   },
    // });
  }

  async resetPassword(hash: string, password: string): Promise<void> {
    let userId: Users['id'];

    try {
      const jwtData = await this.jwtService.verifyAsync<{
        forgotUserId: Users['id'];
      }>(hash, {
        secret: this.configService.getOrThrow('auth.forgotSecret', {
          infer: true,
        }),
      });

      userId = jwtData.forgotUserId;
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            hash: `invalidHash`,
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const user = await this.usersService.findOne({
      id: userId,
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            hash: `notFound`,
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    user.password = password;

    await this.sessionService.softDelete({
      user: {
        id: user.id,
      },
    });
    await user.save();
  }

  async me(userJwtPayload: JwtPayloadType): Promise<NullableType<Users>> {
    return this.usersService.findOne({
      id: userJwtPayload.id,
    });
  }

  async update(
    userJwtPayload: JwtPayloadType,
    userDto: AuthUpdateDto,
  ): Promise<NullableType<Users>> {
    if (userDto.password) {
      if (!userDto.oldPassword) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              oldPassword: 'missingOldPassword',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      const currentUser = await this.usersService.findOne({
        id: userJwtPayload.id,
      });

      if (!currentUser) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              user: 'userNotFound',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      const isValidOldPassword = await bcrypt.compare(
        userDto.oldPassword,
        currentUser.password,
      );

      if (!isValidOldPassword) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              oldPassword: 'incorrectOldPassword',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      } else {
        await this.sessionService.softDelete({
          user: {
            id: currentUser.id,
          },
          excludeId: userJwtPayload.sessionId,
        });
      }
    }

    await this.usersService.update(userJwtPayload.id, userDto);

    return this.usersService.findOne({
      id: userJwtPayload.id,
    });
  }

  async refreshToken(
    data: Pick<JwtRefreshPayloadType, 'sessionId'>,
  ): Promise<Omit<LoginResponseType, 'user'>> {
    const session = await this.sessionService.findOne({
      where: {
        id: data.sessionId,
      },
    });

    if (!session) {
      throw new UnauthorizedException();
    }

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: session.user.id,
      role: session.user.role,
      session_id: session.id,
    });

    return {
      token,
      refreshToken,
      tokenExpires,
    };
  }

  async softDelete(user: Users): Promise<void> {
    await this.usersService.softDelete(user.id);
  }

  async logout(data: Pick<JwtRefreshPayloadType, 'sessionId'>) {
    return this.sessionService.softDelete({
      id: data.sessionId,
    });
  }

  private async getTokensData(data: {
    id: Users['id'];
    role: Users['role'];
    session_id: Session['id'];
  }) {
    const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
      infer: true,
    });

    const tokenExpires = Date.now() + ms(tokenExpiresIn);

    const [token, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(
        {
          id: data.id,
          roleId: data.role,
          sessionId: data.session_id,
        },
        {
          secret: this.configService.getOrThrow('auth.secret', { infer: true }),
          expiresIn: tokenExpiresIn,
        },
      ),
      await this.jwtService.signAsync(
        {
          sessionId: data.session_id,
        },
        {
          secret: this.configService.getOrThrow('auth.refreshSecret', {
            infer: true,
          }),
          expiresIn: this.configService.getOrThrow('auth.refreshExpires', {
            infer: true,
          }),
        },
      ),
    ]);

    return {
      token,
      refreshToken,
      tokenExpires,
    };
  }
}
