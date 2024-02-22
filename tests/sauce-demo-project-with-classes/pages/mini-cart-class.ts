import { expectElementToHaveText } from 'vasu-playwright-utils';
import { getLocator } from 'vasu-playwright-utils';

//Approach 1 to declare the Locators as class properties
export class MiniCart {
  // We will use public modifier if we want to access the locator outside of this class
  private readonly miniCartCount = () => getLocator(`//*[@id='shopping_cart_container']//span`);

  async verifyMiniCartCount(expectedMiniCartCount: string): Promise<void> {
    await expectElementToHaveText(this.miniCartCount(), expectedMiniCartCount);
  }
}

//Approach 2 to declare the Locators using Getters
/*
import { Locator } from '@playwright/test';
export class MiniCart {
  public get miniCartCount(): Locator {
    return getLocator(`//*[@id='shopping_cart_container']//span`);
  }

  async verifyMiniCartCount(expectedMiniCartCount: string): Promise<void> {
    await expectElementToHaveText(this.miniCartCount, expectedMiniCartCount);
  }
}
*/

//Approach 3 to declare the Locators using Global variables/functions
/*
const miniCartCount = () => getLocator(`//*[@id='shopping_cart_container']//span`);
export class MiniCart {
  async verifyMiniCartCount(expectedMiniCartCount: string): Promise<void> {
    await expectElementToHaveText(miniCartCount(), expectedMiniCartCount);
  }
}
*/
