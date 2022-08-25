import { v4 } from 'uuid';

export class Specification {
  id?: string;
  created_at: Date;
  description: string;
  name: string;

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }
}
