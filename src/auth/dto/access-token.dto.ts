import { IsJWT } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AccessTokenDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDQyMmJmMzE5NjcwMTZjMzY5ZjBmNWYiLCJpYXQiOjE2MTQ5NTUyOTQsImV4cCI6MTYxNDk1NTM1NH0.rTvoz1vKPlPqGteQ_x0Z5oInMjF-XcU3hIbZgxury5o',
  })
  @IsJWT()
  access_token: string;
}
