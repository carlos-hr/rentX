import { hash } from 'bcryptjs';
import { v4 } from 'uuid';
import createConnection from '..';

async function create() {
  const connection = await createConnection();

  const id = v4();
  const password = await hash('admin', 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'xxxx')
    `
  );

  await connection.close();
}

create().then(() => console.log('Admin created'));
