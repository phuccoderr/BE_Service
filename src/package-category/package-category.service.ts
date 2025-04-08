import {
  CreatePackageCategoryDto,
  PackageCategoryDto,
  UpdatePackageCategoryDto,
} from '../dto/package-category.dto';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { PackageCategory } from 'src/database/entity/package-category.enitty';
import { Repository } from 'typeorm';

@Injectable()
export class PackageCategoryService {
  constructor(
    @InjectRepository(PackageCategory)
    private readonly packageCategoryRepository: Repository<PackageCategory>,
  ) {}

  // Create PackageCategories
  async createPackageCategories(
    packageCategoriesDto: CreatePackageCategoryDto,
  ) {
    try {
      const data =
        await this.packageCategoryRepository.save(packageCategoriesDto);
      return plainToClass(PackageCategoryDto, data);
    } catch (error) {
      throw new UnprocessableEntityException('Package category already exists');
    }
  }

  // Update PackageCategories
  async updatePackageCategories(
    id: number,
    packageCategoriesDto: UpdatePackageCategoryDto,
  ) {
    try {
      await this.packageCategoryRepository.update(id, packageCategoriesDto);
    } catch (error) {
      throw new NotFoundException('Package category not found');
    }
  }

  // Get By Id
  async findOneById(id: number) {
    const packageCategory = await this.packageCategoryRepository.findOne({
      where: { id },
    });
    if (!packageCategory) {
      throw new NotFoundException('Package category not found');
    }
    return plainToClass(PackageCategoryDto, packageCategory);
  }

  // Get All
  async findAll() {
    const packageCategories = await this.packageCategoryRepository.find();
    return packageCategories.map((item) =>
      plainToClass(PackageCategoryDto, item),
    );
  }

  // Delete By Id
  async deleteOneById(id: number) {
    try {
      const deletePackageCategory = await this.packageCategoryRepository.delete(
        {
          id,
        },
      );
      if (deletePackageCategory.affected === 0) {
        throw new NotFoundException('Package category not found');
      }
    } catch (error) {
      throw new UnprocessableEntityException('Cannot delete package category');
    }
  }
}
