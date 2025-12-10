import { test, expect } from "../fixtures/pom/test-options";

test.describe("Login Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });
  test("Login with correct data", async ({ loginPage, page }) => {
    const email = process.env.EMAIL!;
    const password = process.env.PASSWORD!;
    const username = process.env.USER_NAME!;

    await loginPage.login(email, password);
    await expect(page.getByRole("link", { name: username })).toBeVisible();
    await loginPage.logOut();
  });
  test("Try to login with ivalid data", async ({ loginPage, page }) => {
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
  });
  test("Verify the password is hidden with dots", async ({ loginPage }) => {
    const email = process.env.EMAIL!;
    const password = process.env.PASSWORD!;

    await loginPage.verifyThePassIsHidden(email, password);
  });
});
