import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RegistryDates } from '../../common/embedded/registry-dates.embedded';
import { Order } from '../../domain/orders/entities/order.entity';
import { Exclude } from 'class-transformer';
import { Role } from '../../auth/roles/enums/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Exclude()
  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    enumName: 'role_enum',
    default: Role.USER,
  })
  role: Role;

  @Column(() => RegistryDates, { prefix: false })
  registryDates: RegistryDates;

  get isDeleted() {
    return !!this.registryDates.deletedAt;
  }

  @OneToMany(() => Order, (order) => order.customer, {
    cascade: ['soft-remove', 'recover'],
  })
  orders: Order[];
}
