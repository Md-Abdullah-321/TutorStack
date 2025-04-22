import { Injectable } from '@nestjs/common';

interface User {
  name: String;
  email: String;
  phoneNumber: String;
  password: String;
}

@Injectable()
export class UsersService {
  private users: User[] = [];

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  //   async findById(id: string): Promise<User | undefined> {
  //     return this.users.find((user) => user.id === id);
  //   }
}
