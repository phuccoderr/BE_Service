import { PackageFeature } from 'src/database/entity/package-feature.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';
import { Exclude } from 'class-transformer';
import { Package } from 'src/database/entity/packages.entity';

export class CreatePackageFeatureDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'package id', example: 1 })
  package_id: number;

  @IsNotEmpty()
  @ApiProperty({ description: 'name', example: 'name' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'value', example: 'value' })
  value: string;
}

export class UpdatePackageFeatureDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiProperty({ description: 'package id', example: 1 })
  package_id?: number;

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ description: 'name', example: 'name' })
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ description: 'value', example: 'value' })
  value?: string;
}

export class PackageFeatureDto {
  @ApiProperty({ description: 'id', example: 1 })
  id: number;

  @ApiProperty({ description: 'name', example: 1 })
  name: string;

  @ApiProperty({ description: 'value', example: 'value' })
  value: string;

  @ApiProperty({ description: 'package', type: Package })
  package: Package;
}
