import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateTodoDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  id = 0;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsBoolean()
  isDone = false;
}
