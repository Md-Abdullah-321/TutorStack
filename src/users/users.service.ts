import { HttpException, Injectable } from '@nestjs/common';
import { SignUpDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(user: SignUpDto): Promise<any> {
    const createdUser = await this.prisma.user.create({
      data: user,
    });
    const { password, ...result } = createdUser;
    return result;
  }

  async findByEmail(email: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) return new HttpException('User not found', 404);
    return user;
  }

  //   async findById(id: string): Promise<User | undefined> {
  //     return this.users.find((user) => user.id === id);
  //   }
}
