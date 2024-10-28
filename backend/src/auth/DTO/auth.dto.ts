import { IsNotEmpty } from 'class-validator';

import { User } from '../../user/entity/user.entity';

export class LoginDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class LoginResponseDto {
  token: string;
  user: User;
}