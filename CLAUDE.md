# Playwright TypeScript Project

## Project Overview

A Playwright TypeScript end-to-end testing framework for Web (Desktop & Mobile), API, and Electron apps. Built on top of `vasu-playwright-utils` which provides simplified utility functions for actions, assertions, locators, elements, page management, and API requests.

**Repository**: `vasu31dev/playwright-ts-template`
**Default test target**: https://www.saucedemo.com (configurable via `URL` env var or `.env` file)
**AI Tools**: Claude Code and Cursor (skills and agents shared via `.claude/` and `.cursor/rules/`)

## Project Structure

```
playwright-ts-template/
├── playwright.config.ts          # Playwright configuration (projects, timeouts, reporters)
├── test-setup/
│   ├── page-setup.ts             # Sets page context via setPage() before each test
│   ├── global-setup.ts           # Runs before all tests (initialization hooks)
│   └── global-teardown.ts        # Runs after all tests (cleanup hooks)
├── tests/
│   ├── specs/                    # Test spec files (*.spec.ts)
│   ├── pages/                    # Page Object classes (class-based POM)
│   ├── fixtures/
│   │   └── testFixtures.ts       # Custom Playwright fixtures for page objects
│   ├── testdata/                 # Test data files
│   └── storage-setup/            # Authentication storage state setup
├── .claude/
│   ├── skills/
│   │   ├── vasu-playwright-utils/ # API docs, locator strategy, browser strategy, function references
│   │   └── playwright-cli/        # Browser automation CLI commands and references
│   └── agents/                    # Agent workflows (planner, generator, healer)
└── .cursor/rules/                 # Cursor rules referencing .claude/ skills and agents via @file
```

## Key Conventions

### Imports and Path Aliases

Use TypeScript path aliases defined in `tsconfig.json`:

- `@pages/*` -> `tests/pages/*`
- `@testdata/*` -> `tests/testdata/*`
- `@fixturesetup` -> `tests/fixtures/testFixtures`
- `@pagesetup` -> `test-setup/page-setup`
- `@playwright-config` -> `playwright.config`

### Page Setup

Always import `test` from `@fixturesetup` instead of `@playwright/test`. This ensures `setPage(page)` is called before each test (required by all `vasu-playwright-utils` functions) and provides page object class instances as fixtures.

```typescript
import { test } from '@fixturesetup';
```

The fixture setup (`tests/fixtures/testFixtures.ts`) extends `@pagesetup` which handles `setPage(page)` automatically, and registers page object classes as Playwright fixtures.

### Use vasu-playwright-utils Functions

Always prefer `vasu-playwright-utils` utility functions over raw Playwright API calls:

```typescript
// DO: Use utility functions
import { click, fill, clickAndNavigate, expectElementToBeVisible, gotoURL } from 'vasu-playwright-utils';
import { getLocatorByRole, getLocatorByText, getLocatorByTestId } from 'vasu-playwright-utils';

await gotoURL('https://example.com');
await fill('#username', 'user');
await clickAndNavigate(getLocatorByRole('button', { name: 'Login' }));
await expectElementToBeVisible('.dashboard');

// DON'T: Use raw Playwright API
await page.goto('https://example.com');
await page.locator('#username').fill('user');
await page.getByRole('button', { name: 'Login' }).click();
```

### Page Object Model (Class-based)

All page objects use class-based POM in `tests/pages/`. Classes use `vasu-playwright-utils` functions internally and are registered as Playwright fixtures in `tests/fixtures/testFixtures.ts`.

**Locator definitions:**

- **Static selectors**: `private readonly userName = '#user-name';`
- **Dynamic locators** (functions): `private readonly password = () => getLocator('#password').or(getLocatorByPlaceholder('Password'));`

**Test usage with fixtures:**

```typescript
import { test } from '@fixturesetup';

test('example', async ({ loginPage, productsPage }) => {
  await loginPage.navigateToSauceDemoLoginPage();
  await loginPage.loginWithValidCredentials();
  await productsPage.verifyProductsPageIsDisplayed();
});
```

When creating new page objects, add them as fixtures in `tests/fixtures/testFixtures.ts`.

### Locator Strategy

Follow the priority order in `.claude/skills/vasu-playwright-utils/references/locators.md`:

