import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./common/BasePage";
/**
 * This is the page object for the Page Page.
 * @export
 * @class Login Page
 * @typedef {Login Page}
 */
export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  async login(email: string, password: string) {
    await this.signInButton.click();
    await this.email.fill(email);
    await this.password.fill(password);
    await this.signInButtonLogin.click();
  }
}
