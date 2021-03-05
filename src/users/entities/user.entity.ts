import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User extends Document {
  @ApiProperty({
    example: 'email@example.com',
  })
  @Prop({
    unique: true,
  })
  email: string;

  @Prop()
  password: string;


  @ApiProperty({
    example: new Date().toISOString(),
  })
  createdAt: string;

  @ApiProperty({
    example: new Date().toISOString(),
  })
  updatedAt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
