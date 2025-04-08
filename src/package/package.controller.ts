import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
  CreatePackageDto,
  GetAllPackageDto,
  UpdatePackageDto,
} from 'src/dto/package.dto';
import { PackageService } from 'src/package/package.service';

@ApiTags('Package ')
@Controller('packages')
@ApiBearerAuth()
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Post('')
  @ApiOperation({ summary: 'Create Package' })
  @ApiResponse({ status: 200, description: 'success' })
  @ApiResponse({
    status: 422,
    description: 'Package already exists',
  })
  async createPackage(@Body() packageDto: CreatePackageDto) {
    const data = await this.packageService.createPackage(packageDto);

    return new ApiResponseFormat(200, 'success', data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number, description: 'id package' })
  @ApiOperation({ summary: 'Update Package By Id' })
  @ApiResponse({ status: 200, description: 'success' })
  @ApiResponse({
    status: 404,
    description: 'not found package',
  })
  async updateOne(
    @Param('id') id: number,
    @Body() packageCategoriesDto: UpdatePackageDto,
  ) {
    await this.packageService.updatePackage(id, packageCategoriesDto);
    return new ApiResponseFormat(200, 'success', null);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Find All Package ' })
  @ApiResponse({ status: 200, description: 'success' })
  async getAll(@Query() params: GetAllPackageDto) {
    const data = await this.packageService.findAll(params);

    return new ApiResponseFormat(200, 'success', data);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number, description: 'id package' })
  @ApiOperation({ summary: 'Get Package By Id' })
  @ApiResponse({ status: 200, description: 'success' })
  @ApiResponse({
    status: 404,
    description: 'not found package',
  })
  async getOne(@Param('id') id: number) {
    const data = await this.packageService.findOneById(id);

    return new ApiResponseFormat(200, 'success', data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number, description: 'id package' })
  @ApiOperation({ summary: 'Delete Package By Id' })
  @ApiResponse({ status: 200, description: 'success' })
  @ApiResponse({
    status: 404,
    description: 'not found package',
  })
  async deleteOne(@Param('id') id: number) {
    await this.packageService.deleteOneById(id);

    return new ApiResponseFormat(200, 'success', null);
  }
}
