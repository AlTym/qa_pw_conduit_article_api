import { test } from '../../_fixtures/fixtures';

test(`Read existing artilce by unautorized user`, async ({
  articlesApi,
  newArticleDataWithoutTags,
  registeredUser
}) => {
  
  const article = await articlesApi.createArticle(
    newArticleDataWithoutTags,
    registeredUser
  );

  await articlesApi.assertSuccessResponseCode(article);

  registeredUser.token = '';

  const response = await articlesApi.readArticle();

  await articlesApi.assertSuccessResponseCode(response);
});
