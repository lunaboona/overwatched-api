import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from '../users/dto/login.dto';
import { LoginResponseDto } from './../users/dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async authenticate(loginDto: LoginDto): Promise<any> {
    const user = await this.userService.findOneByQuery({
      username: loginDto.username,
    });
    if (!!user && bcrypt.compareSync(loginDto.password, user.password)) {
      const result: LoginResponseDto = {
        username: user.username,
        id: user['_id'],
      };
      return result;
    } else {
      return null;
    }
  }
}
