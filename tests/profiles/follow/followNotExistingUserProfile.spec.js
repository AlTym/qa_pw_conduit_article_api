import { faker } from '@faker-js/faker';
import { ProfilesApi } from '../../../src/api/endpoints/ProfilesApi';
import { test } from '../../_fixtures/fixtures';

//test.use({ usersNumber: 2 });

test(`Follow profile for not existing user by other user`, async ({
  profilesApi
}) => {
  const response = await profilesApi.followProfile(faker.internet.username());

  await profilesApi.assertNotFoundResponseCode(response);
});
