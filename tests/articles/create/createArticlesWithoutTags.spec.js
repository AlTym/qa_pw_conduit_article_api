import { test } from '../../_fixtures/fixtures';

test(`Create article with empty tags array`, async ({
  articlesApi,
  newArticleDataWithoutTags,
  registeredUser
}) => {
  const response = await articlesApi.createArticle(
    newArticleDataWithoutTags,
    registeredUser
  );

  await articlesApi.assertSuccessResponseCode(response);

  await articlesApi.assertBodyHasCorrectValue(
    response,
    newArticleDataWithoutTags.text,
  );
});
