import { Page, Locator, expect } from "@playwright/test";
import { generateRandomUser, User } from "../../utils/userUtils";
import { BasePage } from "./common/BasePage";
/**
 * This is the page object for the Registration Page.
 * @export
 * @class LoginPage
 * @typedef {RegistrationPage}
 */

export class RegistrationPage extends BasePage {
  constructor(page: Page) {
    super(page);
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

  async registerRandom(): Promise<User> {
    const user = generateRandomUser();
    await this.page.getByPlaceholder("Username").fill(user.username);
    await this.page.getByPlaceholder("Email").fill(user.email);
    await this.page.getByPlaceholder("Password").fill(user.password);
    await this.page.getByRole("button", { name: "Sign up" }).click();
    return user;
  }
}
