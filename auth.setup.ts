import { test as setup } from "./fixtures/pom/test-options";

setup("auth user", async ({ loginPage, registrationPage, page }) => {
  await setup.step("create logged in user session", async () => {
    await loginPage.navigateToHomePageGuest();

    await loginPage.login(process.env.EMAIL!, process.env.PASSWORD!);

    await page.context().storageState({ path: ".auth/userSession.json" });
  });
});
