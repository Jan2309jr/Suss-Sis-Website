import { z } from 'zod';
import { 
  insertUserSchema, 
  insertMenuItemSchema, 
  insertCakeDesignSchema, 
  insertOrderSchema, 
  insertGalleryImageSchema,
  insertInquirySchema,
  users, menuItems, cakeDesigns, orders, galleryImages, inquiries 
} from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  auth: {
    login: {
      method: 'POST' as const,
      path: '/api/login',
      input: z.object({ username: z.string(), password: z.string() }),
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: errorSchemas.validation,
      }
    },
    logout: {
      method: 'POST' as const,
      path: '/api/logout',
      responses: { 200: z.void() }
    },
    register: {
      method: 'POST' as const,
      path: '/api/register',
      input: insertUserSchema,
      responses: {
        201: z.custom<typeof users.$inferSelect>(),
        400: errorSchemas.validation,
      }
    },
    me: {
      method: 'GET' as const,
      path: '/api/user',
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: z.null(),
      }
    }
  },
  menu: {
    list: {
      method: 'GET' as const,
      path: '/api/menu',
      input: z.object({ category: z.string().optional() }).optional(),
      responses: { 200: z.array(z.custom<typeof menuItems.$inferSelect>()) }
    },
    create: {
      method: 'POST' as const,
      path: '/api/menu',
      input: insertMenuItemSchema,
      responses: { 201: z.custom<typeof menuItems.$inferSelect>() }
    },
    update: {
      method: 'PUT' as const,
      path: '/api/menu/:id',
      input: insertMenuItemSchema.partial(),
      responses: { 200: z.custom<typeof menuItems.$inferSelect>() }
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/menu/:id',
      responses: { 204: z.void() }
    }
  },
  orders: {
    create: {
      method: 'POST' as const,
      path: '/api/orders',
      input: insertOrderSchema,
      responses: { 201: z.custom<typeof orders.$inferSelect>() }
    },
    list: {
      method: 'GET' as const,
      path: '/api/orders',
      responses: { 200: z.array(z.custom<typeof orders.$inferSelect>()) }
    },
    updateStatus: {
      method: 'PATCH' as const,
      path: '/api/orders/:id/status',
      input: z.object({ status: z.string() }),
      responses: { 200: z.custom<typeof orders.$inferSelect>() }
    }
  },
  inquiries: {
    create: {
      method: 'POST' as const,
      path: '/api/inquiries',
      input: insertInquirySchema,
      responses: { 201: z.custom<typeof inquiries.$inferSelect>() }
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
