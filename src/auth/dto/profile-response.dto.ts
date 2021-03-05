import { User } from "../../users/entities/user.entity";
import { OmitType } from "@nestjs/swagger";

export class ProfileResponseDto extends OmitType(User, ["password"] as const) {}
