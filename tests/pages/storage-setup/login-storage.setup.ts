// Add the tests to store the login storage states
/* import { test as setup } from '../../../test-setup/page-setup';
import { saveStorageState, waitForPageLoadState } from 'vasu-playwright-utils';
import * as fs from 'fs';
import { STORAGE_STATE_LOGIN } from '../../../playwright.config';

console.log('test setup file for storage state');
setup('Save Addin Storage', async () => {
  console.log('Starting checks for Excel Add-in Storage');
  setup.skip(fs.existsSync(STORAGE_STATE_LOGIN), 'Skipping saving storage state for Add-in');
  console.log('Saving Excel Add-in Storage');
  // Add the login code here that will save the login storage state
  await waitForPageLoadState();
  await saveStorageState(STORAGE_STATE_LOGIN);
});
 */
