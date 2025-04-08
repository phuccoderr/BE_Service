import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Package } from 'src/database/entity/packages.entity';
import {
  CreatePackageDto,
  GetAllPackageDto,
  PackageDto,
  UpdatePackageDto,
} from 'src/dto/package.dto';
import { PackageCategoryService } from 'src/package-category/package-category.service';
import { Repository } from 'typeorm';

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(Package)
    private readonly packageRepository: Repository<Package>,
    private readonly packageCategoryService: PackageCategoryService,
  ) {}

  // Create Packages
  async createPackage(packageDto: CreatePackageDto) {
    const { package_category_id, ...body } = packageDto;
    const packageCategory =
      await this.packageCategoryService.findOneById(package_category_id);
    try {
      const data = await this.packageRepository.save({
        ...body,
        package_category: packageCategory,
      });

      return plainToClass(PackageDto, data);
    } catch (error) {
      throw new UnprocessableEntityException('Package already exists');
    }
  }

  // Update Package
  async updatePackage(id: number, packageDto: UpdatePackageDto) {
    const { package_category_id, ...body } = packageDto;
    try {
      if (package_category_id) {
        const packageCategory =
          await this.packageCategoryService.findOneById(package_category_id);
        await this.packageRepository.update(id, {
          ...body,
          package_category: packageCategory,
        });
      } else {
        await this.packageRepository.update(id, body);
      }
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Package category not found');
    }
  }

  // Get All
  async findAll(params: GetAllPackageDto) {
    const { package_category_id } = params;

    const whereCondition = package_category_id
      ? {
          package_category:
            await this.packageCategoryService.findOneById(package_category_id),
        }
      : {};

    const packages = await this.packageRepository.find({
      relations: ['package_category', 'package_feature'],
      where: whereCondition,
    });
    return packages.map((item) => {
      return plainToClass(PackageDto, {
        ...item,
      });
    });
  }

  // Get By Id
  async findOneById(id: number) {
    const packages = await this.packageRepository.findOne({
      where: { id },
      relations: ['package_category', 'package_feature'],
    });
    if (!packages) {
      throw new UnprocessableEntityException('Package not found');
    }
    return plainToClass(PackageDto, packages);
  }

  // Delete By Id
  async deleteOneById(id: number) {
    try {
      const deletePackage = await this.packageRepository.delete({
        id,
      });
      if (deletePackage.affected === 0) {
        throw new NotFoundException('Package not found');
      }
    } catch (error) {
      throw new UnprocessableEntityException('Cannot delete package');
    }
  }
}
