import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util"; 

const scrypt = promisify(_scrypt);

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    /**
     * Create a fake copy of the UsersService
     *  - only the methods we need for the test
     * 
     * Why only 2 methods was implemented?
     *  - Because AuthService only depends on these 2 methods
     *  - Partial<T> allows all properties of T to be optional, so we only need to define the ones we use
     */
    const users: User[] = [];
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter(user => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = { id: Math.floor(Math.random() * 9999), email, password } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    }

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        }
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of AuthService', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('test@example.com', 'password123');
    expect(user.password).not.toEqual('password123');

    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws and error if user signs up with email that is in use', async () => {
    /**
     * Redefine the fakeUsersService.find method to return a user
     *  - simulating that the email is already in use
     */
    await expect(service.signup('test@example.com', 'password123'))
      .resolves
      .toBeDefined();

    await expect(service.signup('test@example.com', 'password123'))
      .rejects
      .toThrow(BadRequestException);
  });

  it('throws if signin is called with an unused email', async () => {
    await expect(service.signin('unused@example.com', 'password123'))
      .rejects
      .toThrow(NotFoundException);
  });

  it('throws if an invalid password is provided', async () => {
    /**
     * Redefine the fakeUsersService.find method to return a user
     *  - simulating that password is incorrect
     */
    await service.signup('test@example.com', 'password123');
    await expect(service.signin('test@example.com', 'password1234'))
      .rejects
      .toThrow(BadRequestException);
  });

  it('returns a user if correct password is provided', async () => {
    /**
     * Redefine the fakeUsersService.find method to return a user
     *  - simulating that password is correct
     */
    await service.signup('test@example.com', 'password123');
    const user = await service.signin('test@example.com', 'password123');
    expect(user).toBeDefined();
  });
});
