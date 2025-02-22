import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { Task } from '../entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepo: EntityRepository<Task>,
  ) {}

  async create(description: string): Promise<Task> {
    const task = this.taskRepo.create({ description, status: 'active' });
    const em: EntityManager = this.taskRepo.getEntityManager();
    em.persist(task);
    await em.flush();
    return task;
  }

  async findAll(status?: 'active' | 'completed' | 'all'): Promise<Task[]> {
    const filters = status && status !== 'all' ? { status } : {};
    return this.taskRepo.find(filters);
  }

  async update(
    id: number,
    status: 'active' | 'completed',
  ): Promise<{ message: string; task?: Task }> {
    const task = await this.taskRepo.findOne({ id });
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);

    task.status = status;
    task.updatedAt = new Date();
    await this.taskRepo.getEntityManager().flush();
    return {
      message: `Task with ID ${id} has been updated successfully`,
      task,
    };
  }

  async delete(id: number): Promise<{ message: string }> {
    const task = await this.taskRepo.findOne({ id });
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);

    const em = this.taskRepo.getEntityManager();
    em.remove(task);
    await em.flush();

    return { message: `Task with ID ${id} has been deleted successfully` };
  }
}
