import {
  CreatePackageCategoryDto,
  UpdatePackageCategoryDto,
} from '../dto/package-category.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ApiResponseFormat } from 'src/common/dto/api-response.dto';
import { PackageCategoryService } from 'src/package-category/package-category.service';

@ApiTags('Package Categories')
@Controller('package-categories')
@ApiBearerAuth()
export class PackageCategoryController {
  constructor(
    private readonly packageCategoryServicce: PackageCategoryService,
  ) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create Package Categories' })
  @ApiResponse({ status: 200, description: 'success' })
  @ApiResponse({
    status: 422,
    description: 'Package categories already exists',
  })
  async createPackageCategory(
    @Body() packageCategoriesDto: CreatePackageCategoryDto,
  ) {
    const data =
      await this.packageCategoryServicce.createPackageCategories(
        packageCategoriesDto,
      );

    return new ApiResponseFormat(200, 'success', data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number, description: 'id package category' })
  @ApiOperation({ summary: 'Update Package Category By Id' })
  @ApiResponse({ status: 200, description: 'success' })
  @ApiResponse({
    status: 404,
    description: 'not found package category',
  })
  async updateOne(
    @Param('id') id: number,
    @Body() packageCategoriesDto: UpdatePackageCategoryDto,
  ) {
    await this.packageCategoryServicce.updatePackageCategories(
      id,
      packageCategoriesDto,
    );
    console.log(packageCategoriesDto);
    return new ApiResponseFormat(200, 'success', null);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Find All Package Categories' })
  @ApiResponse({ status: 200, description: 'success' })
  async getAll() {
    const data = await this.packageCategoryServicce.findAll();

    return new ApiResponseFormat(200, 'success', data);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number, description: 'id package category' })
  @ApiOperation({ summary: 'Get Package Category By Id' })
  @ApiResponse({ status: 200, description: 'success' })
  @ApiResponse({
    status: 404,
    description: 'not found package category',
  })
  async getOne(@Param('id') id: number) {
    const data = await this.packageCategoryServicce.findOneById(id);

    return new ApiResponseFormat(200, 'success', data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number, description: 'id package category' })
  @ApiOperation({ summary: 'Delete Package Category By Id' })
  @ApiResponse({ status: 200, description: 'success' })
  @ApiResponse({
    status: 404,
    description: 'not found package category',
  })
  async deleteOne(@Param('id') id: number) {
    await this.packageCategoryServicce.deleteOneById(id);

    return new ApiResponseFormat(200, 'success', null);
  }
}
