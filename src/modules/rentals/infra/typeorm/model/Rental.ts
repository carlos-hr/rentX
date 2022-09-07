import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 } from 'uuid';

// @Entity('rentals')
export class Rental {
  // @PrimaryColumn()
  id: string;

  // @Column()
  car_id: string;

  // @Column()
  user_id: string;

  // @CreateDateColumn()
  start_date: Date;

  // @Column()
  end_date: Date;

  // @Column()
  expected_return_date: Date;

  // @CreateDateColumn()
  created_at: Date;

  // @UpdateDateColumn()
  updated_at: Date;

  // @Column()
  total: number;

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }
}
