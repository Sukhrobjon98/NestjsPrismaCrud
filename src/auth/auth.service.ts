import { HttpException, Injectable } from '@nestjs/common';
import { createUserDto } from 'src/users/dto/create.user.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { UserLoginDto } from './dto/user.login.dto';

@Injectable()
export class AuthService {
  constructor(private userService:UsersService) {}

  async register(userData:createUserDto) {
    const hash = await this.genrateHash(userData.password);
    userData.password = hash;
    return this.userService.create(userData);
  }



  async login(userData:UserLoginDto) {
    const user = await this.userService.findOne(userData);
    if (!user) {
      return new HttpException('User not found', 404);
    }
    const match = await this.compareHash(userData.password,user.password);
    if (!match) {
      return new HttpException('Invalid credentials', 401);
    }
    return user;
  }

  async genrateHash(password:string){
    const saltOrRounds = 8;
    const hash = await bcrypt.hash(password.toString(), saltOrRounds);
    return hash;
  }


  async compareHash(password:string,hash:string){
    const match = await bcrypt.compare(password.toString(), hash);
    return match;
  }
}
