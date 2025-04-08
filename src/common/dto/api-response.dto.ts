import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseFormat<T> {
  @ApiProperty({ description: 'status code', example: 200 })
  statusCode: number;

  @ApiProperty({ description: 'message', example: 'success' })
  message: string;

  @ApiProperty({ description: 'data', example: {} })
  data: T;

  constructor(statusCode: number, message: string, data: T) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
