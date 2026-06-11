import { expect } from '@playwright/test';
import { BaseAPI } from '../BaseApi';
import { ROUTES } from '../../constants/apiRoutes';

export class ArticlesApi extends BaseAPI {
  _slug;
  constructor(request) {
    super(request);
    this._headers = { 'content-type': 'application/json' };
  }

  async createArticle(articleData, userData) {
    return await this.step(`Create new article`, async () => {
      const response = await this.request.post(ROUTES.article, {
      data: { article: articleData },
      headers: {
        authorization: `Token ${userData.token}`,
        ...this._headers,
      }
      });
      if (response.ok()) {
        const body = await response.json();
        this._slug = body.article.slug;
      }
      return response; 
    });
  }

  async readArticle(userData) {
    return await this.step(`Read the article`, async () => {
      return await this.request.get(ROUTES.articles(this._slug).index, {
        headers: {
        authorization: `Token ${userData.token}`,
        ...this._headers,
        }
      });
    });
  }

  async deleteArticle(userData) {
    return await this.step(`Delete the article`, async () => {
      return await this.request.delete(ROUTES.articles(this._slug).index, {
        headers: {
        authorization: `Token ${userData.token}`,
        ...this._headers,
      }
      });
    });
  }

  async favoriteArticle(userData) {
    return await this.step(`Add article to favorite`, async () => {
      return await this.request.post(ROUTES.articles(this._slug).favorite, {
        headers: {
        authorization: `Token ${userData.token}`,
        ...this._headers,
      }
      });
    });
  }

  async unfavoriteArticle(userData) {
    return await this.step(`Make article unfavorite`, async () => {
      return await this.request.delete(
        ROUTES.articles(this._slug).favorite, {
          headers: {
        authorization: `Token ${userData.token}`,
        ...this._headers,
      }
        }
      );
    });
  }

  async assertTitleHasCorrectValue(response, title) {
    await this.step(`Assert response body has correct title`, async () => {
      const body = await this.parseBody(response);

      expect(body.article.title).toBe(title);
    });
  }

  async assertDescriptionHasCorrectValue(response, description) {
    await this.step(
      `Assert response body has correct description`,
      async () => {
        const body = await this.parseBody(response);

        expect(body.article.description).toBe(description);
      },
    );
  }

  async assertBodyHasCorrectValue(response, articleBody) {
    await this.step(
      `Assert response body has correct article body`, 
      async () => {
      const body = await this.parseBody(response);

      expect(body.article.body).toBe(articleBody);
    });
  }

  async assertFavoritedFieldHasValue(response, value) {
    await this.step(
      `Assert response body has '${value}' in 'favorited' field`,
      async () => {
        const body = await this.parseBody(response);

        expect(body.article.favorited).toBe(value);
      },
    );
  }

  async assertFavoritedHasValueFalse(response) {
    this.assertFavoritedFieldHasValue(response, false);
  }

  async assertFavoritedHasValueTrue(response) {
    this.assertFavoritedFieldHasValue(response, true);
  }
}
