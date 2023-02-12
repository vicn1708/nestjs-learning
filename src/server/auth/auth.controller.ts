import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Roles } from './roles/roles.decorator';
import { Role } from './enums/role.enum';
import { RolesGuard } from './guards/roles.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any): Promise<{ access_token: string }> {
    return await this.authService.login(req.user);
  }

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('user/protected')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('admin/protected')
  getProfileAdmin(@Request() req: any) {
    return req.user;
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async callback(@Req() req) {
    // console.log(req.user);
    return await this.authService.loginWithGoogle(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('verifyToken')
  async verifyToken(@Body() token) {
    return this.authService.verifyToken(token.access_token);
  }
}
