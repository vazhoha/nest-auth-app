import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class UserCredentialsDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
