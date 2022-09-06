import { v4 } from 'uuid';

export class Car {
  id: string;
  category_id: string;
  name: string;
  brand: string;
  description: string;
  license_plate: string;
  daily_rate: number;
  fine_amount: number;
  available: boolean;
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = v4();
      this.available = true;
      this.created_at = new Date();
    }
  }
}
