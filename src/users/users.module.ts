import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./entities/user.entity";
import { UsersService } from './users.service';
import { ConfigModule } from "@nestjs/config";
import bcryptConfig from './config/bcrypt.config';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      }
    ]),
    ConfigModule.forFeature(bcryptConfig),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
