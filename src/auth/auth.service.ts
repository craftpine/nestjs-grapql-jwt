import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { LoginUserInput } from './dto/login-user.input';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);

    const valid = await bcrypt.compare(password, user.password);

    if (user && valid) {
      // TODO: make this more secure
      const { password, ...result } = user;
      return result;
    }
  }

  async login(loginUserInput: LoginUserInput) {
    const user = await this.userService.findOne(loginUserInput.username);

    const { password, ...result } = user;

    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
      user: result,
    };
  }

  async signup(loginUserInput: LoginUserInput) {
    const user = await this.userService.findOne(loginUserInput.username);

    if (user) {
      throw new Error('User already exists!');
    }

    const password = await bcrypt.hash(loginUserInput.password, 10);
    console.log(password);
    return this.userService.create({
      ...loginUserInput,
      password,
    });
  }
}
