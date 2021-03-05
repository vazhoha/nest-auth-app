import { AccessTokenDto } from "./access-token.dto";
import { User } from "../../users/entities/user.entity";
import { IntersectionType, OmitType } from "@nestjs/swagger";

export class ProfileResponseDto extends IntersectionType(OmitType(User, ["password"] as const), AccessTokenDto) {}
