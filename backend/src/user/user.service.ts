import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { FindOneOptions, Repository, UpdateResult, DeepPartial } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findUserById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne(id);
  }

  async findOne(options: FindOneOptions<User>): Promise<User | undefined> {
    return this.usersRepository.findOne(options);
  }

  async update(
    criteria: DeepPartial<User>,
    partialEntity: Partial<User>,
  ): Promise<UpdateResult> {
    return this.usersRepository.update(criteria, partialEntity);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.username=:username', { username })
      .getOne();
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email=:email', { email })
      .getOne();
    return user;
  }

  async save(user: Partial<User>): Promise<User> {
    return this.usersRepository.save(user);
  }
  async create(user: Partial<User>): Promise<User> {
    return this.usersRepository.create(user);
  }
}
