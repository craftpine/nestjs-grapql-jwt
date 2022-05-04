import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
// import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  private readonly users = [
    {
      id: 1,
      username: 'admin',
      password: '$2b$10$CHJeGLhv8YddraO6pTcP3e8s7zqwpwFBMpkwhFJczSgTqHoduUFoi',
    },
  ];

  create(createUserInput: CreateUserInput) {
    const user = {
      ...createUserInput,
      id: Date.now(),
    };

    this.users.push(user);

    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(username: string) {
    return this.users.find((e) => e.username === username);
  }

  // update(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
