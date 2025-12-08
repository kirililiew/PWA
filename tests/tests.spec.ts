import { test, expect, defineConfig } from "@playwright/test";
import { RegistrationPage } from "../pages/clientSite/RegistrationPage";

test.describe("Registration Tests", () => {
  test("Sign Up button is disabled when fields are empty", async ({ page }) => {
    const reg = new RegistrationPage(page);

    await test.step("Navigate to register page and verify the Sign in button is disable", async () => {
      await page.goto("/register");
      await expect(reg.signUpButton).toBeDisabled();
    });
  });
});
