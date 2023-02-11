import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  ur_email: string;

  @ApiProperty()
  @IsNotEmpty()
  ur_pass: string;
}
