import { test } from '../../_fixtures/fixtures';

test(`Create artile by unautorized user`, async ({
  articlesApi,
  newArticleDataWithoutTags,
  newUserData
}) => {
  
  const response = await articlesApi.createArticle(
    newArticleDataWithoutTags,
    newUserData
  );

  await articlesApi.assertUnauthorizedResponseCode(response);
});
