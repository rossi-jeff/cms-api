import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { RegisterUserDto, LoginDto } from '../global/dto';
import * as _ from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async registerUser(DTO: RegisterUserDto) {
    const user = new User();
    _.merge(user, DTO);
    await this.repo.save(user);
    delete user.PassWord;
    return user;
  }

  async loginUser(DTO: LoginDto) {
    const { Email, PassWord } = DTO;
    const user = await this.getUserByEmail(Email);
    if (user && user.validatePassWord(PassWord)) {
      const { UUID, Name } = user;
      const payload = {
        sub: user.Id,
        Name,
        UUID,
      };
      return {
        UUID,
        Token: this.jwtService.sign(payload),
      };
    } else {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  async getUserByEmail(Email: string) {
    return this.repo
      .createQueryBuilder('user')
      .where('user.Email = :Email', { Email })
      .addSelect('user.PassWord')
      .getOne();
  }
}
