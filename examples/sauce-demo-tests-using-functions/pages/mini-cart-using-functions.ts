import { expectElementToHaveText } from 'vasu-playwright-utils';

const miniCartCount = `//*[@id='shopping_cart_container']//span`;

export async function verifyMiniCartCount(expectedMiniCartCount: string) {
  await expectElementToHaveText(miniCartCount, expectedMiniCartCount);
}
