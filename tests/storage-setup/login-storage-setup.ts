// Add the tests to store the login storage states
import { test as setup } from 'tests/fixtures/testFixtures';
import { logger, saveStorageState } from 'vasu-playwright-utils';
// import { STORAGE_STATE_LOGIN } from '@playwright-config';
import { getUserAuthPath, isUserStorageStateValid } from './cookie-utils';
import { validUsers } from '@testdata/sauce-demo-test-data';

setup.describe.configure({ mode: 'parallel' });
// Save the storage state for each valid user
validUsers.forEach(user => {
  setup(`Save Login Storage for ${user.username}`, async ({ loginPage }) => {
    // setup.skip(fs.existsSync(STORAGE_STATE_LOGIN), 'Skipping saving storage state for Login');
    setup.skip(isUserStorageStateValid(user), 'Skipping saving storage state for Login');
    logger.info(`Saving ${user.username} Login Storage`);
    // Add the login code here that will save the login storage state
    await loginPage.navigateToSauceDemoLoginPage();
    await loginPage.loginWithValidCredentials(user);
    await saveStorageState(getUserAuthPath(user));
  });
});
