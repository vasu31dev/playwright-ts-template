# Assert Utils Reference

Source: `src/vasu-playwright-lib/utils/assert-utils.ts`

## Overview

Assert utils wrap Playwright's auto-retrying `expect` assertions with a simplified API. All assertion functions:

- Accept `string | Locator` as the `input` parameter (converted to Locator internally)
- Support `soft` option for soft assertions that don't stop the test
- Support `timeout` option to override the default expect timeout
- Auto-retry until the condition is met or timeout is reached

## Soft Assertions

Pass `{ soft: true }` to any assertion to make it a soft assertion. Soft assertions record failures but don't stop the test. Call `assertAllSoftAssertions(testInfo)` at the end to verify all passed.

```typescript
await expectElementToBeVisible('#header', { soft: true });
await expectElementToHaveText('#title', 'Welcome', { soft: true });
assertAllSoftAssertions(testInfo); // Fails if any soft assertion failed
```

## Element Visibility & State

### `expectElementToBeVisible(input, options?: ExpectOptions)`

Asserts element is present in DOM and visible.

### `expectElementToBeHidden(input, options?: ExpectOptions)`

Asserts element is not present in DOM or is hidden.

### `expectElementToBeAttached(input, options?: ExpectOptions)`

Asserts element is present in DOM (may not be visible).

### `expectElementToBeInViewport(input, options?: ExpectOptions)`

Asserts element is visible within the page viewport.

### `expectElementNotToBeInViewport(input, options?: ExpectOptions)`

Asserts element is not in the viewport.

## Checkbox State

### `expectElementToBeChecked(input, options?: ExpectOptions)`

### `expectElementNotToBeChecked(input, options?: ExpectOptions)`

## Enabled/Disabled/Editable

### `expectElementToBeDisabled(input, options?: ExpectOptions)`

### `expectElementToBeEnabled(input, options?: ExpectOptions)`

### `expectElementToBeEditable(input, options?: ExpectOptions)`

## Text Assertions

### `expectElementToHaveText(input, text, options?)`

Asserts element's text content equals the provided value.

- `text`: `string | RegExp | Array<string | RegExp>`
- Options extend `ExpectOptions` with `ignoreCase?: boolean` and `useInnerText?: boolean`

### `expectElementNotToHaveText(input, text, options?)`

Asserts element's text does NOT equal the provided value.

### `expectElementToContainText(input, text, options?)`

Asserts element's text contains the provided value (substring match).

### `expectElementNotToContainText(input, text, options?)`

Asserts element's text does NOT contain the provided value.

## Value Assertions

### `expectElementToHaveValue(input, text: string | RegExp, options?)`

Asserts an input element has the specified value.

### `expectElementToHaveValues(input, texts: Array<string | RegExp>, options?)`

Asserts a multi-select has the specified values selected.

### `expectElementValueToBeEmpty(input, options?)`

Asserts an input/editable element is empty.

### `expectElementValueNotToBeEmpty(input, options?)`

Asserts an input/editable element is not empty.

## Attribute Assertions

### `expectElementToHaveAttribute(input, attribute: string, value: string | RegExp, options?)`

Asserts element has an attribute with the exact value.

### `expectElementToContainAttribute(input, attribute: string, value: string | RegExp, options?)`

Asserts element has an attribute whose value contains the given pattern.

## Count Assertion

### `expectElementToHaveCount(input, count: number, options?)`

Asserts the number of elements matching the selector equals `count`.

## Page Assertions

### `expectPageToHaveURL(urlOrRegExp: string | RegExp, options?)`

Asserts the current page URL matches exactly.

### `expectPageToContainURL(url: string, options?)`

Asserts the current page URL contains the given string.

### `expectPageToHaveTitle(titleOrRegExp: string | RegExp, options?)`

Asserts the page title matches.

### `expectPageSizeToBeEqualTo(numberOfPages: number, options?)`

Asserts the number of open pages in the browser context.

## Alert Assertions

### `expectAlertToHaveText(input, text: string, options?)`

Clicks element, triggers dialog, asserts dialog message equals `text`.

### `expectAlertToMatchText(input, text: string | RegExp, options?)`

Clicks element, triggers dialog, asserts dialog message matches `text`.

## Option Types

```typescript
type ExpectOptions = TimeoutOption & SoftOption & MessageOrOptions;
// TimeoutOption = { timeout?: number }
// SoftOption = { soft?: boolean }
// MessageOrOptions = string | { message?: string }

type ExpectTextOptions = {
  ignoreCase?: boolean;
  useInnerText?: boolean;
};
```
