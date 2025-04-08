import {
  Injectable,
  NotFoundException,
  OnModuleInit,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from 'src/database/entity/user.entity';
import { RegisterUserDto, UpdateUserDto, UserDto } from 'src/dto/user.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // Register User
  async registerUser(userDto: RegisterUserDto) {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    try {
      const user = await this.userRepository.save({
        username: userDto.username,
        password: hashedPassword,
        email: userDto.email,
      });
      return plainToClass(UserDto, user);
    } catch (error) {
      throw new UnprocessableEntityException('User already exists');
    }
  }

  // Update
  async updateInfoUser(id: number, userDto: UpdateUserDto) {
    try {
      await this.userRepository.update(id, userDto);
    } catch (error) {
      throw new UnauthorizedException('User cannot update');
    }
  }

  // Get By Id
  async findOneById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return plainToClass(UserDto, user);
  }

  // Init in DB
  async onModuleInit(): Promise<void> {
    const initInDB = await this.userRepository.findOne({
      where: { username: 'admin' },
    });
    if (!initInDB) {
      await this.userRepository.save({
        username: 'admin',
        password: await bcrypt.hash('123456', 10),
        email: 'admin@localhost.com',
        role: UserRole.ADMIN,
      });
    }
  }
}
