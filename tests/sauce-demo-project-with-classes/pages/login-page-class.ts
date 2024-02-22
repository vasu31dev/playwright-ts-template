import { click, clickAndNavigate, expectElementToBeAttached, fill, gotoURL } from 'vasu-playwright-utils';
import { failureLoginCredentials, sauceDemoCredentials } from '@testdata/sauce-demo-test-data';
import { expectElementToBeVisible } from 'vasu-playwright-utils';
import { getLocator, getLocatorByPlaceholder, getLocatorByRole } from 'vasu-playwright-utils';

export class LoginPage {
  private readonly userName = `#user-name`;
  private readonly password = () => getLocator(`#password`).or(getLocatorByPlaceholder('Password', { exact: true }));
  private readonly loginButton = () => getLocatorByRole('button', { name: 'Login' });
  private readonly logoutLink = `#logout_sidebar_link`;
  private readonly errorMessage = `//*[contains(@class,'error-message')]`;

  public async navigateToSauceDemoLoginPage(): Promise<void> {
    await gotoURL('https://www.saucedemo.com/');
  }

  public async loginWithValidCredentials(validCredentials = sauceDemoCredentials): Promise<void> {
    await fill(this.userName, validCredentials.username);
    await fill(this.password(), validCredentials.password);
    await clickAndNavigate(this.loginButton());
    await expectElementToBeAttached(this.logoutLink, 'User should be Logged in successfully');
  }

  public async loginWithInvalidCredentials(invalidCredentials = failureLoginCredentials): Promise<void> {
    await fill(this.userName, invalidCredentials.username);
    await fill(this.password(), invalidCredentials.password);
    await click(this.loginButton());
    await expectElementToBeVisible(this.errorMessage, 'Error message should be displayed as credentials are invalid');
  }

  public async verifyLoginPageIsDisplayed(): Promise<void> {
    await expectElementToBeVisible(this.userName, 'Login page should be displayed');
  }
}
