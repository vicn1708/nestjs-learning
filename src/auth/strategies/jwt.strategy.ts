import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.secret || jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    return {
      ur_id: payload.sub,
      ur_name: payload.ur_name,
      ur_email: payload.ur_email,
      ur_role: payload.ur_role,
    };
  }
}
