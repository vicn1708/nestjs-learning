import { Injectable } from '@nestjs/common/decorators';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifuCallback } from 'passport-google-oauth2';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID:
        '583965012362-jjqe2pt152eem11dfb6f1l2v2h17s3bq.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:8080/auth/google/callback',
      scope: ['email', 'profile'],
      passReqToCallback: false,
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
