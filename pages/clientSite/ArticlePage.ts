import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./common/BasePage";
/**
 * This is the page object for the Article Page.
 * @export
 * @class ArticlePage
 *
 * @typedef {ArticlePage
 *}
 */
export class ArticlePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  async createAndDeleteArticle() {
    const title = "Test title";
    await this.newArticleButton.click();
    await this.articleTitle.fill(title);
    await this.aboutArticle.fill("Test About Article");
    await this.articleDescription.fill(
      "This is automation test, and this is a description for my new article"
    );
    await this.publishArticleButton.click();
    await expect(this.page.getByRole("heading", { level: 1 })).toHaveText(
      title
    );
    await this.deleteArticleButton.click();
    await expect(this.page.getByRole("link", { name: title })).toHaveCount(0);
    await this.yourFeedPage.click();
    await expect(
      this.page.getByText("No articles are here... yet.")
    ).toHaveText("No articles are here... yet.");
  }
}
