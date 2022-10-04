import { AppError } from '@errors/AppError';
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from '@modules/cars/useCases/createCategory/CreateCategoryUseCase';

describe('Create category', () => {
  let createCategoryUseCase: CreateCategoryUseCase;
  let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it('Should be able to create a new category', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category used for test',
    };

    await createCategoryUseCase.execute({
      description: category.description,
      name: category.name,
    });

    const newCategory = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(newCategory).toHaveProperty('id');
  });

  it('Should not be able to create categories with repeated names', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category used for test',
    };

    await createCategoryUseCase.execute({
      description: category.description,
      name: category.name,
    });

    await expect(
      createCategoryUseCase.execute({
        description: category.description,
        name: category.name,
      })
    ).rejects.toEqual(new AppError('Category already exists!'));
  });
});
