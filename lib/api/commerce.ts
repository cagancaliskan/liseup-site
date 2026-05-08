import { apiFetch } from "../api-client";

export type Vendor      = { id: string; manager_id: string; name: string; logo: string | null; categories: number[] };
export type Product     = { id: string; vendor_id: string; name: string; description: string; stock_count: number | null; images: string[] };
export type CartItem    = { id: string; user_id: string; product_id: string; amount: number; note: string | null };
export type Transaction = { id: string; user_id: string; team_id: string; cart: unknown; description: string; hash: string };

export const commerceApi = {
  getVendor:           (id: string) => apiFetch<Vendor>(`/api/commerce/vendors/${id}`),
  createVendor:        (body: Omit<Vendor, "id">) => apiFetch<Vendor>("/api/commerce/vendors", { method: "POST", body: JSON.stringify(body) }),
  updateVendor:        (id: string, body: Partial<Vendor>) => apiFetch<Vendor>(`/api/commerce/vendors/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  getProduct:          (id: string) => apiFetch<Product>(`/api/commerce/products/${id}`),
  getProductsByVendor: (vendorId: string) => apiFetch<Product[]>(`/api/commerce/products?vendorId=${encodeURIComponent(vendorId)}`),
  createProduct:       (body: Omit<Product, "id" | "images">) => apiFetch<Product>("/api/commerce/products", { method: "POST", body: JSON.stringify(body) }),
  updateProduct:       (id: string, body: Partial<Product>) => apiFetch<Product>(`/api/commerce/products/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  deleteProduct:       (id: string) => apiFetch<boolean>(`/api/commerce/products/${id}`, { method: "DELETE" }),
  getCart:             () => apiFetch<CartItem[]>("/api/commerce/cart"),
  addToCart:           (body: Omit<CartItem, "id" | "user_id">) => apiFetch<CartItem>("/api/commerce/cart", { method: "POST", body: JSON.stringify(body) }),
  updateCartItem:      (id: string, body: Partial<CartItem>) => apiFetch<CartItem>(`/api/commerce/cart/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  removeFromCart:      (id: string) => apiFetch<boolean>(`/api/commerce/cart/${id}`, { method: "DELETE" }),
  createTransaction:   (body: Omit<Transaction, "id">) => apiFetch<Transaction>("/api/commerce/transactions", { method: "POST", body: JSON.stringify(body) }),
  getTransaction:      (id: string) => apiFetch<Transaction>(`/api/commerce/transactions/${id}`),
};
