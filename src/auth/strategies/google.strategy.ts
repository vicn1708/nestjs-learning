import { Injectable } from '@nestjs/common/decorators';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifuCallback } from 'passport-google-oauth2';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID:
        '583965012362-m798aet3l0be8tou9j05q8bo2dlbtv0u.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:8080/auth/google/callback',
      scope: ['email', 'profile'],
      passReqToCallback: true,
    });
  }

  async validate(
    accesssToken: string,
    refreshToken: string,
    profile: any,
    done: VerifuCallback,
  ): Promise<any> {
    done(null, profile);
  }
}
