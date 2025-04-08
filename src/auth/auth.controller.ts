import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { ApiResponseFormat } from 'src/common/dto/api-response.dto';
import { LoginUserDto } from 'src/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập và tạo JWT' })
  @ApiResponse({
    status: 200,
    description: 'Login successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Username or password is incorrect',
  })
  async login(@Body() loginDto: LoginUserDto) {
    const data = await this.authService.validateUser(loginDto);

    return new ApiResponseFormat(200, 'success', data);
  }
}