1. `data-testid` attributes (best) -> `getLocatorByTestId()`
2. Other `data-*` / `id` / `name` attributes -> CSS selectors
3. Playwright built-in locators -> `getLocatorByRole()`, `getLocatorByLabel()`, `getLocatorByPlaceholder()`, `getLocatorByText()`
4. XPath/CSS with unique attributes (last resort)

### Action and Assertion Reference

- **Actions**: `.claude/skills/vasu-playwright-utils/references/actions.md` - click, fill, select, check, hover, drag, upload, alerts
- **Assertions**: `.claude/skills/vasu-playwright-utils/references/assertions.md` - visibility, text, value, attribute, page URL/title, soft assertions
- **Full API**: `.claude/skills/vasu-playwright-utils/SKILL.md` - complete function signatures and CLI-to-library mapping

### Test Patterns

- Use `test.describe.configure({ mode: 'parallel' });` for parallel execution within a spec
- Use `test.beforeEach` for navigation setup
- Use tags like `@smoke`, `@reg` in describe/test names for filtering
- Use `clickAndNavigate()` when a click triggers page navigation; `click()` for AJAX/same-page actions

## Common Commands

```bash
# Run all tests
npm run test

# Run in chromium headless
npm run test:chromium -- <spec-file>

# Run in chromium headed (visible browser)
npm run test:chromium-headed -- <spec-file>

# Run specific test by name
npm run test:chromium-headed -- -g 'test name'

# Run smoke tests
npm run test:smoke

# Run with retries and workers
npm run test:chromium -- <spec-file> -j 3 --retries 2

# View HTML report
npm run report

# Lint
npm run lint
npm run lint:fix

# Format
npm run format

# UI mode
npm run ui

# Record tests with codegen
npm run record
```

## Configuration

- **Playwright config**: `playwright.config.ts` - projects: `setup`, `chromium` (headed), `chromiumheadless`
- **TypeScript**: `tsconfig.json` - strict mode, ES6 target, CommonJS modules
- **ESLint**: `eslint.config.js` - extends `vasu-playwright-utils/eslint` shared config (flat config format)
- **Husky**: Pre-commit hooks for lint-staged (ESLint + Prettier)
- **Timeouts**: Imported from `vasu-playwright-utils` (`TEST_TIMEOUT`, `EXPECT_TIMEOUT`, `ACTION_TIMEOUT`, `NAVIGATION_TIMEOUT`)

## AI Skills and Agents

This project includes AI skills and agent workflows in `.claude/` for automated test development. Cursor rules in `.cursor/rules/` reference the same skills and agents via `@file` directives, so both Claude Code and Cursor share the same knowledge base.

**Install/update skills and agents**: `npx vasu-pw-setup` (or `--skills` / `--agents` individually, `--force` to update)

### Skills (`.claude/skills/`)

- **vasu-playwright-utils**: Complete API reference for all utility functions. Use this skill when writing or modifying test code.
  - `references/locators.md` - Locator strategy priority and examples
  - `references/actions.md` - Action functions (click, fill, select, drag, upload, alerts)
  - `references/assertions.md` - Assertion functions (visibility, text, value, attribute, page)
  - `references/browser-strategy.md` - When to use WebFetch vs playwright-cli for optimal token usage (3 tiers: Lite, Snapshot, Full Browser)
- **playwright-cli**: Browser automation CLI for interactive page exploration, snapshots, form filling, screenshots, and debugging. Use `playwright-cli` commands to explore a page before writing tests.

### Agents (`.claude/agents/`)

All agents follow the browser strategy in `.claude/skills/vasu-playwright-utils/references/browser-strategy.md` and use `vasu-playwright-utils` functions when writing test code.

- **playwright-test-planner**: Explores a web application (WebFetch first, then playwright-cli for interactive discovery) and creates comprehensive test plans in `specs/` directory with steps mapped to vasu-playwright-utils functions.
- **playwright-test-generator**: Generates Playwright test code from test plans or from a prompt/URL. Uses playwright-cli to capture real selectors, translates to vasu-playwright-utils functions. Generated tests should follow this project's class-based POM and fixture conventions.
- **playwright-test-healer**: Debugs and fixes failing Playwright tests. Runs tests, analyzes errors, uses playwright-cli for live debugging, and applies fixes using vasu-playwright-utils patterns.

### Workflow

1. **Plan**: Use the test planner agent to explore a URL and create a test plan
2. **Generate**: Use the test generator agent to create test code from the plan or from a URL
3. **Heal**: Use the test healer agent to fix any failing tests
