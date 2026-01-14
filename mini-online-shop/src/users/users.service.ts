import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../common/dto/pagination.dto';
import { DEFAULT_PAGE_SIZE } from '../common/util/common.constants';
import { HashingService } from '../auth/hashing/hashing.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly hashingService: HashingService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const hashedPassword = await this.hashingService.hash(password);

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  findAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;
    return this.userRepository.find({
      skip: offset,
      take: limit ?? DEFAULT_PAGE_SIZE.USER,
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        orders: {
          items: true,
          payment: true,
        },
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { password } = updateUserDto;
    const hashedPassword =
      password && (await this.hashingService.hash(password));

    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
      password: hashedPassword,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userRepository.save(user);
  }

  async remove(id: number, soft: boolean) {
    const user = await this.findOne(id);
    return soft
      ? this.userRepository.softRemove(user)
      : this.userRepository.remove(user);
  }

  async recover(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        orders: {
          items: true,
          payment: true,
        },
      },
      withDeleted: true,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.isDeleted) {
      throw new ConflictException('User not deleted');
    }

    return this.userRepository.recover(user);
  }
}
