import { test } from '../../_fixtures/fixtures';

test(`Create artile by unautorized user`, async ({
  articlesApi,
  newArticleDataWithoutTags,
}) => {
  
  const response = await articlesApi.createArticle(
    newArticleDataWithoutTags,
    ''
  );

  await articlesApi.assertUnauthorizedResponseCode(response);
});
