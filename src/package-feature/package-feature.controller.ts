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
import {
  CreatePackageFeatureDto,
  UpdatePackageFeatureDto,
} from 'src/dto/package-feature.dto';
import { PackageFeatureService } from 'src/package-feature/package-feature.service';

@ApiTags('Package Feature')
@Controller('package-features')
@ApiBearerAuth()
export class PackageFeatureController {
  constructor(private readonly packageFeatureService: PackageFeatureService) {}

  @Post('')
  @ApiOperation({ summary: 'Create Package Feature' })
  @ApiResponse({ status: 200, description: 'success' })
  @ApiResponse({
    status: 422,
    description: 'Package feature already exists',
  })
  async registerUser(@Body() packageFeatureDto: CreatePackageFeatureDto) {
    const data =
      await this.packageFeatureService.createPackageFeature(packageFeatureDto);

    return new ApiResponseFormat(200, 'success', data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number, description: 'id package feature' })
  @ApiOperation({ summary: 'Update Package Feature By Id' })
  @ApiResponse({ status: 200, description: 'success' })
  @ApiResponse({
    status: 404,
    description: 'not found package',
  })
  async updateOne(
    @Param('id') id: number,
    @Body() packageCategoriesDto: UpdatePackageFeatureDto,
  ) {
    await this.packageFeatureService.updatePackagFeature(
      id,
      packageCategoriesDto,
    );
    return new ApiResponseFormat(200, 'success', null);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Find All Package Feature' })
  @ApiResponse({ status: 200, description: 'success' })
  async getAll() {
    const data = await this.packageFeatureService.findAll();

    return new ApiResponseFormat(200, 'success', data);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number, description: 'id package feature' })
  @ApiOperation({ summary: 'Get Package Feature By Id' })
  @ApiResponse({ status: 200, description: 'success' })
  @ApiResponse({
    status: 404,
    description: 'not found package feature',
  })
  async getOne(@Param('id') id: number) {
    const data = await this.packageFeatureService.findOneById(id);

    return new ApiResponseFormat(200, 'success', data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number, description: 'id package feature' })
  @ApiOperation({ summary: 'Delete Package Feature By Id' })
  @ApiResponse({ status: 200, description: 'success' })
  @ApiResponse({
    status: 404,
    description: 'not found package feature',
  })
  async deleteOne(@Param('id') id: number) {
    await this.packageFeatureService.deleteOneById(id);

    return new ApiResponseFormat(200, 'success', null);
  }
}
