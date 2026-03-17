# Action Utils Reference

Source: `src/vasu-playwright-lib/utils/action-utils.ts`

## Overview

Action utils provide functions for interacting with page elements. All action functions:

- Accept `string | Locator` as the first `input` parameter
- Enforce visibility by default (`onlyVisible: true`)
- Support `stable: true` option to wait for element position stability
- Return `Promise<void>` unless noted otherwise

## Click Actions

### `click(input, options?: ClickOptions)`

Clicks on a visible element. Supports all Playwright click options plus `onlyVisible` and `stable`.

### `clickAndNavigate(input, options?: ClickOptions)`

Clicks and waits for page navigation (framenavigated event + load state). Use this instead of `click` when the click triggers a full page navigation. Throws if no navigation occurs.

### `doubleClick(input, options?: DoubleClickOptions)`

Double-clicks on a visible element.

### `clickByJS(input, options?: TimeoutOption)`

Clicks using JavaScript `el.click()`. Bypasses visibility checks. Useful when standard click fails due to overlapping elements or CSS issues.

## Input Actions

### `fill(input, value: string, options?: FillOptions)`

Fills an input field, replacing existing content.

### `fillAndEnter(input, value: string, options?: FillOptions)`

Fills an input field then presses Enter.

### `fillAndTab(input, value: string, options?: FillOptions)`

Fills an input field then presses Tab.

### `pressSequentially(input, value: string, options?: PressSequentiallyOptions)`

Types value character by character, simulating real keystrokes. Useful when `fill` doesn't trigger proper input events.

### `clear(input, options?: ClearOptions)`

Clears an input field.

### `clearByJS(input, options?: TimeoutOption)`

Clears input using JavaScript, dispatches `input` and `change` events. Use when standard `clear` doesn't work.

## Keyboard Actions

### `pressPageKeyboard(key: string, options?: PressSequentiallyOptions)`

Presses a key on the page (not on a specific element). Example: `pressPageKeyboard('Escape')`.

### `pressLocatorKeyboard(input, key: string, options?: PressSequentiallyOptions)`

Presses a key on a specific element. Example: `pressLocatorKeyboard('#search', 'Enter')`.

## Selection Actions

### `selectByValue(input, value: string, options?: SelectOptions)`

Selects a dropdown option by its `value` attribute.

### `selectByValues(input, values: string[], options?: SelectOptions)`

Multi-select by `value` attributes.

### `selectByText(input, text: string, options?: SelectOptions)`

Selects a dropdown option by its visible text (label).

### `selectByIndex(input, index: number, options?: SelectOptions)`

Selects a dropdown option by its zero-based index.

## Checkbox/Radio

### `check(input, options?: CheckOptions)`

Checks a checkbox or radio button.

### `uncheck(input, options?: CheckOptions)`

Unchecks a checkbox.

## Mouse Actions

### `hover(input, options?: HoverOptions)`

Hovers over an element.

### `focus(input, options?)`

Focuses on an element.

### `dragAndDrop(input, dest, options?: DragOptions)`

Drags element `input` and drops on element `dest`. Both accept `string | Locator`.

## File Actions

### `downloadFile(input, savePath: string, options?: ClickOptions): Promise<string>`

Clicks the element to trigger a download, saves to `savePath`, returns the suggested filename. Works with remote browsers.

### `uploadFiles(input, path: UploadValues, options?: UploadOptions)`

Uploads files to a file input element.

## Other

### `scrollLocatorIntoView(input, options?: TimeoutOption)`

Scrolls the element into view if needed.

## Alert/Dialog Actions

### `acceptAlert(input, options?): Promise<string>`

Clicks element, accepts the resulting dialog (optionally with prompt text), returns dialog message.
Options: `{ promptText?: string, timeout?: number }`

### `dismissAlert(input, options?): Promise<string>`

Clicks element, dismisses the resulting dialog, returns dialog message.

### `getAlertText(input, options?): Promise<string>`

Clicks element, gets dialog message text, dismisses it, returns the message.

## Option Types

All option types extend Playwright's native options with:

- `onlyVisible?: boolean` - Default `true` for action functions
- `stable?: boolean` - Wait for element to stop moving before acting

```typescript
type ClickOptions = PlaywrightClickOptions & VisibilityOption & StabilityOption & LoadstateOption;
type FillOptions = PlaywrightFillOptions & VisibilityOption & StabilityOption;
// ... similar pattern for all option types
```
