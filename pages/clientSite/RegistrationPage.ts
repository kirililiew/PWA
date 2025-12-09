import { Page, expect } from "@playwright/test";
import { BasePage } from "./common/BasePage";
import invalidCredentials from "../../testData/invalidCredentials.json";

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

  async registerUser(username: string, email: string, password: string) {
    await this.username.fill(username);
    await this.email.fill(email);
    await this.password.fill(password);
    await this.signUpButton.click();
  }

  async registerWithInvalidEmails() {
    const possibleErrorMessages = [
      "email is invalid",
      "email can't be blank",
      "password is too short (minimum is 8 characters)",
      "username has already been taken",
    ];
    for (const email of invalidCredentials.invalidEmailsAsString) {
      await this.registerUser("petko", email, "55889966");

      const errorMessages = await this.page
        .locator(".error-messages li")
        .allTextContents();
      for (const msg of errorMessages) {
        expect(possibleErrorMessages).toContain(msg);
      }
    }
  }
  async registerWithInvalidPassword() {
    const possibleErrorMessages = [
      "password is too short (minimum is 8 characters)",
      "password can't be blank",
    ];
    for (const password of invalidCredentials.invalidPassword) {
      await this.registerUser("petko", "mynewemail@abv.bg", password);

      const errorMessages = await this.page
        .locator(".errpr-messages li")
        .allTextContents();

      for (const msg of errorMessages) {
        expect(possibleErrorMessages).toContain(msg);
      }
    }
  }
}
