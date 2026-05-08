import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { CommerceRepository, Vendor, NewVendor, Product, NewProduct, CartItem, NewCartItem, Transaction, NewTransaction } from '../abstracts';
import { PostgresProvider } from './postgres.provider';
import { vendors, products, cartItems, transactions } from '../schema';

@Injectable()
export class PgCommerceRepository extends CommerceRepository {
  constructor(private readonly pg: PostgresProvider) {
    super();
  }

  private get db() {
    return this.pg.db;
  }

  // ─── Vendors ─────────────────────────────────────────

  async findVendorById(id: string): Promise<Vendor | null> {
    const rows = await this.db.select().from(vendors).where(eq(vendors.id, id));
    return rows[0] ?? null;
  }

  async findVendorsByManagerId(managerId: string): Promise<Vendor[]> {
    return this.db.select().from(vendors).where(eq(vendors.manager_id, managerId));
  }

  async createVendor(data: NewVendor): Promise<Vendor> {
    const rows = await this.db.insert(vendors).values(data).returning();
    return rows[0];
  }

  async updateVendor(id: string, data: Partial<NewVendor>): Promise<Vendor | null> {
    const rows = await this.db.update(vendors).set(data).where(eq(vendors.id, id)).returning();
    return rows[0] ?? null;
  }

  async deleteVendor(id: string): Promise<boolean> {
    const rows = await this.db.delete(vendors).where(eq(vendors.id, id)).returning();
    return rows.length > 0;
  }

  // ─── Products ────────────────────────────────────────

  async findProductById(id: string): Promise<Product | null> {
    const rows = await this.db.select().from(products).where(eq(products.id, id));
    return rows[0] ?? null;
  }

  async findProductsByVendorId(vendorId: string): Promise<Product[]> {
    return this.db.select().from(products).where(eq(products.vendor_id, vendorId));
  }

  async createProduct(data: NewProduct): Promise<Product> {
    const rows = await this.db.insert(products).values(data).returning();
    return rows[0];
  }

  async updateProduct(id: string, data: Partial<NewProduct>): Promise<Product | null> {
    const rows = await this.db.update(products).set(data).where(eq(products.id, id)).returning();
    return rows[0] ?? null;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const rows = await this.db.delete(products).where(eq(products.id, id)).returning();
    return rows.length > 0;
  }

  // ─── Cart ────────────────────────────────────────────

  async findCartByUserId(userId: string): Promise<CartItem[]> {
    return this.db.select().from(cartItems).where(eq(cartItems.user_id, userId));
  }

  async findCartItemById(id: string): Promise<CartItem | null> {
    const rows = await this.db.select().from(cartItems).where(eq(cartItems.id, id)).limit(1);
    return rows[0] ?? null;
  }

  async addToCart(data: NewCartItem): Promise<CartItem> {
    const rows = await this.db.insert(cartItems).values(data).returning();
    return rows[0];
  }

  async updateCartItem(id: string, data: Partial<NewCartItem>): Promise<CartItem | null> {
    const rows = await this.db.update(cartItems).set(data).where(eq(cartItems.id, id)).returning();
    return rows[0] ?? null;
  }

  async removeFromCart(id: string): Promise<boolean> {
    const rows = await this.db.delete(cartItems).where(eq(cartItems.id, id)).returning();
    return rows.length > 0;
  }

  async clearCart(userId: string): Promise<number> {
    const rows = await this.db.delete(cartItems).where(eq(cartItems.user_id, userId)).returning();
    return rows.length;
  }

  // ─── Transactions ───────────────────────────────────

  async findTransactionById(id: string): Promise<Transaction | null> {
    const rows = await this.db.select().from(transactions).where(eq(transactions.id, id));
    return rows[0] ?? null;
  }

  async findTransactionsByUserId(userId: string): Promise<Transaction[]> {
    return this.db.select().from(transactions).where(eq(transactions.user_id, userId));
  }

  async findTransactionsByTeamId(teamId: string): Promise<Transaction[]> {
    return this.db.select().from(transactions).where(eq(transactions.team_id, teamId));
  }

  async createTransaction(data: NewTransaction): Promise<Transaction> {
    const rows = await this.db.insert(transactions).values(data).returning();
    return rows[0];
  }
}
