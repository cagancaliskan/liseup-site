import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import * as schema from './persistence/schema';
import * as bcrypt from 'bcrypt';
import { ulid } from 'ulid';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function seed() {
  const pool = new Pool({
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 5432),
    database: process.env.DB_NAME ?? 'liseup',
    user: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASSWORD ?? '',
  });

  const db = drizzle(pool, { schema });
  const hash = await bcrypt.hash('demo123', 10);

  const demoUsers = [
    { id: ulid(), email: 'demo-liseli@liseup.org', password: hash, role: 0 as const },
    { id: ulid(), email: 'demo-kurum@liseup.org',  password: hash, role: 2 as const },
    { id: ulid(), email: 'demo-yonetim@liseup.org', password: hash, role: 3 as const },
    { id: ulid(), email: 'demo-okul@liseup.org',   password: hash, role: 4 as const },
  ];

  for (const user of demoUsers) {
    const existing = await db.select({ id: schema.users.id })
      .from(schema.users)
      .where(eq(schema.users.email, user.email));
    if (existing.length === 0) {
      await db.insert(schema.users).values({
        id: user.id,
        email: user.email,
        password: user.password,
        role: user.role,
        status: 0,
      });
      console.log(`Created user: ${user.email}`);
    } else {
      console.log(`Skipped (exists): ${user.email}`);
    }
  }

  // Seed demo school for the okul user
  const okulUser = await db.select().from(schema.users)
    .where(eq(schema.users.email, 'demo-okul@liseup.org'));

  if (okulUser[0]) {
    const existingSchool = await db.select({ id: schema.schools.id })
      .from(schema.schools)
      .where(eq(schema.schools.admin_id, okulUser[0].id));
    if (existingSchool.length === 0) {
      await db.insert(schema.schools).values({
        id: ulid(),
        admin_id: okulUser[0].id,
        name: 'Ankara Atatürk Lisesi',
        city: 'Ankara',
        type: 0,
      });
      console.log('Created demo school');
    } else {
      console.log('Skipped (exists): demo school');
    }
  }

  console.log('Seed complete.');
  await pool.end();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
