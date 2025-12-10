import { test, expect } from "../fixtures/pom/test-options";
import { generateUserRegistrationData } from "../utils/userUtils";
import invalidCredentials from "../testData/invalidCredentials.json";

test.describe("Registration Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/register");
  });

  test("Sign Up button is disabled when fields are empty", async ({
    registrationPage,
  }) => {
    await expect(registrationPage.signUpButton).toBeDisabled();
  });

  test("Register of new user", async ({ registrationPage, page }) => {
    const user = generateUserRegistrationData();

    await registrationPage.registerUser(
      user.username,
      user.email,
      user.password
    );

    await expect(page.getByRole("link", { name: user.username })).toBeVisible();
  });

  test("Register of new user with invalid Email", async ({
    registrationPage,
    page,
  }) => {
    const possibleErrorMessages = [
      "email is invalid",
      "email can't be blank",
      "password is too short (minimum is 8 characters)",
      "username has already been taken",
    ];

    for (const email of invalidCredentials.invalidEmailsAsString) {
      await registrationPage.registerUser("petko", email, "55889966");

      const errorMessages = await page
        .locator(".error-messages li")
        .allTextContents();

      for (const msg of errorMessages) {
        expect(possibleErrorMessages).toContain(msg);
      }
    }
  });

  test("Register of new user with invalid Password", async ({
    registrationPage,
    page,
  }) => {
    await registrationPage.registerWithInvalidPassword();

    const possibleErrorMessages = [
      "password is too short (minimum is 8 characters)",
      "password can't be blank",
    ];

    for (const password of invalidCredentials.invalidPassword) {
      await registrationPage.registerUser(
        "petko",
        "mynewemail@abv.bg",
        password
      );

      const errorMessages = await page
        .locator(".error-messages li")
        .allTextContents();

      for (const msg of errorMessages) {
        expect(possibleErrorMessages).toContain(msg);
      }
    }
  });
});
