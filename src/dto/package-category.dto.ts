import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePackageCategoryDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'name package',
    example: 'name',
  })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'description package',
    example: 'name',
  })
  description: string;
}

export class UpdatePackageCategoryDto {
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'name package',
  })
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'description package',
  })
  description?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'is active package',
  })
  is_actived?: boolean;
}

export class PackageCategoryDto {
  @ApiProperty({
    description: 'id package',
  })
  id: number;

  @ApiProperty({
    description: 'name package',
  })
  name: string;

  @ApiProperty({
    description: 'description package',
  })
  description: string;

  @ApiProperty({
    description: 'is active package',
  })
  is_actived: boolean;
}
