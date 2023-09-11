import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createUserDto } from './dto/create.user.dto';
import { UserLoginDto } from 'src/auth/dto/user.login.dto';

@Injectable()
export class UsersService {
  constructor(private userModel: PrismaService) {}
  async create(data: createUserDto) {
    return this.userModel.user.create({
      data,
    });
  }

  async findOne(userData: UserLoginDto) {
    return await this.userModel.user.findFirst({
      where: {
        username: userData?.username,
        email: userData?.email,
      },
    });
  }
}
