import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { User } from "./user.entity";

it('can create an instance of AuthService', async () => {
  /**
   * Create a fake copy of the UsersService
   *  - only the methods we need for the test
   * 
   * Why only 2 methods was implemented?
   *  - Because AuthService only depends on these 2 methods
   *  - Partial<T> allows all properties of T to be optional, so we only need to define the ones we use
   */
  const fakeUsersService: Partial<UsersService> = {
    find: () => Promise.resolve([]),
    create: (email: string, password: string) =>
      Promise.resolve({ id: 1, email, password } as User),
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

  const service = module.get(AuthService);
  expect(service).toBeDefined();
});