---
name: vasu-playwright-utils
description: Use the vasu-playwright-utils library for Playwright browser automation with simplified action, assertion, locator, element, page, and API utilities.
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
---

# vasu-playwright-utils

A Playwright TypeScript utility library that simplifies browser automation with reusable helper functions for actions, assertions, locators, element queries, page management, and API requests.

## Setup Requirement

Before using any utility, you **must** call `setPage(page)` with the Playwright `Page` instance:

```typescript
import { setPage } from 'vasu-playwright-utils';

// In test setup or beforeEach:
setPage(page);
```

## Import Patterns

### Main export (all utilities)

```typescript
import { click, fill, expectElementToBeVisible, getLocator } from 'vasu-playwright-utils';
```

### Subpath exports (tree-shakable)

```typescript
import { click, fill, clickAndNavigate } from 'vasu-playwright-utils/action-utils';
import { expectElementToBeVisible, expectPageToHaveURL } from 'vasu-playwright-utils/assert-utils';
import { getLocator, getLocatorByRole, getLocatorByText } from 'vasu-playwright-utils/locator-utils';
import { getText, isElementVisible, waitForElementToBeVisible } from 'vasu-playwright-utils/element-utils';
import { gotoURL, switchPage, getPage, setPage } from 'vasu-playwright-utils/page-utils';
import { getRequest, postRequest } from 'vasu-playwright-utils/api-utils';
import { ClickOptions, FillOptions } from 'vasu-playwright-utils/types';
```

## Core Pattern

Most functions accept `string | Locator` as their first argument (the `input` parameter). This means you can pass either a CSS/XPath selector string or a Playwright `Locator` object.

Action functions enforce **visibility by default** (`onlyVisible: true`). Override with `{ onlyVisible: false }`.

Most functions accept an optional `options` object as the last parameter, extending Playwright's native options with:

