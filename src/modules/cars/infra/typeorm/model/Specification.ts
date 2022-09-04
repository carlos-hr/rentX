import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 } from 'uuid';

@Entity('specifications')
export class Specification {
  @PrimaryColumn()
  id?: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  description: string;

  @Column()
  name: string;

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }
}
