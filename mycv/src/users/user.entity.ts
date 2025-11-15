import { Exclude } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterRemove, AfterUpdate } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

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