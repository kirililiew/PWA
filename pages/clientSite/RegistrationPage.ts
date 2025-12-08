import { Page, Locator, expect } from "@playwright/test";
import { generateRandomUser, User } from "../../utils/userUtils";
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
  get settingsButton(): Locator {
    return this.page.getByRole("link", { name: "Settings" });
  }
  get logOutButton(): Locator {
    return this.page.getByRole("button", { name: "Or click here to logout." });
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
  async logOut() {
    await this.settingsButton.click();
    await this.logOutButton.click();

    await expect(
      this.page.getByRole("link", { name: "Sign in" })
    ).toBeVisible();
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
