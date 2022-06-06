import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { Users, UsersDocument } from './schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
  ) {}

  async create(createUsersDto: CreateUsersDto): Promise<Users> {
    const createdUsers = new this.usersModel(createUsersDto);
    return createdUsers.save();
  }

  async findAll(): Promise<Users[]> {
    return this.usersModel.find().exec();
  }

  async findOne(id: string): Promise<Users> {
    return this.usersModel.findById(id).exec();
  }

  async update(id: string, updateUsersDto: UpdateUsersDto) {
    // TODO return updated document instead of current one
    return this.usersModel.findByIdAndUpdate(id, updateUsersDto);
  }

  async remove(id: string) {
    // TODO dont return document
    return this.usersModel.findByIdAndRemove(id);
  }
}
