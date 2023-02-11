import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from 'src/auth/enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  ur_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  ur_email: string;

  @ApiProperty()
  @IsNotEmpty()
  ur_pass: string;

  @ApiProperty()
  @IsNotEmpty()
  ur_role: Role;
}
