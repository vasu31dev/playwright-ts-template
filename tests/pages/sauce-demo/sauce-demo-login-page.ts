import { click, clickAndNavigate, fill, gotoURL } from 'vasu-playwright-utils';
import { failureLoginCredentials, sauceDemoCredentials } from '../../testdata/sauce-demo-test-data';
import { expectElementToBeVisible } from 'vasu-playwright-utils';
import { getLocator, getLocatorByPlaceholder, getLocatorByRole } from 'vasu-playwright-utils';

const userName = `#user-name`;
const password = () => getLocator(`#password`).or(getLocatorByPlaceholder('Password', { exact: true }));
const login = () => getLocatorByRole('button', { name: 'Login' });
const errorMessage = `//*[contains(@class,'error-message')]`;

export async function navigateToSauceDemoLoginPage() {
  await gotoURL('https://www.saucedemo.com/');
}

export async function fillUserName(username: string) {
  await fill(userName, username);
}

export async function fillPassword(pword: string) {
  await fill(password(), pword);
}

export async function clickLogin() {
  await click(login());
}

export async function logInSuccessfully() {
  await fillUserName(sauceDemoCredentials.username);
  await fillPassword(sauceDemoCredentials.password);
  await clickAndNavigate(login());
}

export async function failureLogin() {
  await fillUserName(failureLoginCredentials.username);
  await fillPassword(failureLoginCredentials.password);
  await clickLogin();
}

export async function verifyErrorMessageForFailureLogin() {
  await expectElementToBeVisible(errorMessage);
}

export async function verifyLoginPageisDisplayed() {
  await expectElementToBeVisible(userName);
}