- `onlyVisible?: boolean` - Filter to visible elements only (default: `true` for actions)
- `stable?: boolean` - Wait for element position to stabilize before acting
- `loadState?: WaitForLoadStateOptions` - Wait for load state after navigation actions
- `soft?: boolean` - Use soft assertions (won't stop test on failure)

## Module Reference

### Action Utils (`action-utils`)

Interact with page elements.

| Function                | Signature                                       | Description                                   |
| ----------------------- | ----------------------------------------------- | --------------------------------------------- |
| `click`                 | `(input, options?: ClickOptions)`               | Click an element                              |
| `clickAndNavigate`      | `(input, options?: ClickOptions)`               | Click and wait for navigation                 |
| `fill`                  | `(input, value: string, options?: FillOptions)` | Fill an input field                           |
| `fillAndEnter`          | `(input, value, options?)`                      | Fill and press Enter                          |
| `fillAndTab`            | `(input, value, options?)`                      | Fill and press Tab                            |
| `pressSequentially`     | `(input, value, options?)`                      | Type character by character                   |
| `pressPageKeyboard`     | `(key, options?)`                               | Press key on the page                         |
| `pressLocatorKeyboard`  | `(input, key, options?)`                        | Press key on an element                       |
| `clear`                 | `(input, options?)`                             | Clear an input field                          |
| `check`                 | `(input, options?)`                             | Check a checkbox/radio                        |
| `uncheck`               | `(input, options?)`                             | Uncheck a checkbox/radio                      |
| `selectByValue`         | `(input, value, options?)`                      | Select dropdown by value                      |
| `selectByValues`        | `(input, values[], options?)`                   | Multi-select by values                        |
| `selectByText`          | `(input, text, options?)`                       | Select dropdown by label text                 |
| `selectByIndex`         | `(input, index, options?)`                      | Select dropdown by index                      |
| `hover`                 | `(input, options?)`                             | Hover over an element                         |
| `focus`                 | `(input, options?)`                             | Focus an element                              |
| `dragAndDrop`           | `(input, dest, options?)`                       | Drag and drop                                 |
| `doubleClick`           | `(input, options?)`                             | Double-click an element                       |
| `downloadFile`          | `(input, savePath, options?)`                   | Click to download, save file, return filename |
| `uploadFiles`           | `(input, path, options?)`                       | Upload files to an input                      |
| `scrollLocatorIntoView` | `(input, options?)`                             | Scroll element into view                      |
| `clickByJS`             | `(input, options?)`                             | Click via JavaScript (bypasses visibility)    |
| `clearByJS`             | `(input, options?)`                             | Clear input via JavaScript                    |
| `acceptAlert`           | `(input, options?)`                             | Click, accept dialog, return message          |
| `dismissAlert`          | `(input, options?)`                             | Click, dismiss dialog, return message         |
| `getAlertText`          | `(input, options?)`                             | Click, get dialog text, dismiss               |

### Assert Utils (`assert-utils`)

Playwright auto-retrying assertions.

| Function                          | Signature                          | Description                          |
| --------------------------------- | ---------------------------------- | ------------------------------------ |
| `expectElementToBeVisible`        | `(input, options?: ExpectOptions)` | Assert element is visible            |
| `expectElementToBeHidden`         | `(input, options?)`                | Assert element is hidden/not in DOM  |
| `expectElementToBeAttached`       | `(input, options?)`                | Assert element is in DOM             |
| `expectElementToBeInViewport`     | `(input, options?)`                | Assert element is in viewport        |
| `expectElementNotToBeInViewport`  | `(input, options?)`                | Assert element is not in viewport    |
| `expectElementToBeChecked`        | `(input, options?)`                | Assert checkbox is checked           |
| `expectElementNotToBeChecked`     | `(input, options?)`                | Assert checkbox is not checked       |
| `expectElementToBeDisabled`       | `(input, options?)`                | Assert element is disabled           |
| `expectElementToBeEnabled`        | `(input, options?)`                | Assert element is enabled            |
| `expectElementToBeEditable`       | `(input, options?)`                | Assert element is editable           |
| `expectElementToHaveText`         | `(input, text, options?)`          | Assert element text equals           |
| `expectElementNotToHaveText`      | `(input, text, options?)`          | Assert element text does not equal   |
| `expectElementToContainText`      | `(input, text, options?)`          | Assert element text contains         |
| `expectElementNotToContainText`   | `(input, text, options?)`          | Assert element text does not contain |
| `expectElementToHaveValue`        | `(input, text, options?)`          | Assert input has value               |
| `expectElementToHaveValues`       | `(input, texts[], options?)`       | Assert multi-select has values       |
| `expectElementValueToBeEmpty`     | `(input, options?)`                | Assert input is empty                |
| `expectElementValueNotToBeEmpty`  | `(input, options?)`                | Assert input is not empty            |
| `expectElementToHaveAttribute`    | `(input, attr, value, options?)`   | Assert element has attribute value   |
| `expectElementToContainAttribute` | `(input, attr, value, options?)`   | Assert attribute contains value      |
| `expectElementToHaveCount`        | `(input, count, options?)`         | Assert element count                 |
| `expectPageToHaveURL`             | `(urlOrRegExp, options?)`          | Assert page URL                      |
| `expectPageToContainURL`          | `(url, options?)`                  | Assert page URL contains             |
| `expectPageToHaveTitle`           | `(titleOrRegExp, options?)`        | Assert page title                    |
| `expectPageSizeToBeEqualTo`       | `(count, options?)`                | Assert number of open pages          |
| `expectAlertToHaveText`           | `(input, text, options?)`          | Assert alert text equals             |
| `expectAlertToMatchText`          | `(input, text, options?)`          | Assert alert text matches            |
| `assertAllSoftAssertions`         | `(testInfo)`                       | Verify all soft assertions passed    |

### Locator Utils (`locator-utils`)

Find elements on the page.

| Function                  | Signature                           | Description                              |
| ------------------------- | ----------------------------------- | ---------------------------------------- |
| `getLocator`              | `(input, options?: LocatorOptions)` | Get locator from selector or Locator     |
| `getVisibleLocator`       | `(input, options?)`                 | Get locator filtered to visible elements |
| `getLocatorByTestId`      | `(testId)`                          | Get locator by `data-testid`             |
| `getLocatorByText`        | `(text, options?)`                  | Get locator by text content              |
| `getLocatorByRole`        | `(role, options?)`                  | Get locator by ARIA role                 |
| `getLocatorByLabel`       | `(text, options?)`                  | Get locator by label                     |
| `getLocatorByPlaceholder` | `(text, options?)`                  | Get locator by placeholder               |
| `getAllLocators`          | `(input, options?)`                 | Get all matching locators                |
| `getFrame`                | `(frameSelector, options?)`         | Get a Frame by name/URL                  |
| `getFrameLocator`         | `(frameInput)`                      | Get a FrameLocator                       |
| `getLocatorInFrame`       | `(frameInput, input)`               | Get locator within a frame               |

### Element Utils (`element-utils`)

Retrieve data and check element state.

| Function                     | Signature                     | Description                            |
| ---------------------------- | ----------------------------- | -------------------------------------- |
| `getText`                    | `(input, options?)`           | Get inner text (trimmed)               |
| `getAllTexts`                | `(input, options?)`           | Get all inner texts                    |
| `getInputValue`              | `(input, options?)`           | Get input value (trimmed)              |
| `getAllInputValues`          | `(input, options?)`           | Get all input values                   |
| `getAttribute`               | `(input, attrName, options?)` | Get attribute value                    |
| `getLocatorCount`            | `(input, options?)`           | Get count of matching elements         |
| `isElementAttached`          | `(input, options?)`           | Check if element is in DOM             |
| `isElementVisible`           | `(input, options?)`           | Check if element is visible            |
| `isElementHidden`            | `(input, options?)`           | Check if element is hidden             |
| `isElementChecked`           | `(input, options?)`           | Check if checkbox is checked           |
| `waitForElementToBeStable`   | `(input, options?)`           | Wait for element position to stabilize |
| `waitForElementToBeVisible`  | `(input, options?)`           | Wait for element to be visible         |
| `waitForElementToBeHidden`   | `(input, options?)`           | Wait for element to be hidden          |
| `waitForElementToBeAttached` | `(input, options?)`           | Wait for element to attach to DOM      |
| `waitForElementToBeDetached` | `(input, options?)`           | Wait for element to detach from DOM    |

### Page Utils (`page-utils`)

Page management and navigation.

| Function               | Signature            | Description                       |
| ---------------------- | -------------------- | --------------------------------- |
| `getPage`              | `()`                 | Get current Page instance         |
| `setPage`              | `(pageInstance)`     | Set current Page instance         |
| `getContext`           | `()`                 | Get current BrowserContext        |
| `getAllPages`          | `()`                 | Get all pages in context          |
| `switchPage`           | `(winNum, options?)` | Switch to page by index (1-based) |
| `switchToDefaultPage`  | `()`                 | Switch to first page              |
| `closePage`            | `(winNum?)`          | Close page by index               |
| `gotoURL`              | `(path, options?)`   | Navigate to URL                   |
| `getURL`               | `(options?)`         | Get current page URL              |
| `waitForPageLoadState` | `(options?)`         | Wait for page load state          |
| `reloadPage`           | `(options?)`         | Reload current page               |
| `goBack`               | `(options?)`         | Navigate back                     |
| `wait`                 | `(ms)`               | Wait for specified milliseconds   |
| `getWindowSize`        | `()`                 | Get browser window dimensions     |
| `saveStorageState`     | `(path?)`            | Save cookies/storage to file      |

### API Utils (`api-utils`)

HTTP requests via Playwright's API context.

| Function               | Signature         | Description               |
| ---------------------- | ----------------- | ------------------------- |
| `getAPIRequestContext` | `()`              | Get the APIRequestContext |
| `getRequest`           | `(url, options?)` | Send GET request          |
| `postRequest`          | `(url, options?)` | Send POST request         |
| `putRequest`           | `(url, options?)` | Send PUT request          |
| `deleteRequest`        | `(url, options?)` | Send DELETE request       |

## Example Test

```typescript
import { test } from '@playwright/test';
import { setPage, gotoURL, click, fill, expectElementToBeVisible, expectPageToHaveURL } from 'vasu-playwright-utils';

test('login flow', async ({ page }) => {
  setPage(page);
  await gotoURL('https://example.com/login');
  await fill('#username', 'testuser');
  await fill('#password', 'password123');
  await clickAndNavigate('#login-button');
  await expectPageToHaveURL(/dashboard/);
  await expectElementToBeVisible('.welcome-message');
});
```

## CLI-to-Library Code Mapping

When using `playwright-cli` to explore pages, translate the generated Playwright code to `vasu-playwright-utils` equivalents:

| playwright-cli Generated Code                  | vasu-playwright-utils Equivalent             |
| ---------------------------------------------- | -------------------------------------------- |
| `await page.goto(url)`                         | `await gotoURL(url)`                         |
| `await page.goBack()`                          | `await goBack()`                             |
| `await page.reload()`                          | `await reloadPage()`                         |
| `await page.locator(sel).click()`              | `await click(sel)`                           |
| `await page.locator(sel).click()` + navigation | `await clickAndNavigate(sel)`                |
| `await page.locator(sel).dblclick()`           | `await doubleClick(sel)`                     |
| `await page.locator(sel).fill(val)`            | `await fill(sel, val)`                       |
| `await page.locator(sel).fill(val)` + Enter    | `await fillAndEnter(sel, val)`               |
| `await page.locator(sel).hover()`              | `await hover(sel)`                           |
| `await page.locator(sel).check()`              | `await check(sel)`                           |
| `await page.locator(sel).uncheck()`            | `await uncheck(sel)`                         |
| `await page.locator(sel).selectOption(val)`    | `await selectByValue(sel, val)`              |
| `await page.locator(sel).dragTo(dest)`         | `await dragAndDrop(sel, dest)`               |
| `await page.keyboard.press(key)`               | `await pressPageKeyboard(key)`               |
| `page.getByRole(role, opts)`                   | `getLocatorByRole(role, opts)`               |
| `page.getByText(text)`                         | `getLocatorByText(text)`                     |
| `page.getByTestId(id)`                         | `getLocatorByTestId(id)`                     |
| `page.getByLabel(text)`                        | `getLocatorByLabel(text)`                    |
| `page.getByPlaceholder(text)`                  | `getLocatorByPlaceholder(text)`              |
| `await expect(loc).toBeVisible()`              | `await expectElementToBeVisible(input)`      |
| `await expect(loc).toBeHidden()`               | `await expectElementToBeHidden(input)`       |
| `await expect(loc).toHaveText(t)`              | `await expectElementToHaveText(input, t)`    |
| `await expect(loc).toContainText(t)`           | `await expectElementToContainText(input, t)` |
| `await expect(loc).toHaveValue(v)`             | `await expectElementToHaveValue(input, v)`   |
| `await expect(loc).toBeChecked()`              | `await expectElementToBeChecked(input)`      |
| `await expect(loc).toBeEnabled()`              | `await expectElementToBeEnabled(input)`      |
| `await expect(loc).toBeDisabled()`             | `await expectElementToBeDisabled(input)`     |
| `await expect(page).toHaveURL(url)`            | `await expectPageToHaveURL(url)`             |
| `await expect(page).toHaveTitle(t)`            | `await expectPageToHaveTitle(t)`             |

See `references/` for detailed documentation on specific modules:

- `references/browser-strategy.md` — When to use WebFetch vs playwright-cli for optimal token usage
