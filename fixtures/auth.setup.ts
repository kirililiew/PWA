import { test } from "./pom/test-options";

test("auth user", async ({ loginPage, page }) => {
  await loginPage.navigateToHomePageGuest();

  await loginPage.login(process.env.EMAIL!, process.env.PASSWORD!);

  await page.context().storageState({ path: ".auth/userSession.json" });
});
