import upload from '@config/upload';
import { S3 } from 'aws-sdk';
import { resolve } from 'path';
import fs from 'fs';

import { IStorageProvider } from '../IStorageProvider';

export class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({ region: process.env.AWS_REGION });
  }

  async save(file: string, folder: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalName);

    this.client.putObject({
      Bucket: `${process.env.AWS_BUCKET}/${folder}`,
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType: 'a',
    });
    return 'a';
  }

  async delete(file: string, folder: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
