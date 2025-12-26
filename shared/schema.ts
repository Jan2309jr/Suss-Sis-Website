import { sqliteTable, text, integer, real, json } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(), // email or phone
  password: text("password").notNull(),
  role: text("role").default("customer").notNull(), // 'admin' or 'customer'
  name: text("name"),
  phone: text("phone"),
  address: text("address"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const menuItems = sqliteTable("menu_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  price: real("price").notNull(),
  category: text("category").notNull(), // Cakes, Pastries, Pasta, Pizza, etc.
  imageUrl: text("image_url"),
  isVeg: integer("is_veg", { mode: "boolean" }).default(true),
  available: integer("available", { mode: "boolean" }).default(true),
});

export const cakeDesigns = sqliteTable("cake_designs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  imageUrl: text("image_url").notNull(),
  basePrice: real("base_price").notNull(),
});

export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id"), // Can be null for guest checkout if we support it, but better to link
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  status: text("status").default("pending").notNull(), // pending, accepted, completed, cancelled
  totalAmount: real("total_amount").notNull(),
  items: text("items").notNull(), // Array of { itemId, quantity, name, price, customization }
  deliveryType: text("delivery_type").default("pickup"), // pickup, delivery
  deliveryAddress: text("delivery_address"),
  deliveryTime: integer("delivery_time", { mode: "timestamp" }),
  paymentStatus: text("payment_status").default("pending"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const galleryImages = sqliteTable("gallery_images", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title"),
  category: text("category").default("general"), // Inauguration, Events, Special Orders
  imageUrl: text("image_url").notNull(),
});

export const inquiries = sqliteTable("inquiries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// === SCHEMAS ===

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertMenuItemSchema = createInsertSchema(menuItems).omit({ id: true });
export const insertCakeDesignSchema = createInsertSchema(cakeDesigns).omit({ id: true });
export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true, status: true, paymentStatus: true });
export const insertGalleryImageSchema = createInsertSchema(galleryImages).omit({ id: true });
export const insertInquirySchema = createInsertSchema(inquiries).omit({ id: true, createdAt: true });

// === TYPES ===

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type MenuItem = typeof menuItems.$inferSelect;
export type InsertMenuItem = z.infer<typeof insertMenuItemSchema>;

export type CakeDesign = typeof cakeDesigns.$inferSelect;
export type InsertCakeDesign = z.infer<typeof insertCakeDesignSchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;

export type GalleryImage = typeof galleryImages.$inferSelect;
export type InsertGalleryImage = z.infer<typeof insertGalleryImageSchema>;

export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
