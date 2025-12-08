import { Page, Locator, expect } from "@playwright/test";
/**
 * This is the page object for the Registration Page.
 * @export
 * @class LoginPage
 * @typedef {RegistrationPage}
 */
export class RegistrationPage {
  constructor(private page: Page) {}

  get username(): Locator {
    return this.page.getByPlaceholder("Username");
  }

  get email(): Locator {
    return this.page.getByPlaceholder("Email");
  }

  get password(): Locator {
    return this.page.getByPlaceholder("Password");
  }

  get signUpButton(): Locator {
    return this.page.getByRole("button", { name: "Sign up" });
  }

  async register(username: string, email: string, password: string) {
    await this.username.fill(username);
    await this.email.fill(email);
    await this.password.fill(password);
    await this.signUpButton.click();
  }

  async isSigniUpButtonEnabled(): Promise<boolean> {
    return await this.signUpButton.isEnabled();
  }
}
