import { Page, expect } from '@playwright/test';
import { TaskModel } from '../../../fixtures/task.model';

// Page Object Model para a página de tarefas
export class TasksPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async visit() {
        await this.page.goto('http://localhost:8080');
    }
    // Método para criar uma nova tarefa
    async create(task: TaskModel) {
        const inputTaskName = this.page.locator('input[placeholder="Add a new Task"]');
        await inputTaskName.fill(task.name);
        await this.page.click('css=button >> text=Create');

    }

    async shouldHaveText(taskName: string) {
        const target = this.page.locator(`css=.task-item p >> text=${taskName}`);
        await expect(target).toBeVisible();
    }

    async shouldAlertText(text: string) {
        const target = this.page.locator('.swal2-html-container');

        await expect(target).toHaveText(text);

    }
}