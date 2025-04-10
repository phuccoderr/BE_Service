import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'username',
    example: 'admin',
  })
  username: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'password',
    example: '123456',
  })
  password: string;

  @IsEmail()
  @ApiProperty({
    description: 'email',
    example: 'admin@localhost.com',
  })
  email: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'username',
    example: 'admin',
  })
  username: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'password',
    example: '123456',
  })
  password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'first name', example: 'first name' })
  first_name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'last name', example: 'last name' })
  last_name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'address', example: 'address' })
  address: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ description: 'email', example: 'email@gmail.com' })
  email: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'phone number', example: 'phone number' })
  phone_number: string;
}

export class UserDto {
  @ApiProperty({
    description: 'id',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'username',
    example: 'admin',
  })
  username: string;

  @ApiProperty({
    description: 'email',
    example: 'admin@localhost.com',
  })
  email: string;

  @Exclude()
  password: string;
}

export class ForgotPasswordDto {
  @ApiProperty({ description: 'email', example: 'email' })
  @IsNotEmpty()
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty({ description: 'token', example: 'token' })
  @IsNotEmpty()
  token: string;

  @ApiProperty({ description: 'password', example: 'password' })
  @IsNotEmpty()
  password: string;
}
