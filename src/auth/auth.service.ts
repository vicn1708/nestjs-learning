import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { Role } from './enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(ur_email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(ur_email);
    if (user != null || user != undefined) {
      const isMatch = await bcrypt.compare(pass, user.ur_pass);
      if (isMatch != false) {
        const payload = {
          sub: user._id,
          ur_name: user.ur_name,
          ur_email: user.ur_email,
          ur_role: user.ur_role,
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

  async loginWithGoogle(dataUserGg: any): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(dataUserGg.email);

    if (!user) {
      await this.usersService.create({
        ur_name: dataUserGg.displayName,
        ur_email: dataUserGg.email,
        ur_pass: '',
        ur_role: Role.User,
      });
      const newUser = await this.usersService.findOne(dataUserGg.email);
      return await this.login({
        sub: newUser._id,
        ur_name: newUser.ur_name,
        ur_email: newUser.ur_email,
        ur_role: newUser.ur_role,
      });
    } else {
      return await this.login({
        sub: user._id,
        ur_name: user.ur_name,
        ur_email: user.ur_email,
        ur_role: user.ur_role,
      });
    }

    return null;
  }
}
