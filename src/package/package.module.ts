import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Package } from 'src/database/entity/packages.entity';
import { PackageCategoryModule } from 'src/package-category/package-category.module';
import { PackageController } from 'src/package/package.controller';
import { PackageService } from 'src/package/package.service';

@Module({
  imports: [TypeOrmModule.forFeature([Package]), PackageCategoryModule],
  controllers: [PackageController],
  providers: [PackageService],
  exports: [PackageService],
})
export class PackageModule {}
