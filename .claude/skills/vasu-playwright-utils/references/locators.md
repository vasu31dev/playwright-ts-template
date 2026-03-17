# Locator Utils Reference

Source: `src/vasu-playwright-lib/utils/locator-utils.ts`

## Locator Strategy Priority

When choosing locators for test code, follow this priority order (best to worst). Always prefer the highest-priority strategy that uniquely identifies the element.

### 1. `data-testid` attributes (Best)

Purpose-built for testing. Never changes due to styling or refactoring.

```typescript
// HTML: <button data-testid="submit-order">Place Order</button>
await click(getLocatorByTestId('submit-order'));
```

### 2. Other `data-*` attributes

Custom data attributes that carry stable, semantic meaning.

```typescript
// HTML: <div data-product-id="shoes-001">...</div>
await click('[data-product-id="shoes-001"]');

// HTML: <tr data-row-type="header">...</tr>
await expectElementToBeVisible('[data-row-type="header"]');
```

### 3. `id` attributes

Stable when IDs are meaningful and developer-controlled. Avoid auto-generated IDs.

```typescript
// Good: semantic ID
await fill('#search-input', 'playwright');

// Bad: auto-generated ID (changes every render)
// await fill('#input-7f3a2b', 'playwright');  // DON'T use this
```

### 4. `name` attributes

Reliable for form elements. Often stable across releases.

```typescript
// HTML: <input name="email" type="email">
await fill('[name="email"]', 'user@example.com');

// HTML: <select name="country">...</select>
await selectByText('[name="country"]', 'United States');
```

### 5. Playwright built-in locators

Semantic locators that match how users perceive the page. Resilient to DOM changes.

```typescript
// By ARIA role + accessible name (preferred for interactive elements)
await click(getLocatorByRole('button', { name: 'Submit' }));
await fill(getLocatorByRole('textbox', { name: 'Email' }), 'user@example.com');
await click(getLocatorByRole('link', { name: 'Sign up' }));
await check(getLocatorByRole('checkbox', { name: 'Remember me' }));

// By label text (preferred for form fields)
await fill(getLocatorByLabel('Email address'), 'user@example.com');

// By placeholder text
await fill(getLocatorByPlaceholder('Search...'), 'playwright');

// By visible text content
await click(getLocatorByText('Add to cart'));

// Use regex for partial or case-insensitive matching
await click(getLocatorByRole('button', { name: /submit/i }));
await click(getLocatorByText(/view details/i));
```

### 6. XPath with unique attributes

Use only when higher-priority strategies are unavailable. Target stable attributes.

```typescript
// Good: XPath with stable attributes
await click('//button[@aria-label="Close dialog"]');
await click('//input[@type="email"]');

// Good: ancestor scoping with stable attributes
await click('//div[@data-section="billing"]//button[@type="submit"]');
```

### 7. CSS with unique attributes

Similar to XPath — use stable attributes, not structural position.

```typescript
// Good: attribute-based CSS
await click('button[aria-label="Close dialog"]');
await fill('input[type="email"]', 'user@example.com');

// Good: scoped by stable parent
await click('.billing-section button[type="submit"]');
```

### 8. XPath (structural)

Positional XPath. Fragile — use as last resort.

```typescript
// Fragile: depends on DOM structure
await click('//div[@class="form-group"][2]//button');
```

### 9. CSS (structural)

Positional CSS. Equally fragile.

```typescript
// Fragile: depends on DOM order
await click('.form-group:nth-child(2) button');
```

### What to Avoid

Locators that rely on values likely to change between runs:

```typescript
// DON'T: auto-generated IDs
await click('#ember-1234');
await click('#react-select-3-option-0');

// DON'T: dynamic index numbers or counts
await click('//tr[42]/td[3]/button');

// DON'T: timestamp or session-dependent values
await click('[data-id="item-1710612345"]');

// DON'T: deeply nested structural paths
await click('div > div > div > ul > li:nth-child(3) > a');

// DON'T: class names from CSS frameworks (change on rebuild)
await click('.css-1a2b3c');
await click('.MuiButton-root-123');
```

## Key Concept: Visible by Default

`getVisibleLocator()` (and by extension all action functions) filters to only visible elements by default. This prevents accidentally interacting with hidden duplicates.

```typescript
// Returns locator filtered to visible elements
const loc = getVisibleLocator('#submit');

// Equivalent to:
const loc = getLocator('#submit', { onlyVisible: true });

// To include hidden elements:
const loc = getLocator('#submit', { onlyVisible: false });
```

## Locator Functions

### `getLocator(input: string | Locator, options?: LocatorOptions): Locator`

Core function. If `input` is a string, creates a locator via `page.locator(input)`. If `input` is already a Locator, returns it as-is. When `onlyVisible: true`, appends `visible=true` filter.

### `getVisibleLocator(input: string | Locator, options?: LocatorOptions): Locator`

Same as `getLocator` but defaults to `onlyVisible: true`. This is what action functions use internally.

### `getLocatorByTestId(testId: string | RegExp): Locator`

Uses `page.getByTestId()`. The test ID attribute is configured in `playwright.config.ts` (defaults to `data-testid`).

### `getLocatorByText(text: string | RegExp, options?: GetByTextOptions): Locator`

Uses `page.getByText()`. Finds elements by their text content.

### `getLocatorByRole(role: GetByRoleTypes, options?: GetByRoleOptions): Locator`

Uses `page.getByRole()`. Finds elements by ARIA role.

```typescript
const btn = getLocatorByRole('button', { name: 'Submit' });
const link = getLocatorByRole('link', { name: /learn more/i });
```

### `getLocatorByLabel(text: string | RegExp, options?: GetByRoleOptions): Locator`

Uses `page.getByLabel()`. Finds form elements by their associated label.

### `getLocatorByPlaceholder(text: string | RegExp, options?: GetByPlaceholderOptions): Locator`

Uses `page.getByPlaceholder()`. Finds input elements by placeholder text.

### `getAllLocators(input: string | Locator, options?): Promise<Locator[]>`

Returns all matching locators as an array. Waits for at least the first element to be attached before resolving.

Options include `waitForLocator?: boolean` (default `true`) and `timeout?: number`.

## Frame Functions

### `getFrame(frameSelector: FrameOptions, options?): Frame | null`

Gets a Frame by name or URL. Throws if not found unless `{ force: true }`.

```typescript
const frame = getFrame({ name: 'my-iframe' });
const frame = getFrame({ url: /embed/ });
```

### `getFrameLocator(frameInput: string | FrameLocator): FrameLocator`

Gets a FrameLocator from a selector or existing FrameLocator.

### `getLocatorInFrame(frameInput, input): Locator`

Gets a locator for an element inside a frame.

```typescript
const btn = getLocatorInFrame('#my-iframe', '#submit-btn');
await click(btn); // Works with action utils
```

## Option Types

```typescript
type LocatorOptions = PlaywrightLocatorOptions & { onlyVisible?: boolean };
type LocatorWaitOptions = { waitForLocator?: boolean } & TimeoutOption;
type GetByTextOptions = PlaywrightGetByTextOptions & { onlyVisible?: boolean };
type GetByRoleTypes = PlaywrightGetByRoleTypes & { onlyVisible?: boolean };
type GetByRoleOptions = PlaywrightGetByRoleOptions & { onlyVisible?: boolean };
type GetByPlaceholderOptions = PlaywrightGetByPlaceholderOptions & { onlyVisible?: boolean };
type FrameOptions = PlaywrightFrameOptions; // { name?: string, url?: string | RegExp }
```
