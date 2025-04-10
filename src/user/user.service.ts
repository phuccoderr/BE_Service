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
import { v4 as uuidv4 } from 'uuid';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly mailService: MailService,
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

  async forgotPassword(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Không tìm thấy user');
    }

    const token = uuidv4();

    await this.userRepository.update(user.id, {
      reset_password_token: token,
    });

    await this.mailService.forgotPassword(
      email,
      `http://localhost:5173/reset-password?token=${token}`,
    );

    return user;
  }

  async resetPassswordToken(token: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { reset_password_token: token },
    });

    if (!user) {
      throw new NotFoundException('Không tìm thấy user');
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    return this.userRepository.update(user.id, {
      password: hashPassword,
      reset_password_token: '',
    });
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
