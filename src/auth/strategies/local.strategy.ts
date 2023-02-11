import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LoginUserDto } from 'src/users/dtos/login-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(ur_email: string, pass: string): Promise<LoginUserDto> {
    const user = await this.authService.validateUser(ur_email, pass);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
