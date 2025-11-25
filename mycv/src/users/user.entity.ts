import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterRemove, AfterUpdate, OneToMany } from "typeorm";
import { Report } from "../reports/report.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isAdmin: boolean;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @AfterInsert()
  logInsert() {
    console.log(`New user inserted with id: ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`User updated with id: ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`User removed with id: ${this.id}`);
  }
}