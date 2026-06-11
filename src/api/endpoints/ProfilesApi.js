import { expect } from '@playwright/test';
import { BaseAPI } from '../BaseApi';
import { ROUTES } from '../../constants/apiRoutes';

export class ProfilesApi extends BaseAPI {
  constructor(request) {
    super(request);
    this._headers = { 'content-type': 'application/json' };
  }

  async getProfile(username) {
    return await this.step(`Get profile for a user`, async () => {
      return await this.request.get(ROUTES.profiles(username).index, {
        headers: this._headers,
      });
    });
  }

  async followProfile(username) {
    return await this.step(`Follow user's profile`, async () => {
      return await this.request.post(ROUTES.profiles(username).follow, {});
    });
  }

  async unfollowProfile(username) {
    return await this.step(`Unfollow user's profile`, async () => {
      return await this.request.delete(ROUTES.profiles(username).follow, {});
    });
  }

  async assertUsernameHasCorrectValue(response, username) {
    await this.step(`Assert response body has correct username`, async () => {
      const body = await this.parseBody(response);

      expect(body.profile.username).toBe(username);
    });
  }

  async assertImageHasCorrectValue(response, image) {
    await this.step(
      `Assert response body has correct image value`,
      async () => {
        const body = await this.parseBody(response);

        expect(body.profile.image).toBe(image);
      },
    );
  }

  async assertBioHasCorrectValue(response, bio) {
    await this.step(`Assert response body has correct bio`, async () => {
      const body = await this.parseBody(response);

      expect(body.profile.bio).toBe(bio);
    });
  }

  async assertFollowingFieldHasValue(response, value) {
    await this.step(
      `Assert response body has '${value}' in 'following' field`,
      async () => {
        const body = await this.parseBody(response);

        expect(body.profile.following).toBe(value);
      },
    );
  }

  async assertFollowingHasValueFalse(response) {
    this.assertFollowingFieldHasValue(response, false);
  }

  async assertFollowingHasValueTrue(response) {
    this.assertFollowingFieldHasValue(response, true);
  }
}
