import { vendors, products, cartItems, transactions } from '../schema';

export type Vendor = typeof vendors.$inferSelect;
export type NewVendor = typeof vendors.$inferInsert;
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type CartItem = typeof cartItems.$inferSelect;
export type NewCartItem = typeof cartItems.$inferInsert;
export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = typeof transactions.$inferInsert;

export abstract class CommerceRepository {
  // Vendors
  abstract findVendorById(id: string): Promise<Vendor | null>;
  abstract findVendorsByManagerId(managerId: string): Promise<Vendor[]>;
  abstract createVendor(data: NewVendor): Promise<Vendor>;
  abstract updateVendor(id: string, data: Partial<NewVendor>): Promise<Vendor | null>;
  abstract deleteVendor(id: string): Promise<boolean>;

  // Products
  abstract findProductById(id: string): Promise<Product | null>;
  abstract findProductsByVendorId(vendorId: string): Promise<Product[]>;
  abstract createProduct(data: NewProduct): Promise<Product>;
  abstract updateProduct(id: string, data: Partial<NewProduct>): Promise<Product | null>;
  abstract deleteProduct(id: string): Promise<boolean>;

  // Cart
  abstract findCartByUserId(userId: string): Promise<CartItem[]>;
  abstract findCartItemById(id: string): Promise<CartItem | null>;
  abstract addToCart(data: NewCartItem): Promise<CartItem>;
  abstract updateCartItem(id: string, data: Partial<NewCartItem>): Promise<CartItem | null>;
  abstract removeFromCart(id: string): Promise<boolean>;
  abstract clearCart(userId: string): Promise<number>;

  // Transactions
  abstract findTransactionById(id: string): Promise<Transaction | null>;
  abstract findTransactionsByUserId(userId: string): Promise<Transaction[]>;
  abstract findTransactionsByTeamId(teamId: string): Promise<Transaction[]>;
  abstract createTransaction(data: NewTransaction): Promise<Transaction>;
}
