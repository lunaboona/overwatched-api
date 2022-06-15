import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { Users, UsersDocument } from './schemas/users.schema';

@Injectable()
export class UsersService {
  private saltRounds = 10;

  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
  ) {}

  async create(createUsersDto: CreateUsersDto): Promise<Users> {
    const hash = bcrypt.hashSync(createUsersDto.password, this.saltRounds);
    createUsersDto.password = hash;

    const createdUsers = new this.usersModel(createUsersDto);
    return createdUsers.save();
    // TODO check for duplicated username
  }

  async findAll(): Promise<Users[]> {
    return this.usersModel.find().exec();
  }

  async findOne(id: string): Promise<Users> {
    return this.usersModel.findById(id).exec();
  }

  async findOneByQuery(obj): Promise<Users> {
    return this.usersModel.findOne(obj).exec();
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
