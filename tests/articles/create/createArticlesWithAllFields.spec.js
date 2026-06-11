import { test } from '../../_fixtures/fixtures';

test(`Create article with all fields`, async ({
  articlesApi,
  newArticleDataWithoutTags,
  registeredUser
}) => {
  
  const response = await articlesApi.createArticle(
    newArticleDataWithoutTags,
    registeredUser
  );

  await articlesApi.assertSuccessResponseCode(response);
});
