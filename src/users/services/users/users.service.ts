import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { encodePassword } from 'src/users/utils/bcypt';
import { Repository } from 'typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOneById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  findOneByUsername(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username });
  }

  createOne(createUserDto: CreateUserDto) {
    const password = encodePassword(createUserDto.password);
    const newUser = this.userRepository.create({ ...createUserDto, password });
    return this.userRepository.save(newUser);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
