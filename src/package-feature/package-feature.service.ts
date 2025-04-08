import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { PackageFeature } from 'src/database/entity/package-feature.entity';
import {
  CreatePackageFeatureDto,
  PackageFeatureDto,
  UpdatePackageFeatureDto,
} from 'src/dto/package-feature.dto';
import { PackageService } from 'src/package/package.service';
import { Repository } from 'typeorm';

@Injectable()
export class PackageFeatureService {
  constructor(
    @InjectRepository(PackageFeature)
    private readonly packageFeatureRepository: Repository<PackageFeature>,
    private readonly packageService: PackageService,
  ) {}

  // Create PackageFeature
  async createPackageFeature(packageFeatureDto: CreatePackageFeatureDto) {
    const { package_id, ...body } = packageFeatureDto;
    const packages = await this.packageService.findOneById(package_id);

    try {
      const data = await this.packageFeatureRepository.save({
        ...body,
        package: packages,
      });

      return plainToClass(PackageFeatureDto, data);
    } catch (error) {
      throw new UnprocessableEntityException('Package feature already exists');
    }
  }

  // Update PackageFeature
  async updatePackagFeature(
    id: number,
    packageFeatureDto: UpdatePackageFeatureDto,
  ) {
    const { package_id, ...body } = packageFeatureDto;
    try {
      if (package_id) {
        const packages = await this.packageService.findOneById(package_id);

        await this.packageFeatureRepository.update(id, {
          ...body,
          package: packages,
        });
      } else {
        await this.packageFeatureRepository.update(id, body);
      }
    } catch (error) {
      throw new NotFoundException('Package feature not found');
    }
  }

  // Get All
  async findAll() {
    const packageFeatures = await this.packageFeatureRepository.find({
      relations: ['package'],
    });
    return packageFeatures.map((item) => plainToClass(PackageFeatureDto, item));
  }

  // Get By Id
  async findOneById(id: number) {
    const packageFeature = await this.packageFeatureRepository.findOne({
      where: { id },
      relations: ['package'],
    });
    if (!packageFeature) {
      throw new NotFoundException('Package feature not found');
    }
    return plainToClass(PackageFeatureDto, packageFeature);
  }

  // Delete By Id
  async deleteOneById(id: number) {
    try {
      const deletePackageFeature = await this.packageFeatureRepository.delete({
        id,
      });
      if (deletePackageFeature.affected === 0) {
        throw new NotFoundException('Package feature not found');
      }
    } catch (error) {
      throw new UnprocessableEntityException('Cannot delete package feature');
    }
  }
}
