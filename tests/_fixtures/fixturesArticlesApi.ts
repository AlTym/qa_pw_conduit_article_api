import { test as base } from '@playwright/test';
import { request as apiRequest } from '@playwright/test';
import { ArticlesApi } from '../../src/api/endpoints/ArticlesApi';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';

export const test = base.extend<{
  articlesApi: ArticlesApi;
  newArticleDataWithoutTags: any;
}>({
  articlesApi: async ({ request }, use) => {
    const client = new ArticlesApi(request);

    await use(client);
  },
  newArticleDataWithoutTags: async ({ logger }, use) => {
    const articleData = generateNewArticleData(logger);

    await use(articleData);
  },
});
