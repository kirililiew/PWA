import { Page, Locator, expect } from "@playwright/test";
/**
 * This is the page object for the Home Page.
 * @export
 * @class BasePage
 * @typedef {BasePage}
 */
export class BasePage {
  constructor(protected page: Page) {}

  get signInButton(): Locator {
    return this.page.getByRole("link", { name: "Sign in" });
  }
  get signInButtonLogin(): Locator {
    return this.page.getByRole("button", { name: "Sign in" });
  }
  get username(): Locator {
    return this.page.getByPlaceholder("Username");
  }
  get email(): Locator {
    return this.page.getByPlaceholder("Email");
  }
  get password(): Locator {
    return this.page.getByPlaceholder("Password");
  }
  get settingsButton(): Locator {
    return this.page.getByRole("link", { name: "Settings" });
  }
  get logOutButton(): Locator {
    return this.page.getByRole("button", { name: "Or click here to logout." });
  }
  get signUpButton(): Locator {
    return this.page.getByRole("button", { name: "Sign up" });
  }
  async logOut() {
    await this.settingsButton.click();
    await this.logOutButton.click();

    await expect(
      this.page.getByRole("link", { name: "Sign in" })
    ).toBeVisible();
  }
}
