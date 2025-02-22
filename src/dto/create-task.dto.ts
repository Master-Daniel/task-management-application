import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Description of the task',
    example: 'Buy groceries',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
