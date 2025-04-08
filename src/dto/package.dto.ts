import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { PackageCategory } from 'src/database/entity/package-category.enitty';
import { PackageFeatureDto } from 'src/dto/package-feature.dto';

export class CreatePackageDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'name', example: 'name' })
  name: string;

  @IsNumber()
  @ApiProperty({ description: 'package category id', example: 1 })
  package_category_id: number;

  @IsNumber()
  @ApiProperty({ description: 'price', example: 1000 })
  price: number;

  @IsNumber()
  @Type(() => Number)
  @Max(100)
  @ApiProperty({ description: 'discount', example: 100 })
  discount: number;

  @IsNumber()
  @ApiProperty({ description: 'data amount', example: 1000 })
  data_amount: number;

  @IsNotEmpty()
  @ApiProperty({ description: 'description', example: 'description' })
  description: string;
}

export class UpdatePackageDto {
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ description: 'name', example: 'name' })
  name?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiProperty({ description: 'package category id', example: 1 })
  package_category_id?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ description: 'price', example: 1000 })
  price?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Max(100)
  @ApiProperty({ description: 'discount', example: 100 })
  discount?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'data amount', example: 1000 })
  data_amount?: number;

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ description: 'description', example: 'description' })
  description?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ description: 'is actived', example: true })
  is_actived?: boolean;
}

export class GetAllPackageDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    description: 'id package category',
    example: 1,
    required: false,
  })
  package_category_id?: number;
}

export class PackageDto {
  @ApiProperty({ description: 'name', example: 'name' })
  name: string;

  @ApiProperty({ description: 'package category id', example: 1 })
  package_category: PackageCategory;

  @ApiProperty({ description: 'price', example: 1000 })
  price: number;

  @ApiProperty({ description: 'discount', example: 100 })
  discount: number;

  @ApiProperty({ description: 'data amount', example: 1000 })
  data_amount: number;

  @ApiProperty({ description: 'description', example: 'description' })
  description: string;

  @ApiProperty({ description: 'is actived', example: true })
  is_actived: boolean;

  @ApiProperty({ description: 'package features', type: [PackageFeatureDto] })
  package_feature: PackageFeatureDto[];
}
