import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 } from 'uuid';
import { Category } from './Category';
import { Specification } from './Specification';

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

  @ManyToMany(() => Specification)
  @JoinTable({
    name: 'specifications_cars',
    joinColumns: [{ name: 'car_id' }],
    inverseJoinColumns: [{ name: 'specification_id' }],
  })
  specifications: Specification[];

  constructor() {
    if (!this.id) {
      this.id = v4();
      this.available = true;
    }
  }
}
