import { test as base } from "@playwright/test";
import { LoginPage } from "../../pages/clientSite/LoginPage";
import { RegistrationPage } from "../../pages/clientSite/RegistrationPage";
import { ArticlePage } from "../../pages/clientSite/ArticlePage";

export type FrameworkFixtures = {
  loginPage: LoginPage;
  registrationPage: RegistrationPage;
  articlePage: ArticlePage;
};

export const test = base.extend<FrameworkFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },

  articlePage: async ({ page }, use) => {
    await use(new ArticlePage(page));
  },
});
