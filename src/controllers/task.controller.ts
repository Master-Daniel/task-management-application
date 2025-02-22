import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { TaskService } from '../services/task.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@ApiTags('Tasks') // Groups all endpoints under 'Tasks' in Swagger UI
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // Create A new
  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description: 'Task created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Validation failed',
  })
  @ApiBody({ type: CreateTaskDto }) // Documents the expected request body
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto.description);
  }

  // Get all tasks, optionally filtered by status
  @Get()
  @ApiOperation({ summary: 'Get all tasks, optionally filtered by status' })
  @ApiResponse({
    status: 200,
    description: 'List of tasks returned successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid status value',
  })
  async getTasks(@Query('status') status?: 'all' | 'active' | 'completed') {
    return this.taskService.findAll(status);
  }

  // Update task status
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({ summary: 'Update a task status' })
  @ApiParam({ name: 'id', required: true, description: 'Task ID', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Task updated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid status or ID format',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  async update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto.status);
  }

  // Delete a task
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiParam({ name: 'id', required: true, description: 'Task ID', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Task deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  async deleteTask(@Param('id') id: number) {
    return this.taskService.delete(id);
  }
}
