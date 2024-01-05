## Executing Tests

### Run tests using the Playwright Test for VSCode extension

To run tests using the Playwright extension in Visual Studio Code, please read through the test configuration and execution details as below:

#### Test Configuration

Playwright offers various configuration options for customizing test execution. Configuration settings can be specified in the `playwright.config.ts` file.

1. **`testDir: './tests'`**: Specifies the directory where tests are located. Tests within this directory will be executed.

2. **`retries: process.env.CI ? 2 : 0`**: Determines the number of times to retry failed tests. In this example, the retries value is set to 2 in a continuous integration (CI) environment and 0 during local test execution.

3. **`workers: process.env.CI ? 3 : 1`**: Sets the number of worker threads for running tests. In this example, the workers value is set to 3 in a CI environment and 1 during local test execution.

4. **`reporter: [['./tests/setup/custom-logger.ts'], ['html', { open: 'never' }], ['dot']]`**: Configures a custom HTML reporter with a logger. We can define multiple reporters.

5. **`headless`**: Determines whether tests should run in headless or headed browsers. The default value is headless.

6. **`testIdAttribute`**: Specifies the QAID attribute added to HTML elements for locating them during test execution.

7. **`baseURL`**: Defines a base URL used in actions like `await page.goto('/')` for navigation.

8. **`trace: 'retain-on-failure'`**: Provides a trace when test fails.

9. **`screenshot: 'only-on-failure'`**: Captures a screenshot only when test fails.

10. **`projects`**: Configures projects for different browsers (Chromium, Firefox, WebKit) and viewport settings for web and mobile.

For more in-depth configuration details, consult the official [Playwright Test Configuration Documentation](https://playwright.dev/docs/test-configuration).

#### Running Tests with the extension:

1. Once the extension is installed, you will see a small green `Play` button next to each test in your spec files.

2. Clicking on the `Play` button will execute the test as per the configurations set in playwright.config file. You can either execute individual tests or all tests together within the spec file.

![Running Tests](https://blog.jetbrains.com/wp-content/uploads/2023/06/OpenProject.png)

The Playwright plugin for Visual Studio Code provides a convenient way to run your tests directly from your code editor, without having to switch to the terminal.

[![Playwright Plugin](http://img.youtube.com/vi/5INgwvImzy0/0.jpg)](http://www.youtube.com/watch?v=5INgwvImzy0 'Running Tests with Playwright Plugin')
