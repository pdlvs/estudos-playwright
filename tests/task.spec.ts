import {test, expect} from '@playwright/test';

test('Deve permitir cadastrar uma nova tarefa', async({page, request}) => {

  //Dado que eu tenha uma nova tarefa
    const taskName = 'Estudar Playwright';
    await request.delete('http://localhost:3333/helper/tasks/' + taskName);
  // E que eu estou na página de cadastro   
    await page.goto('http://localhost:8080');

  // Quando eu faço o cadastro dessa tarefa
    const inputTaskName = page.locator('input[placeholder="Add a new Task"]');
    await inputTaskName.fill(taskName);
    await page.click('css=button >> text=Create');

  //Então a tarefa deve ser exibida na lista de tarefas
    const target = page.getByTestId('task-item')
    await expect(target).toHaveText(taskName);
  });