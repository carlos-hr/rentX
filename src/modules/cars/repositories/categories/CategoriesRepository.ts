import { Category } from '../../model/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from './ICategoriesRepository';

export class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];
  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  public static getIstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }
    return CategoriesRepository.INSTANCE;
  }

  create({ description, name }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      created_at: new Date(),
      description,
      name,
    });

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string) {
    return this.categories.find((category) => category.name === name);
  }
}
