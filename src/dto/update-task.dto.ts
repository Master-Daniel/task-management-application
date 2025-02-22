import { IsEnum } from 'class-validator';

export class UpdateTaskDto {
  @IsEnum(['active', 'completed'], {
    message: 'Status must be either active or completed',
  })
  status: 'active' | 'completed';
}
