import {
  pgTable,
  text,
  integer,
  boolean,
  jsonb,
  timestamp,
  varchar,
  serial,
  primaryKey,
} from 'drizzle-orm/pg-core';

// ─── Auth Domain ─────────────────────────────────────────

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  email_verification_code: text('email_verification_code'),
  new_email: text('new_email'),
  password: text('password').notNull(),
  role: integer('role').notNull().default(0),
  status: integer('status').notNull().default(0),
});

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  user_id: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  user_agent: text('user_agent').notNull(),
  refresh_token: text('refresh_token').notNull(),
  expires_at: timestamp('expires_at', { withTimezone: true }),
});

// ─── Education Domain ────────────────────────────────────

export const schools = pgTable('schools', {
  id: text('id').primaryKey(),
  admin_id: text('admin_id')
    .notNull()
    .references(() => users.id),
  name: text('name').notNull(),
  city: text('city').notNull(),
  type: integer('type').notNull().default(0),
});

export const students = pgTable('students', {
  user_id: text('user_id')
    .primaryKey()
    .references(() => users.id, { onDelete: 'cascade' }),
  school_id: text('school_id')
    .notNull()
    .references(() => schools.id),
  grade: integer('grade').notNull(),
  parent_email: text('parent_email').notNull(),
  lp_balance: integer('lp_balance').notNull().default(0),
  consent_status: boolean('consent_status').notNull().default(false),
  achievements: jsonb('achievements').notNull().default({}),
  total_xp: integer('total_xp').notNull().default(0),
});

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const mentors = pgTable('mentors', {
  user_id: text('user_id')
    .primaryKey()
    .references(() => users.id, { onDelete: 'cascade' }),
  university: text('university')
    .notNull()
    .references(() => schools.id),
  expertise: integer('expertise').array().notNull().default([]),
  bio: text('bio').notNull().default(''),
});

// ─── Teams Domain ────────────────────────────────────────

export const teams = pgTable('teams', {
  id: text('id').primaryKey(),
  owner_id: text('owner_id')
    .notNull()
    .references(() => users.id),
  name: text('name').notNull(),
});

export const teamMembers = pgTable(
  'team_members',
  {
    user_id: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    team_id: text('team_id')
      .notNull()
      .references(() => teams.id, { onDelete: 'cascade' }),
    role: integer('role').notNull().default(0),
    status: integer('status').notNull().default(0),
  },
  (t) => [primaryKey({ columns: [t.user_id, t.team_id] })],
);

export const projects = pgTable('projects', {
  id: text('id').primaryKey(),
  team_id: text('team_id').references(() => teams.id), // nullable: project can exist before team assignment
  mentor_id: text('mentor_id').references(() => users.id),
  title: text('title').notNull(),
  description: text('description').notNull(),
  category: integer('category')
    .notNull()
    .references(() => categories.id),
  phase: integer('phase').notNull().default(0),
  status: integer('status').notNull().default(0),
  image_url: text('image_url'),
  notes: text('notes'),
  // ─── Business Model Canvas (iş kanvası) ──────────────
  problem: text('problem'),
  solution: text('solution'),
  value_proposition: text('value_proposition'),
  customer_segments: text('customer_segments'),
  competition: text('competition'),
});

// ─── Commerce Domain ─────────────────────────────────────

export const vendors = pgTable('vendors', {
  id: text('id').primaryKey(),
  manager_id: text('manager_id')
    .notNull()
    .references(() => users.id),
  name: text('name').notNull(),
  logo: text('logo'),
  categories: integer('categories').array().notNull().default([]),
});

export const products = pgTable('products', {
  id: text('id').primaryKey(),
  vendor_id: text('vendor_id')
    .notNull()
    .references(() => vendors.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description').notNull(),
  stock_count: integer('stock_count'),
  images: text('images').array().notNull().default([]),
});

export const cartItems = pgTable('cart_items', {
  id: text('id').primaryKey(),
  user_id: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  product_id: text('product_id')
    .notNull()
    .references(() => products.id),
  amount: integer('amount').notNull().default(1),
  note: varchar('note', { length: 300 }),
});

export const transactions = pgTable('transactions', {
  id: text('id').primaryKey(),
  user_id: text('user_id')
    .notNull()
    .references(() => users.id),
  team_id: text('team_id')
    .notNull()
    .references(() => teams.id),
  cart: jsonb('cart').notNull(),
  description: text('description').notNull(),
  hash: text('hash').notNull(),
});

// ─── Messaging Domain ────────────────────────────────────

export const messages = pgTable('messages', {
  id: text('id').primaryKey(),
  sender_id: text('sender_id')
    .notNull()
    .references(() => users.id),
  receiver_id: text('receiver_id')
    .notNull()
    .references(() => users.id),
  content: varchar('content', { length: 500 }).notNull(),
  is_read: boolean('is_read').notNull().default(false),
});
