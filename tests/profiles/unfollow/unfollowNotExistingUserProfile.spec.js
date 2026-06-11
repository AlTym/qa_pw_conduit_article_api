import { faker } from '@faker-js/faker';
import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';

test(`Unfollow profile for not existing user by other user`, async ({
  profilesApi
}) => {
  const response = await profilesApi.unfollowProfile(faker.internet.username());

  await profilesApi.assertNotFoundResponseCode(response);
});
