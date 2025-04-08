import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/dto/user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { TokenPayLoad } from 'src/dto/token-payload.dto';
import { Repository } from 'typeorm';
import { User } from 'src/database/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(body: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: { username: body.username },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: TokenPayLoad = {
      id: user.id,
      username: user.username,
    };

    return {
      access_token: this.jwtService.sign(payload),
      role: user.role,
    };
  }
}
