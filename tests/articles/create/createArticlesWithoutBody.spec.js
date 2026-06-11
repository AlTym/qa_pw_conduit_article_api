import { test } from '../../_fixtures/fixtures';

test(`Create article with empty body`, async ({
  articlesApi,
  newArticleDataWithoutTags,
  registeredUser
}) => {
  newArticleDataWithoutTags.text = '';
  
  const response = await articlesApi.createArticle(
    newArticleDataWithoutTags,
    registeredUser
  );

  await articlesApi.assertUnprocessableEntityResponseCode(response);
});
