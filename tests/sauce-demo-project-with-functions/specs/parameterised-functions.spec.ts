import { test } from '@pagesetup';
import * as LoginPage from '@pages/login-page-functions';

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
    test(`Invalid Login - Running same test with different invalid data ${data.username}`, async () => {
      await LoginPage.navigateToSauceDemoLoginPage();
      await LoginPage.loginWithInvalidCredentials(data);
    });
  });
});
