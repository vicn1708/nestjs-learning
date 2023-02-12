import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from './enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (user != null || user != undefined) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch != false) {
        const payload = {
          sub: user._id,
          userName: user.userName,
          email: user.email,
          role: user.role,
        };
        return payload;
      }
    }
    return null;
  }

  async login(dataUser: any): Promise<{ access_token: string }> {
    return {
      access_token: this.jwtService.sign(dataUser),
    };
  }

  async verifyToken(token: string) {
    return {
      user: this.jwtService.verify(token),
    };
  }

  async loginWithGoogle(dataUserGg: any) {
    const user = await this.usersService.findOne(dataUserGg.email);

    if (!user) {
      const createUser = await this.usersService
        .create({
          userName: dataUserGg.displayName,
          email: dataUserGg.email,
          password: '',
          role: Role.User,
        })
        .then((user) => {
          return this.usersService.findOne(user.email);
        })
        .then((user) => ({
          sub: user._id,
          userName: user.userName,
          email: user.email,
          role: user.role,
        }));

      return await this.login(createUser);
    } else {
      if (dataUserGg.email_verified == true) {
        return await this.login({
          sub: user._id,
          userName: user.userName,
          email: user.email,
          role: user.role,
        });
      }
      return { msg: 'email not verify' };
    }

    return null;
  }

  // async loginWithGoogleFirebase() {}
}
