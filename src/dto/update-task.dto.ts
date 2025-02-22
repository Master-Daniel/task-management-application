import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export enum TaskStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export class UpdateTaskDto {
  @ApiProperty({
    description: 'Task status (must be either active or completed)',
    enum: TaskStatus,
  })
  @IsEnum(TaskStatus, {
    message: 'Status must be either active or completed',
  })
  status: TaskStatus;
}
