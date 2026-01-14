import { Injectable } from '@nestjs/common';
import { HashingService } from './hashing.service';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class BcryptService implements HashingService {
  async hash(data: string | Buffer) {
    const salt = await genSalt();
    return hash(data.toString(), salt);
  }

  async compare(data: string | Buffer, hashed: string) {
    return compare(data, hashed);
  }
}
