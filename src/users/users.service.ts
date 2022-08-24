import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<[boolean, string?]> {
    /* 1. check new user, *2. create user & hash the password
       3.
       */

    try {
      const exists = await this.users.findOne({ where: { email } });
      // error를 throw 하지 않고 리턴하는 방식 => GO언어의 방식
      return [false, 'there is a user with that email already'];
      await this.users.save(this.users.create({ email, password, role }));
      return [true];
    } catch (e) {
      //make error
      return [false, "Couldn't crete account"];
    }
  }
}
