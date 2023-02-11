import { Injectable } from '@nestjs/common/decorators';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifuCallback } from 'passport-google-oauth2';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID:
        '395012630455-mk586kotmidtg39elnc0j28vq619r5ca.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:8080/auth/google/callback',
      scope: ['email', 'profile'],
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
