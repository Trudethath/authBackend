import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encode } from 'punycode';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
// import { UserEntity } from 'src/users/entities/user.entity';
import { UserEntity } from 'src/users/entities';
import { encodePassword } from 'src/users/utils/bcypt';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  findOneById(id: number): Promise<UserEntity> {
    return this.userRepository.findOneBy({ id });
  }

  findOneByUsername(username: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ username });
  }

  createOne(createUserDto: CreateUserDto) {
    const date = new Date().toLocaleDateString();
    const userCopy = createUserDto;
    userCopy.password = encodePassword(createUserDto.password);
    userCopy.created_at = date;
    userCopy.updated_at = date;

    return this.userRepository.save(userCopy);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
