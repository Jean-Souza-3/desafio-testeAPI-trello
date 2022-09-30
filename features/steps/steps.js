const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require('@playwright/test')

Given('que esteja na página esidiomas', async function () {
  await page.locator('xpath=//*[@id="app"]/main/header/div[2]/a/img');
});

When('acessar a aba cursos', async function () {
  await page.locator('li:nth-child(3) > div > a').click();
});


Then('validar a página e deve conter o texto Aulas individuais ou em grupos pequenos.', async function () {
  const text = page.locator('[class*=block-grid] div[id=zC7QFe] p span');
  await expect(text).toHaveText('Aulas individuais ou em grupos pequenos. Inglês para todas as oportunidades, com foco em comunicação. Seguem o ritmo do aluno  e abordam assuntos variados.');
  await page.waitForTimeout(1500);
});

