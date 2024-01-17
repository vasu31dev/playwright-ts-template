import { click } from 'vasu-playwright-utils';
import { expectElementToBeHidden, expectElementToBeVisible } from 'vasu-playwright-utils';
import { getLocator } from 'vasu-playwright-utils';

const productsContainer = () => getLocator(`#inventory_container`).nth(0);
const addToCartButton = `(//*[@class='inventory_item'])[%s]//*[contains(@id,'add-to-cart')]`;

export async function verifyProductsPageIsDisplayed() {
  await expectElementToBeVisible(productsContainer(), { timeout: 1000, message: 'Logged in user should see Products' });
}

export async function verifyProductsPageIsNotDisplayed() {
  await expectElementToBeHidden(productsContainer(), 'Products should not be displayed');
}

export async function addToCartByProductNumber(productNo: number) {
  await click(addToCartButton.replace('%s', productNo.toString()));
}
