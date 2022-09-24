         const{ Given, When, Then } = require("@cucumber/cucumber");
         const { expect } = require ('@playwright/test')

         Given('que esteja na página esidiomas', async function () {
           await page.goto('https://www.esidiomas.com.br/');
         });

         When('acessar a aba cursos', async function () {
            await page.locator('li:nth-child(3) > div > a').click();
          });
 

          Then('validar a página e deve conter o texto Aulas individuais ou em grupos pequenos.', async function () {
             expect(await page.locator('p > span').first()).toContainText('Aulas individuais ou em grupos pequenos')
          });
 
