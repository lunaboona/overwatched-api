import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { Users, UsersDocument } from 'src/users/schemas/users.schema';
import { LoginDto } from '../users/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
  ) {}

  async authenticate(loginDto: LoginDto): Promise<any> {
    const user = await this.usersModel
      .findOne({ username: loginDto.username })
      .exec();
    if (bcrypt.compareSync(loginDto.password, user.password)) {
      return { token: 'placeholder' };
    } else {
      throw new BadRequestException('Login inválido');
    }
  }
}
