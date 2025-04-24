import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { SignInDto, SignUpDto } from './dto';

interface User {
  name: String;
  email: String;
  phoneNumber: String;
  password: String;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(dto: SignInDto) {
    const isValidUser = await this.validateUser(dto.email, dto.password);
    if (!isValidUser) {
      throw new HttpException('Invalid credentials', 401);
    }
    const payload = { email: dto.email, sub: isValidUser.id };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1d',
    });
    return {
      access_token: token,
      user: isValidUser,
    };
  }

  async register(dto: SignUpDto) {
    // Check if the user already exists
    const existingUser = await this.userService.findByEmail(dto.email);
    if (existingUser) {
      throw new HttpException('User already exists', 409);
    }

    // Hash the password and create the user
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const newUser = { ...dto, password: hashedPassword };

    const createdUser = await this.userService.create(newUser);
    const { password, ...result } = createdUser;

    return result;
  }
}
