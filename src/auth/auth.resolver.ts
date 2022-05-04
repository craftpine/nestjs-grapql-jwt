import { User } from 'src/user/entities/user.entity';
import { GqlAuthGuard } from './gql-auth.guard';
import { LoginResponse } from './dto/login-response';
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginUserInput } from './dto/login-user.input';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    return this.authService.login(context.user);
  }

  @Mutation(() => User)
  signup(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.signup(loginUserInput);
  }
}
