import { test } from 'tests/sauce-demo-project-with-classes/fixtures/testFixtures';

const InvalidCredentialsData: { username: string; password: string }[] = [
  {
    username: 'abc',
    password: 'abc',
  },
  {
    username: '1234',
    password: '1234',
  },
];

test.describe.configure({ mode: 'parallel' });

test.describe('Parameterising tests', () => {
  InvalidCredentialsData.forEach(data => {
    test(`Invalid Login - Running same test with different invalid data ${data.username}`, async ({ loginPage }) => {
      await loginPage.navigateToSauceDemoLoginPage();
      await loginPage.loginWithInvalidCredentials(data);
    });
  });
});
