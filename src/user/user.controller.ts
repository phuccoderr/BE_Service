import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ApiResponseFormat } from 'src/common/dto/api-response.dto';
import { RegisterUserDto, UpdateUserDto } from 'src/dto/user.dto';
import { UserService } from 'src/user/user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({ status: 200, description: 'success' })
  @ApiResponse({ status: 422, description: 'User already exists' })
  async registerUser(@Body() userDto: RegisterUserDto) {
    const data = await this.userService.registerUser(userDto);

    return new ApiResponseFormat(200, 'success', data);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update User' })
  @ApiResponse({ status: 200, description: 'success' })
  @ApiResponse({
    status: 422,
    description: 'not found user',
  })
  async updateOne(@Request() req, @Body() userDto: UpdateUserDto) {
    const { id } = req.user;
    await this.userService.updateInfoUser(id, userDto);
    return new ApiResponseFormat(200, 'success', null);
  }

  @Get('/me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: 200,
    description: 'info user',
  })
  @ApiResponse({
    status: 404,
    description: 'not found user',
  })
  async findOne(@Request() req) {
    const { id } = req.user;
    const data = await this.userService.findOneById(id);

    return new ApiResponseFormat(200, 'success', data);
  }
}
