import { test, expect } from "@playwright/test";
import { RegistrationPage } from "../pages/clientSite/RegistrationPage";
import { User } from "../utils/userUtils";
import { LoginPage } from "../pages/clientSite/LoginPage";
import { generateUserRegistrationData } from "../utils/userUtils";
import { ArticlePage } from "../pages/clientSite/ArticlePage";
import invalidCredentials from "../testData/invalidCredentials.json";
import { BasePage } from "../pages/clientSite/common/BasePage";
import { env } from "process";

test.describe("Registration Tests", () => {
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await page.goto("/register");
  });

  test("Sign Up button is disabled when fields are empty", async ({ page }) => {
    await expect(registrationPage.signUpButton).toBeDisabled();
  });
  test("Register of new user", async ({ page }) => {
    let user: User;

    await test.step("Registration", async () => {
      const user = generateUserRegistrationData();
      await registrationPage.registerUser(
        user.username,
        user.email,
        user.password
      );

      await test.step("Verify the user is logged successfully", async () => {
        await expect(
          page.getByRole("link", { name: user.username })
        ).toBeVisible();
      });
    });
    await test.step("Log out", async () => {
      await registrationPage.logOut();
    });
  });

  test("Register of new user with invalid Email", async ({ page }) => {
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

  test("Register of new user with invalid Password", async ({ page }) => {
    //await reg.registerWithInvalidPassword();
    registrationPage.registerWithInvalidPassword();
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
        .locator(".errpr-messages li")
        .allTextContents();

      for (const msg of errorMessages) {
        expect(possibleErrorMessages).toContain(msg);
      }
    }
  });
});
test.describe("Login Tests", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto("/login");
  });
  test("Login with correct data", { tag: "@smoke" }, async ({ page }) => {
    const email = process.env.EMAIL!;
    const password = process.env.PASSWORD!;
    const username = process.env.USER_NAME!;

    await test.step("Log in", async () => {
      await loginPage.login(email, password);
      await expect(page.getByRole("link", { name: username })).toBeVisible();
    });

    await test.step("Log Out", async () => {
      await loginPage.logOut();
    });
  });
  test(
    "Try to login with ivalid data",
    { tag: "@sanity" },
    async ({ page }) => {
      const invalidEmail = process.env.INVALID_EMAIL!;
      const invalidPassword = process.env.INVALID_PASSWORD!;

      await test.step("Log in with invalid email and password", async () => {
        await loginPage.login(invalidEmail, invalidPassword);
      });
      await test.step("Catch the error message", async () => {
        await expect(
          page.getByText("email or password is invalid")
        ).toBeVisible();
      });
    }
  );
  test("Verify the password is hidden with dots", async ({ page }) => {
    const email = process.env.EMAIL!;
    const password = process.env.PASSWORD!;

    await loginPage.verifyThePassIsHidden(email, password);
  });
});
test.describe("Tests for Article Page", () => {
  let articlePage: ArticlePage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    articlePage = new ArticlePage(page);
    loginPage = new LoginPage(page);

    await page.goto("/login");

    const email = process.env.EMAIL!;
    const password = process.env.PASSWORD!;
    await loginPage.login(email, password);
  });
  test("Create Article", async ({}) => {
    await articlePage.createAndDeleteArticle();
  });
});
