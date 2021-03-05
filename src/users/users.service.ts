import { Injectable } from '@nestjs/common';
import { User } from "./entities/user.entity";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private catModel: Model<User>,
  ) {}
}
