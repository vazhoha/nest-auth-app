import { AccessTokenDto } from "./access-token.dto";
import { User } from "../../users/entities/user.entity";
import { IntersectionType } from "@nestjs/swagger";

export class ProfileResponseDto extends IntersectionType(User, AccessTokenDto) {}
