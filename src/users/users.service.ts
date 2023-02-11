import { Connection, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Users, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const createdUser = new this.userModel(createUserDto);
    const salt = await bcrypt.genSalt();
    const password = createdUser.ur_pass;
    const hash = await bcrypt.hash(password, salt);
    createdUser.ur_pass = hash;
    return createdUser.save();
  }

  async findAll(): Promise<Users[]> {
    return this.userModel.find().exec();
  }

  async findOne(ur_email: string) {
    return await this.userModel.findOne({ ur_email: ur_email }).exec();
  }
}
