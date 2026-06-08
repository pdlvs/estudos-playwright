import { test, expect } from '@playwright/test';
import { TaskModel } from './fixtures/task.model';
import { deleteByTaskHelper, postTaskHelper } from './support/helpers';


test('Deve permitir cadastrar uma nova tarefa', async ({ page, request }) => {
  const task: TaskModel = {
    name: 'Ler um livro',
    is_done: false
  };

  await deleteByTaskHelper(request, task.name);
  await page.goto('http://localhost:8080');

  const inputTaskName = page.locator('input[placeholder="Add a new Task"]');
  await inputTaskName.fill(task.name);
  await page.click('css=button >> text=Create');

  const target = page.locator(`css=.task-item p >> text=${task.name}`);
  await expect(target).toBeVisible();
});

test('Não deve permitir tarefa duplicada', async ({ page, request }) => {
  //Dado que eu tenha uma tarefa já cadastrada
  const task: TaskModel = {
    name: 'Estudar Playwright',
    is_done: false
  }
  // Garantindo que a tarefa não exista antes de criar
  await deleteByTaskHelper(request, task.name);

  await postTaskHelper(request, task);

  await page.goto('http://localhost:8080');
  // Quando tento cadastrar a mesma tarefa novamente
  const inputTaskName = page.locator('input[placeholder="Add a new Task"]');
  await inputTaskName.fill(task.name);
  await page.click('css=button >> text=Create');

  const target = page.locator('.swal2-html-container');
  // Então deve ser exibida uma mensagem de erro informando que a tarefa já existe
  await expect(target).toHaveText('Task already exists!');

});