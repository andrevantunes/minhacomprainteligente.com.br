import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsOptional, MinLength, Validate} from 'class-validator';
import { IsNotExist } from '../../utils/validators/is-not-exists.validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class AuthRegisterLoginDto {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(lowerCaseTransformer)
  // @Validate(IsNotExist, ['users'], {
  //   message: 'emailAlreadyExists',
  // })
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'John Senna' })
  @IsNotEmpty()
  name: string;
  //
  // @ApiProperty({ example: 'email' })
  // @IsOptional()
  // provider?: string;

  @ApiProperty({ example: 'user' })
  @IsOptional()
  role?: string;
}
