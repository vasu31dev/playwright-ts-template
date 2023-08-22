import { expectElementToHaveText } from 'vasu-playwright-utils';
import { getLocator } from 'vasu-playwright-utils';

const miniCartCount = () => getLocator(`//*[@id='shopping_cart_container']//span`);

export async function verifyMiniCartCount(expMiniCartCount: string) {
  await expectElementToHaveText(miniCartCount(), expMiniCartCount);
}
