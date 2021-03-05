import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common';
import { User } from "./entities/user.entity";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { UserCredentialsDto } from "../auth/dto/user-credentials.dto";
import { ConfigType } from "@nestjs/config";
import bcryptConfig from './config/bcrypt.config';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(bcryptConfig.KEY)
    private bcryptConfiguration: ConfigType<typeof bcryptConfig>,
  ) {}

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findUserById(id: string) {
    const { password, ...result } = await this.userModel
      .findById(id)
      .lean()
      .exec();
    return result;
  }

  async signUp(userCredentialsDto: UserCredentialsDto): Promise<any> {
    const { email, password } = userCredentialsDto;
    const { saltRounds } = this.bcryptConfiguration;

    const user = new this.userModel({ email });
    user.password = await bcrypt.hash(password, saltRounds);

    try {
      await user.save();
      const { password, ...result } = user.toObject();
      return result;
    } catch (e) {
      if (e.code == 11000) {
        throw new ConflictException('User with this email is already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateCredentials(userCredentialsDto: UserCredentialsDto): Promise<any> {
    const { email, password } = userCredentialsDto;
    const user = await this.findByEmail(email);

    if (user) {
      const { password: pass, ...result } = user.toObject();
      const isMatch = await bcrypt.compare(password, pass);

      if (isMatch) {
        return result;
      }
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
