import { test, expect } from "@playwright/test";
import { RegistrationPage } from "../pages/clientSite/RegistrationPage";
import { User } from "../utils/userUtils";

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
    const reg = new RegistrationPage(page);
    let user: User;

    await test.step("Registration", async () => {
      const user = await reg.registerRandom();
      await expect(
        page.getByRole("link", { name: user.username })
      ).toBeVisible();
    });
    await test.step("Log out", async () => {
      await reg.logOut();
    });
  });
});
