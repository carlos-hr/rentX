import { parse } from 'csv-parse';
import fs from 'fs';

import { ICategoriesRepository } from '../../repositories/categories/ICategoriesRepository';

interface IImportCategory {
  description: string;
  name: string;
}

export class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const parseFile = parse();

      const importCategories: IImportCategory[] = [];

      stream.pipe(parseFile);

      parseFile
        .on('data', async (line) => {
          const [description, name] = line;
          importCategories.push({
            description,
            name,
          });
        })
        .on('end', () => {
          resolve(importCategories);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File) {
    const importCategories = await this.loadCategories(file);

    importCategories.map((category) => {
      const { description, name } = category;
      const existCategory = this.categoriesRepository.findByName(name);

      if (!existCategory) {
        this.categoriesRepository.create({
          description,
          name,
        });
      }
    });
  }
}
