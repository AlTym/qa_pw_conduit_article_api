import { test } from '../../_fixtures/fixtures';

test(`Create article with empty title`, async ({
  articlesApi,
  newArticleDataWithoutTags,
  registeredUser
}) => {
  newArticleDataWithoutTags.title = '';
  
  const response = await articlesApi.createArticle(
    newArticleDataWithoutTags,
    registeredUser
  );

  await articlesApi.assertUnprocessableEntityResponseCode(response);
});
