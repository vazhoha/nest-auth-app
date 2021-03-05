import { Injectable } from '@nestjs/common';
import { UsersService } from "../users/users.service";
import { UserCredentialsDto } from "./dto/user-credentials.dto";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/entities/user.entity";
import { AccessTokenDto } from "./dto/access-token.dto";
import { ProfileResponseDto } from "./dto/profile-response.dto";
import { RegisterResponseDto } from "./dto/register-response.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userCredentialsDto: UserCredentialsDto): Promise<ProfileResponseDto> {
    return this.usersService.validateCredentials(userCredentialsDto);
  }

  async register(userCredentialsDto: UserCredentialsDto): Promise<RegisterResponseDto> {
    const user = await this.usersService.signUp(userCredentialsDto);

    const payload = { sub: user._id.toString() };
    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(userCredentialsDto: UserCredentialsDto): Promise<AccessTokenDto> {
    const user = await this.usersService.validateCredentials(userCredentialsDto);
    const payload = { sub: user._id.toString() };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
