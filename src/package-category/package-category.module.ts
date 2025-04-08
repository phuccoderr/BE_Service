import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackageCategory } from 'src/database/entity/package-category.enitty';
import { PackageCategoryController } from 'src/package-category/package-category.controller';
import { PackageCategoryService } from 'src/package-category/package-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([PackageCategory])],
  controllers: [PackageCategoryController],
  providers: [PackageCategoryService],
  exports: [PackageCategoryService],
})
export class PackageCategoryModule {}
