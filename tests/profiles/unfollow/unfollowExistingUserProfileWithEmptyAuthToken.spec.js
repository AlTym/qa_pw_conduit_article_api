import { request } from 'playwright-core';
import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

test(`Unfollow profile for existing user without auth token`, async ({
  registeredUsers,
}) => {
  const user1 = registeredUsers[0];

  const user2Request = await request.newContext({
    extraHTTPHeaders: {
      'content-type': 'application/json',
    },
  });

  
  const profilesApi = new ProfilesApi(user2Request);

  const response = await profilesApi.unfollowProfile(user1.username);

  await profilesApi.assertUnauthorizedResponseCode(response);
});
