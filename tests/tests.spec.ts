import { test, expect } from "@playwright/test";
import { RegistrationPage } from "../pages/clientSite/RegistrationPage";
import { User } from "../utils/userUtils";
import { LoginPage } from "../pages/clientSite/LoginPage";
import { generateUserRegistrationData } from "../utils/userUtils";

test.describe("Registration Tests", () => {
  let reg: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    reg = new RegistrationPage(page);
    await page.goto("/register");
  });

  test("Sign Up button is disabled when fields are empty", async ({ page }) => {
    await expect(reg.signUpButton).toBeDisabled();
  });
  test("Register of new user", async ({ page }) => {
    let user: User;

    await test.step("Registration", async () => {
      const user = generateUserRegistrationData();
      await reg.registerUser(user.username, user.email, user.password);

      await test.step("Verify the user is logged successfully", async () => {
        await expect(
          page.getByRole("link", { name: user.username })
        ).toBeVisible();
      });
    });
    await test.step("Log out", async () => {
      await reg.logOut();
    });
  });

  test("Register of new user with invalid Email", async ({ page }) => {
    await reg.registerWithInvalidEmails();
  });
  test("Register of new user with invalid Password", async ({ page }) => {
    await reg.registerWithInvalidPassword();
  });
});
test.describe("Login Tests", () => {
  let log: LoginPage;

  test.beforeEach(async ({ page }) => {
    log = new LoginPage(page);
    await page.goto("/login");
  });
  test("Login with correct data", { tag: "@smoke" }, async ({ page }) => {
    const email = process.env.EMAIL!;
    const password = process.env.PASSWORD!;
    const username = process.env.USER_NAME!;

    await test.step("Log in", async () => {
      await log.login(email, password);
      await expect(page.getByRole("link", { name: username })).toBeVisible();
    });

    await test.step("Log Out", async () => {
      await log.logOut();
    });
  });
  test(
    "Try to login with ivalid data",
    { tag: "@sanity" },
    async ({ page }) => {
      const invalidEmail = process.env.INVALID_EMAIL!;
      const invalidPassword = process.env.INVALID_PASSWORD!;

      await test.step("Log in with invalid email and password", async () => {
        await log.login(invalidEmail, invalidPassword);
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

    await log.verifyThePassIsHidden(email, password);
  });
});
