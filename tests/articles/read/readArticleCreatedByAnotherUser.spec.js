import { test } from '../../_fixtures/fixtures';
import { ArticlesApi } from '../../../src/api/endpoints/ArticlesApi';

test.use({ usersNumber: 2 });

test(`Read artile created by user1 as authorized user2`, async ({
  newArticleDataWithoutTags,
  userRequests,
  registeredUsers
}) => {
  const user1 = registeredUsers[0];
  const user2 = registeredUsers[1];
  const user1Response = new ArticlesApi(userRequests[0]);
  const user2Response = new ArticlesApi(userRequests[1]);

  const article = await user1Response.createArticle(
    newArticleDataWithoutTags,
    user1
  );

  await user1.assertSuccessResponseCode(article);

  const response = await user2Response.readArticle(user2);

  await user2Response.assertSuccessResponseCode(response);
});
