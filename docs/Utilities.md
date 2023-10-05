## Utilities

The framework offers a collection of utility functions that streamline the identification of elements, common actions, and assertions in Playwright. These functions are located in the `node_modules/vasu-playwright-utils/src/vasu-playwright-lib/utils` directory and include:

- [page-utils.ts](#page-utilities): This file contains functions for getting pages, switching between the pages, and closing a page.

- [locator-utils.ts](#locator-utilities): This file has functions that help find web elements on pages and frames in different ways, such as by test ID, label, text, CSS, or XPath.

- [action-utils.ts](#action-utilities): This file contains functions for performing actions such as clicking, filling input fields, selecting options from dropdowns, drag and drop, handling alerts, scroll, uploading and downloading files, navigating and reloading pages.

- [element-utils.ts](#element-utilities): This file contains functions for handling conditional statements with web elements, such as checking if an element is visible, hidden, or contains certain text or input values.

- [assert-utils.ts](#assert-utilities): This file contains functions for adding both soft and hard assertions in your tests. Soft assertions do not stop the test when they fail, while hard assertions do.

These utilities are designed to make your tests more readable and maintainable and to reduce the amount of boilerplate code you need to write.

Here are a few examples of how to use the utility functions:

### Page Utilities

The `page-utils` module contains the functions of the Page. These functions are used for managing Page objects, including getting Page objects, switching between the pages, and closing a page. This centralizes the management of Page objects, making it easier to control the state of your tests.

```typescript
import { switchPage, switchToDefaultPage, closePage } from 'vasu-playwright-utils';

// Switch to the second tab/window. Useful when a test involves interacting with multiple pages.
await switchPage(2);

// Switch to the initial page that was launched or the first tab/window. Useful when you want to return to the starting context after interacting with other pages.
switchToDefaultPage();

// Close the current page and then switch to the default page if it exists. Useful for cleaning up after a test that opens additional pages.
await closePage();
```

### Locator Utilities

The `locator-utils` module provides a set of utility functions that identify locators in different ways in Playwright. Locators are used to identify elements on a webpage and are crucial for interacting with web elements, enabling actions such as clicking a button or inputting text into a form field.

```typescript
import {
  getLocator,
  getLocatorByTestId,
  getLocatorByText,
  getLocatorByRole,
  getLocatorByLabel,
} from 'vasu-playwright-utils';

//Locator with CSS
const locator = () => getLocator(`button#submit`);

//Locator with testIdAttribute
const testIdLocator = () => getLocatorByTestId('submit-button');

//Locator by text
const textLocator = () => getLocatorByText('Submit');

//Locator by role
const roleLocator = () => getLocatorByRole('button');

//Locator by label
const labelLocator = () => getLocatorByLabel('Submit Button');

//Locator with 'and' operator
const locatorWithAnd = () => getLocator(`button#submit`).and.(getLocator(`button#Enabled`));

//Locator with 'or' operator
const locatorWithOr = () => getLocator(`button#gridview`).or.(getLocator(`button#listview`));

//Locator with filter
const locatorWithFilter = () => getLocatorByRole('button').filter({hasText: 'submit'});
```

In this example, we're using various functions from `locator-utils`:

1.  `getLocator(selector: string)`: This function returns a Locator object for the given Xpath or CSS selector. The selector parameter is a string representing the Xpath or CSS selector of the element you want to locate.

2.  `getLocatorByTestId(testId: string)`: This function returns a Locator object for the element with the given test ID. The `testId` parameter is a string representing the `testIdAttribute` of the element you want to locate. The default TestID is a `data-testid` attribute that can be added to any web element on the HTML page. The `testIdAttribute` attribute can be configured in the `playwright.config.ts` file.

    For example, if you have the following configuration in your `playwright.config.ts` file:

    ```typescript
    testIdAttribute: 'qa-target';
    ```

    With this configuration, you can directly pass the `qa-target` value to the `getLocatorByTestId` function without the need for any CSS or XPath. This simplifies the process of locating elements on the page, especially when dealing with complex or dynamic content. For more information please refer to [Playwright test id documentation](https://playwright.dev/docs/locators#locate-by-test-id)

3.  `getLocatorByText(text: string)`: This function returns a Locator object for the element with the given text. The text parameter is a string representing the text of the element you want to locate.

4.  `getLocatorByRole(role: string)`: This function returns a Locator object for the element with the given ARIA role. The role parameter is a string representing the ARIA role of the element you want to locate.

5.  `getLocatorByLabel(label: string)`: This function returns a Locator object for the element with the given label. The label parameter is a string representing the label of the element you want to locate.

6.  These locator functions can also be easily used with Locator operators( `and`, `or`) and filters(`filter`). For more information on Locator operators and filters, please refer to [Playwright Locator documentation](https://playwright.dev/docs/locators#filtering-locators)

Here is some more information about `locator-utils` usage as this is a unique POM design pattern

- We use a closure to declare the Locator because the page object is initialized during runtime. If we call the function directly, it may return null due to the page object not being initialized yet. By using a closure, we ensure that we're accessing the page object only after it has been properly initialized.

- For XPath or CSS selectors, we can directly use a string instead of a closure, as these selectors do not involve the page object. This approach allows us to define selectors in a straightforward manner without worrying about the page object's initialization state.

- We are calling the locator function instead of using a constant locator as the page object is initialized during runtime only.

Refer to the [Optional Parameter Objects](#optional-parameter-objects) section for more information.

#### Handling Frames

The `locator-utils` module provides utility functions to handle frames in Playwright. Frames are used in web development to divide the content of a page into multiple, scrollable regions. With Playwright, you can interact with frames in a similar way as you do with separate pages.

Here's how you can use the `locator-utils` functions to handle frames easily:

```typescript
import { getFrameLocator, getLocatorInFrame } from 'vasu-playwright-utils';

// Get a Frame
const frame = `[name='test-frame']`;

// Get a FrameLocator
const frameLocator = () => await getFrameLocator(frame);

// Get a Locator on Page
const locator = () => getLocatorByTestId('continue-button');

// Get a locator inside a frame
const locatorInFrame = () => await getLocatorInFrame(frame, locator());
const locatorInFrame = () => await getLocatorInFrame(frameLocator(), locator());
```

In this example, we're using various functions from `locator-utils` to handle frames:

1. `getFrameLocator(frameInput: string | FrameLocator):`: This function returns a FrameLocator object for the given Xpath or CSS selector. The selector parameter is a string representing the Xpath or CSS selector of the frame you want to locate.

2. `getLocatorInFrame(frameInput: string | FrameLocator, input: string | Locator):`: This function returns a Locator object inside the frame. The frameInput parameter is a string or Locator representing the frame that you want to locate the element with and the input parameter is a string or Locator of the element you want to locate inside the frame.

These Locator functions make it easier to locate elements on the page, and they provide a more readable and maintainable way to define locators in your tests.

For more information, please refer to [Playwright FrameLocator documentation](https://playwright.dev/docs/api/class-framelocator)

### Action Utilities

The `action-utils` module provides a set of utility functions that simplify common actions in Playwright. These functions are designed to make your tests more readable and maintainable and to reduce the amount of boilerplate code you need to write.

Here's an example of how to use the `action-utils` functions:

```typescript
import { gotoURL, click, fill, type, check, uploadFiles, selectByValue } from 'vasu-playwright-utils';
import { MAX_TIMEOUT } from 'vasu-playwright-utils';

// Navigate to a URL
await gotoURL('https://www.example.com', { timeout: MAX_TIMEOUT });

// Click an element
await click(`text='Log in'`);

// Fill a form field
await fill(`input#username`, 'myusername');

// Press sequentially into a form field
await pressSequentially(`input#search`, 'searchText');

// Check a checkbox or radio button
await check(`input#agree`);

// Upload files
await uploadFiles(`input#file`, '/path/to/myfile.jpg');

// Select a value from a dropdown
await selectByValue(`#dropdown`, 'selectValue');
```

In this example, we're using various functions from `action-utils`:

1. `gotoURL(path: string, options: GotoOptions)`: This function navigates to a specific URL. The path parameter is the URL you want to navigate to, and the options parameter is an optional parameter that specifies additional navigation options. Here we have overridden the default navigation timeout with MAX_TIMEOUT optional parameter.

2. `click(input: string | Locator, options?: ClickOptions)`: This function clicks an element on the page. The input parameter is a string or Locator representing the element you want to click, and the options parameter is an optional parameter that specifies additional click options.

3. `fill(input: string | Locator, value: string, options?: FillOptions)`: This function fills a form field with a specific value. The input parameter is a string or Locator representing the form field you want to fill, the value parameter is the value you want to fill the form field with, and the options parameter is an optional parameter that specifies additional fill options.

4. `pressSequentially(input: string | Locator, value: string, options?: PressSequentiallyOptions)`: This function enters text into a field character by character, as if it was a user with a real keyboard. The input parameter is a string or Locator representing the form field you want to enter the text, the value parameter is the value you want to enter the form field with, and the options parameter is an optional parameter that specifies additional PressSequentially options.

Typically, `fill` is a more versatile and efficient choice that works effectively in most scenarios. It not only clears the input field but also simulates a single input event, similar to paste.

Unlike `fill` action, `pressSequentially` does not clear the input field's content; instead, it appends the specified text to the existing content. This method simulates keyboard key presses like keydown, keypress/input, and keyup, for each character in the provided text.

To find more info on `fill` vs `pressSequentially`, please refer to [Playwright type documentation](https://playwright.dev/docs/input#type-characters).

5. `check(input: string | Locator, options?: CheckOptions)`: This function checks a checkbox or radio button. The input parameter is a string or Locator representing the checkbox or radio button you want to check, and the options parameter is an optional parameter that specifies additional check options.

6. `uploadFiles(input: string | Locator, path: UploadValues, options?: UploadOptions)`: This function is used to upload files. The input parameter is a string or Locator representing the file input you want to upload files to, the path parameter is the path of the files you want to upload, and the options parameter is an optional parameter that specifies additional upload options.

7. `selectByValue(input: string | Locator, value: string, options?: SelectOptions)`: This function selects a value from a dropdown. The `input` parameter is a string or Locator representing the select element, the value parameter is the `value` to select for the dropdown option, and the `options` parameter specifies additional select options.

8. Similarly, we have `selectByText()` and `selectByIndex()` functions for selecting options by text or index, and `selectByValues()` for multi-select dropdowns.

For more information on actions refer to the [Playwright Actions documentation](https://playwright.dev/docs/input) and regarding auto waits refer to [Playwright Auto waiting documentation](https://playwright.dev/docs/actionability)

For more information on the optional parameters refer to the [Optional Parameter Objects](#optional-parameter-objects) section below.

### Managing Alerts

The `action-utils` module provides utility functions to handle alerts in Playwright.

Here's an example of how to use the `action-utils` functions to handle alerts:

```typescript
import { acceptAlert, dismissAlert, getAlertText } from 'vasu-playwright-utils';

// Click on an element that opens an alert and then accept the alert
await acceptAlert(outOfStockButton());

// Click on an element that opens an alert and then dismiss the alert
await dismissAlert(outOfStockButton());

// Click on an element that opens an alert and then get the text from the alert
const text = await getAlertText(outOfStockButton());
```

In this example, we're using various functions from `action-utils` to handle alerts:

1. `acceptAlert(input: string | Locator, promptText?: string)`: This function is used to accept an alert dialog. The `input` parameter is a string or Locator representing the element that triggers the alert, and the `promptText` parameter is an optional parameter that specifies the text to enter into a prompt dialog.

2. `dismissAlert(input: string | Locator)`: This function is used to dismiss an alert dialog. The `input` parameter is a string or Locator representing the element that triggers the alert.

3. `getAlertText(input: string | Locator)`: This function is used to get the text from an alert dialog. The `input` parameter is a string or Locator representing the element that triggers the alert.

These functions make it easier to handle alerts in your tests, and they provide a more readable and maintainable way to define alert handling in your tests.
For more information, please refer to [Playwright Alerts documentation](https://playwright.dev/docs/dialogs#alert-confirm-prompt-dialogs)

### Element Utilities

The `element-utils` module provides utility functions for extracting values from web elements and performing condition checks. These functions are designed to handle common tasks related to web elements, such as retrieving text or attribute values, checking visibility, and more.

```typescript
import { getText, getAllTexts, getInputValue, getAttribute, attribute } from 'vasu-playwright-utils';
// getting inner text
const text = await getText(textLocator());

//getting all inner texts
const allTexts = await getAllTexts(textLocator());

//getting input value
const inputValue = await getInputValue(userName());

//getting 'class' attribute value
const attribute = await getAttribute(labelLocator(), 'class');

//element visibility conditional check
if (isElementVisible(logoutButton())) {
  console.log('Login is successful');
} else {
  console.log('Login is not successful');
}
```

In this example, we're using various functions from `element-utils`:

1. `getText(input: string | Locator, options?: TimeoutOption)`: This function gets the inner text of an element. The input parameter is a string or Locator representing the element from which to get the text. TimeoutOption is an optional parameter for timeout.

2. `getAllTexts(input: string | Locator)`: This function gets all inner texts from the given locator. TimeoutOption is an optional parameter for timeout.

3. `getInputValue(input: string | Locator, options?: TimeoutOption)`: This function gets the input value from text or form fields. The input parameter is a string or Locator representing the element from which to get the text. TimeoutOption is an optional parameter for timeout.

4. `getAttribute(input: string | Locator,attributeName: string, options?: TimeoutOption)`: This function gets the attribute value from the given attributeName parameter of the Locator. TimeoutOption is an optional parameter for timeout.

5. `isElementVisible(input: string | Locator, options?: TimeoutOption)`: This function checks whether the given input parameter is visible and returns a boolean value. TimeoutOption is an optional parameter for timeout.

### Assert Utilities

The `assert-utils` module provides a set of utility functions that simplify common assertions in Playwright. These functions are designed to make your tests more readable and maintainable.

```typescript
import {
  expectElementToBeVisible,
  expectElementToBeHidden,
  expectElementToHaveText,
  expectElementNotToBeChecked,
  expectElementNotToContainText,
} from 'vasu-playwright-utils';
import { INSTANT_TIMEOUT, STANDARD_TIMEOUT } from 'vasu-playwright-utils';

//asserting element to be visible
await expectElementToBeVisible(logoutButton(), 'Login should be successful', {
  timeout: STANDARD_TIMEOUT,
});

//asserting element to be invisible
await expectElementToBeHidden(signInButton(), 'signInButton should not be displayed');

//asserting element to have the text
await expectElementToHaveText(successfulMessage(), 'Login is successful', {
  ignoreCase: false,
  message: 'Login should be Successful',
});

//asserting check box is not checked
await expectElementNotToBeChecked(agreeCheckbox(), {
  timeout: INSTANT_TIMEOUT,
});

//with 'soft' optional parameter 'true' we are making this assertion as soft assertion
await expectElementNotToContainText(successfulMessage(), '404 error', {
  soft: true,
});

// use this in the spec file to stop the test if there are failures for any soft assertions
assertAllSoftAssertions(test.info());
```

In this example, we're using various functions from `assert-utils`:

1. `expectElementToBeVisible(input: string | Locator, options?: ExpectOptions)`: This function checks if a specific element is visible on the page. The input parameter is a string or Locator representing the element you want to check. The options parameter is an optional parameter that specifies additional options like timeout and a custom message to display in the report if the assertion fails.

2. `expectElementToBeHidden(element: Locator, message?: string, options?: ExpectOptions)`: This function checks if a specific element is hidden on the page. The parameters are the same as expectElementToBeVisible.

3. `expectElementToHaveText(input: string | Locator, text: string | RegExp | Array<string | RegExp>, options?: ExpectOptions & ExpectTextOption)`: This function asserts that the text of a specific element matches the expected text. The input parameter is a string or Locator representing the element from where we assert text, the text parameter is the value you want to assert with, and the ExpectOptions and ExpectTextOption parameters are optional parameters that specify additional assert options like soft assertion, ignore case, etc.

4. `expectElementNotToContainText(element: Locator, unexpectedText: string, options?: ExpectOptions)`: This function checks if a specific element does not contain a certain text. The unexpectedText parameter is the text you expect the element not to contain. The soft assertion is an Expectoptions parameter.

5. `assertAllSoftAssertions(testInfo: TestInfo)`: This function checks if there were any failures in the soft assertions and stops the test if there were. The testInfo parameter is the test information object from Playwright.

These functions make it easier to write assertions in your tests, and they provide better error messages when the assertions fail. They also support both hard and soft assertions, allowing you to choose the appropriate level of strictness for your tests.

Refer to the [Optional Parameter Objects](#optional-parameter-objects) section for more information.

### Optional Parameter Type Objects

The `types/optional-parameter-types` module provides a set of options for utility modules.

```typescript
import { getLocator, getLocatorByTestId } from 'vasu-playwright-utils';
import { clickAndNavigate, type } from 'vasu-playwright-utils';
import { expectElementToHaveText } from 'vasu-playwright-utils';
import { STANDARD_TIMEOUT } from 'vasu-playwright-utils';

const loginpage = () => getLocator(`#loginpage`, { hasText: 'login' });
const successfulMessage = () => getLocatorByTestId(`sucess-message`);

export async function verifyLoginPageisDisplayed() {
  //ClickOptions
  await clickAndNavigate(loginpage(), { button: 'right', force: true, clickCount: 1 });

  //PressSequentially
  await PressSequentially(`#username`, 'testuser', { delay: 2, noWaitAfter: false });

  //ExpectTextOptions
  await expectElementToHaveText(successfulMessage(), 'Login is Successful', {
    useInnerText: true,
    ignoreCase: false,
    timeout: STANDARD_TIMEOUT,
  });
}
```

In this example, we're using some optional parameters with utility functions:

1. `Locator options`: `hasText` is used as an optional parameter to locate the element that has the given text.

2. `Action Options(ClickOptions)`: `button` is used for right-click, `force` is used to bypass the actionability checks and force the click, and `clickCount` is used to click the element for the given number of times.

3. `Action Options(PressSequentiallyOptions)`: `delay` is used to simulate the delay between the key presses with the given time, `noWaitAfter` is used to specify not to wait after the action `PressSequentially`.

4. `ExpectOptions(ExpectTextOptions)`: `useInnerText` is used to assert the inner text, `ignoreCase` is used to ignore the case while asserting, and `timeout` is used to wait until the specified time before failing the test.

### Test annotations

Test annotations are a powerful feature of Playwright Test that allows you to modify the behavior of individual tests. You can use them to mark a test as slow, skip it, indicate that it needs to be fixed, group tests, and much more. They provide a flexible way to manage your tests and handle different scenarios.

Here are some examples of how to use test annotations:

```typescript
import { test } from '@pagesetup';

test.fixme('This test will fail and needs to be fixed so it will be skipped', async () => {});

test.slow('Triples the default timeouts for this test', async () => {});

test.skip('Skip this test', async () => {});
```

1. `fixme`: marks the test as failing. Playwright Test will not run this test. Use `fixme` when running the test is slow, crashes, or needs any fixes. This allows you to temporarily disable a test until it can be fixed.

2. `slow`: marks the test as slow and triples the timeout. Use `slow` when a test takes longer than usual to complete. This allows Playwright Test to adjust its behavior and avoid prematurely terminating the test.

3. `skip`: marks the test as irrelevant. Playwright Test does not run such a test. Use skip when a test is not applicable in some configurations. This allows you to exclude certain tests based on specific conditions or configurations.

For more info on test annotations, please refer to [Playwright Test Annotations documentation](https://playwright.dev/docs/test-annotations)
