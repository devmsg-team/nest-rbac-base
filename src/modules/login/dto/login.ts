import { IsInt, IsString } from "class-validator";

export class ILoginDto {
  @IsString()
  name: string;
}