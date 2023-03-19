import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddTodoRequest {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  content = '';
}
