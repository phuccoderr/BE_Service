import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackageFeature } from 'src/database/entity/package-feature.entity';
import { PackageFeatureController } from 'src/package-feature/package-feature.controller';
import { PackageFeatureService } from 'src/package-feature/package-feature.service';
import { PackageModule } from 'src/package/package.module';

@Module({
  imports: [TypeOrmModule.forFeature([PackageFeature]), PackageModule],
  controllers: [PackageFeatureController],
  providers: [PackageFeatureService],
  exports: [PackageFeatureService],
})
export class PackageFeatureModule {}
