import { Page, expect } from "@playwright/test";
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

  private async fillLoginForm(email: string, password: string) {
    await this.signInButton.click();
    await this.email.fill(email);
    await this.password.fill(password);
  }
  async login(email: string, password: string) {
    await this.fillLoginForm(email, password);
    await this.signInButtonLogin.click();
  }
  async navigateToHomePageGuest() {
    await this.page.goto("https://conduit.bondaracademy.com/");
  }
  async verifyThePassIsHidden(email: string, password: string) {
    await this.fillLoginForm(email, password);
    await expect(this.password).toHaveAttribute("type", "password");
  }
}
