import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserCredentialsDto {
  @ApiProperty({
    example: 'email@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'some_password',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
