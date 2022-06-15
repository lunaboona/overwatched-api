import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from '../users/dto/login.dto';
import { LoginResponseDto } from './../users/dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<any> {
    const user = await this.userService.findOneByQuery({
      username: loginDto.username,
    });
    if (!!user && bcrypt.compareSync(loginDto.password, user.password)) {
      const result: LoginResponseDto = {
        username: user.username,
        userId: user['_id'],
      };
      return result;
    } else {
      return null;
    }
  }

  async login(user: LoginResponseDto) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
