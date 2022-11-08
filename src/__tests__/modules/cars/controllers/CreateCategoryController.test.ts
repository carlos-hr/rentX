import request from 'supertest';
import { app } from '@shared/infra/http/app';
import { Connection } from 'typeorm';
import createConnection from '@shared/infra/database';
import { hash } from 'bcryptjs';
import { v4 } from 'uuid';

let connection: Connection;

describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = v4();
    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'xxxx')
    `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create a new category ', async () => {
    const responseToken = await request(app).post('/auth').send({
      email: 'admin@rentx.com',
      password: 'admin',
    });

    const { refresh_token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'teste',
        description: 'testeteste',
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.status).toBe(201);
  });

  it('Should not be able to create categories with repeated names', async () => {
    const responseToken = await request(app).post('/auth').send({
      email: 'admin@rentx.com',
      password: 'admin',
    });

    const { refresh_token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'teste',
        description: 'testeteste',
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.status).toBe(400);
  });
});
