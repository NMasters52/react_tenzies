// @ts-check
import { test, expect } from '@playwright/test';


test('has title', async ({page}) => {
  await page.goto('https://main--nmtenzies.netlify.app/');

  //expect page to have a title
  await expect(page).toHaveTitle('Tenzies')

  //expect there to be 10 dice rendered
  const diceElements = await page.$$('.die');
  expect(diceElements.length).toBe(10);

  //click dice
  const firstDie = diceElements[0];
  const initialColor = await firstDie.evaluate((el) => getComputedStyle(el).backgroundColor);
  await firstDie.click();
  const colorAfterClick = await firstDie.evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(colorAfterClick).not.toBe(initialColor);
});

