import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseFormat {
  @ApiProperty({ description: 'status code', example: 200 })
  statusCode: number;

  @ApiProperty({ description: 'message', example: 'success' })
  message: string;

  @ApiProperty({ description: 'data', example: [] })
  error: string[];
}
