# Assert Utils Reference

Source: `src/vasu-playwright-lib/utils/assert-utils.ts`

## Using Assertions in Spec Files

**Do not use assertions in spec files.** Assertions are for building and verifying behaviour inside page objects (e.g. `verify*` methods). Spec files should only orchestrate steps and call those methods so the test reads like a clear, readable scenario.

### Good Example — Readable Spec (No Assertions in Spec)

The spec reads like a test plan; all assertions live in page files.

**Spec file** — plain English, no assertion utils:

```typescript
test('Complete checkout flow', async () => {
  await LoginPage.loginWithValidCredentials();
  await ProductsPage.verifyProductsPageIsDisplayed();
  await ProductsPage.addToCartByProductNumber(1);
  await MiniCart.verifyMiniCartCount('1');
  await CheckoutPage.goToCart();
  await CheckoutPage.clickCheckout();
  await CheckoutPage.fillCheckoutInfo();
  await CheckoutPage.clickContinue();
  await CheckoutPage.clickFinish();
  await CheckoutPage.verifyOrderComplete();
});
```

**Page file** — assertions live here with descriptive messages:

```typescript
// sauce-demo-products-page.ts
import { expectElementToBeVisible, expectElementToBeHidden } from '@utils/assert-utils';
import { getLocator } from '@utils/locator-utils';

const productsContainer = () => getLocator('#inventory_container').nth(0);

export async function verifyProductsPageIsDisplayed() {
  await expectElementToBeVisible(productsContainer(), { timeout: 1000, message: 'Logged in user should see Products' });
}

export async function verifyProductsPageIsNotDisplayed() {
  await expectElementToBeHidden(productsContainer(), 'Products should not be displayed');
}
```

```typescript
// sauce-demo-checkout-page.ts
import { expectElementToContainText } from '@utils/assert-utils';

export async function verifyOrderComplete() {
  await expectElementToContainText(orderCompleteMessage(), /thank you for your order/i, {
    message: 'Checkout complete message should be displayed',
  });
}
```

## Overview

All assertion functions:

- Accept `string | Locator` as the `input` parameter
- Support `soft` option for soft assertions that don't stop the test
- Support `timeout` option to override the default expect timeout
- Support `message` option (or a string shorthand) for descriptive failure messages
- Auto-retry until the condition is met or timeout is reached

## Soft Assertions

Pass `{ soft: true }` to any assertion. Call `assertAllSoftAssertions(testInfo)` at the end to fail the test if any soft assertion failed.

```typescript
await expectElementToBeVisible('#header', { soft: true });
await expectElementToHaveText('#title', 'Welcome', { soft: true });
assertAllSoftAssertions(testInfo);
```

## Element Assertions

| Function                                          | Description                            |
| ------------------------------------------------- | -------------------------------------- |
| `expectElementToBeVisible(input, options?)`       | Element is in DOM and visible          |
| `expectElementToBeHidden(input, options?)`        | Element is not in DOM or hidden        |
| `expectElementToBeAttached(input, options?)`      | Element is in DOM (may not be visible) |
| `expectElementToBeInViewport(input, options?)`    | Element is visible in viewport         |
| `expectElementNotToBeInViewport(input, options?)` | Element is not in viewport             |
| `expectElementToBeChecked(input, options?)`       | Checkbox/radio is checked              |
| `expectElementNotToBeChecked(input, options?)`    | Checkbox/radio is not checked          |
| `expectElementToBeDisabled(input, options?)`      | Element is disabled                    |
| `expectElementToBeEnabled(input, options?)`       | Element is enabled                     |
| `expectElementToBeEditable(input, options?)`      | Element is editable                    |

## Text Assertions

| Function                                               | Description                     |
| ------------------------------------------------------ | ------------------------------- |
| `expectElementToHaveText(input, text, options?)`       | Text equals value (exact match) |
| `expectElementNotToHaveText(input, text, options?)`    | Text does NOT equal value       |
| `expectElementToContainText(input, text, options?)`    | Text contains value (substring) |
| `expectElementNotToContainText(input, text, options?)` | Text does NOT contain value     |

`text` accepts `string | RegExp | Array<string | RegExp>`. Options extend with `ignoreCase?: boolean` and `useInnerText?: boolean`.

## Value Assertions

| Function                                            | Description                         |
| --------------------------------------------------- | ----------------------------------- |
| `expectElementToHaveValue(input, text, options?)`   | Input has the specified value       |
| `expectElementToHaveValues(input, texts, options?)` | Multi-select has specified values   |
| `expectElementValueToBeEmpty(input, options?)`      | Input/editable element is empty     |
| `expectElementValueNotToBeEmpty(input, options?)`   | Input/editable element is not empty |

## Attribute & Count Assertions

| Function                                                        | Description                              |
| --------------------------------------------------------------- | ---------------------------------------- |
| `expectElementToHaveAttribute(input, attr, value, options?)`    | Attribute equals value                   |
| `expectElementToContainAttribute(input, attr, value, options?)` | Attribute contains value                 |
| `expectElementToHaveCount(input, count, options?)`              | Number of matching elements equals count |

## Page Assertions

| Function                                         | Description                       |
| ------------------------------------------------ | --------------------------------- |
| `expectPageToHaveURL(urlOrRegExp, options?)`     | Page URL matches exactly          |
| `expectPageToContainURL(url, options?)`          | Page URL contains string          |
| `expectPageToHaveTitle(titleOrRegExp, options?)` | Page title matches                |
| `expectPageSizeToBeEqualTo(count, options?)`     | Number of open pages equals count |

## Alert Assertions

| Function                                        | Description                                        |
| ----------------------------------------------- | -------------------------------------------------- |
| `expectAlertToHaveText(input, text, options?)`  | Clicks element, asserts alert text equals value    |
| `expectAlertToMatchText(input, text, options?)` | Clicks element, asserts alert text matches pattern |

## Option Types

```typescript
type ExpectOptions = TimeoutOption & SoftOption & MessageOrOptions;
// TimeoutOption = { timeout?: number }
// SoftOption = { soft?: boolean }
// MessageOrOptions = string | { message?: string }

type ExpectTextOptions = { ignoreCase?: boolean; useInnerText?: boolean };
```
