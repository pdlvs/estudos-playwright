import { APIRequestContext, expect, test } from '@playwright/test';
import { TaskModel } from '../fixtures/task.model';

// Helper function para deletar uma tarefa pelo nome
export async function deleteByTaskHelper(request: APIRequestContext, taskName: string) {
  await request.delete('http://localhost:3333/helper/tasks/' + taskName);
}

// Helper function para criar uma nova tarefa
export async function postTaskHelper(request: APIRequestContext, task: TaskModel) {
  const newTask = await request.post('http://localhost:3333/tasks', {
    data: task
  })
  expect(newTask.ok()).toBeTruthy();
}