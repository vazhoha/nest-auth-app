import { Controller, Get, Post, UseGuards, Request, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth/auth.service";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { UserCredentialsDto } from "./auth/dto/user-credentials.dto";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('signup')
  async signUp(@Body() userCredentialsDto: UserCredentialsDto) {
    return this.authService.register(userCredentialsDto);
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() userCredentialsDto: UserCredentialsDto) {
    return this.authService.login(userCredentialsDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
