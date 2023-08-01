import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';

export class CheckUsernameDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;
}
export class ValidResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  valid: boolean;
}
export class RegisterResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  access_token: string;
  @ApiProperty()
  user: User;
}

export class LoginResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  access_token: string;
  @ApiProperty()
  user: User;
}

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  first_name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  last_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}

export class RegisterAdminDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsString()
  last_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}

export class VerificatonForgotPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;
}

export class VerificatonEmailDto {
  @ApiProperty()
  @IsNotEmpty()
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;
}

export class SendForgotPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  email: string;
}

export class SendVerificatioEmailDto {
  @ApiProperty()
  @IsNotEmpty()
  email: string;
}
