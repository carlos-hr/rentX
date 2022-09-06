import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 } from 'uuid';
import { Category } from './Category';

@Entity('cars')
export class Car {
  @PrimaryColumn()
  id: string;

  @Column()
  category_id: string;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  description: string;

  @Column()
  license_plate: string;

  @Column()
  daily_rate: number;

  @Column()
  fine_amount: number;

  @Column()
  available: boolean;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  constructor() {
    if (!this.id) {
      this.id = v4();
      this.available = true;
    }
  }
}
