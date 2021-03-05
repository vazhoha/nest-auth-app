import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from "./auth/auth.service";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { UserCredentialsDto } from "./auth/dto/user-credentials.dto";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { AccessTokenDto } from "./auth/dto/access-token.dto";
import { ProfileResponseDto } from "./auth/dto/profile-response.dto";
import { RegisterResponseDto } from "./auth/dto/register-response.dto";

@ApiTags('Users')
@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService
  ) {}

  //
  @ApiCreatedResponse({
    type: RegisterResponseDto,
  })
  @Post('signup')
  async signUp(@Body() userCredentialsDto: UserCredentialsDto) {
    return this.authService.register(userCredentialsDto);
  }
  //

  //
  @ApiOkResponse({
    type: AccessTokenDto,
  })
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() userCredentialsDto: UserCredentialsDto) {
    return this.authService.login(userCredentialsDto);
  }
  //

  //
  @ApiBearerAuth()
  @ApiOkResponse({
    type: ProfileResponseDto,
  })
  @ApiUnauthorizedResponse({
      description: 'Unauthorized',
    }
  )
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
  //
}
