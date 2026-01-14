import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { User } from '../entities/user.entity';
import { HashingService } from '../../auth/hashing/hashing.service';

@EventSubscriber()
export class UsersSubscriber implements EntitySubscriberInterface<User> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly hashingService: HashingService,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>): Promise<void> {
    const { entity: user } = event;
    user.password = await this.hashingService.hash(user.password);
  }

  async beforeUpdate(event: UpdateEvent<User>): Promise<void> {
    const { entity, databaseEntity: databaseUser } = event;
    const user = entity as User;

    const isSamePassword = await this.hashingService.compare(
      user.password,
      databaseUser.password,
    );

    if (isSamePassword) {
      user.password = databaseUser.password;
      return;
    }
    user.password = await this.hashingService.hash(user.password);
  }
}
