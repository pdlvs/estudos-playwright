import { test, expect } from '@playwright/test';
import { TaskModel } from './fixtures/task.model';
import { deleteByTaskHelper, postTaskHelper } from './support/helpers';
import { TasksPage } from './support/pages/tasks/index';


test('Deve permitir cadastrar uma nova tarefa', async ({ page, request }) => {
  const task: TaskModel = {
    name: 'Ler um livro',
    is_done: false
  };

  await deleteByTaskHelper(request, task.name);

  const taskPage: TasksPage = new TasksPage(page);

  await taskPage.visit();
  await taskPage.create(task);
  await taskPage.shouldHaveText(task.name);
});

test('Não deve permitir tarefa duplicada', async ({ page, request }) => {
  const task: TaskModel = {
    name: 'Estudar Playwright',
    is_done: false
  }
  await deleteByTaskHelper(request, task.name);

  await postTaskHelper(request, task);

  const taskPage: TasksPage = new TasksPage(page);

  await taskPage.visit();
  await taskPage.create(task);
  await taskPage.shouldAlertText('Task already exists!');
});