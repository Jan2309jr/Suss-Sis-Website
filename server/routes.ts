import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { companyConfig } from "./company-config";
import * as crypto from "crypto";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Set up authentication first
  setupAuth(app);

  // Menu Routes
  app.get(api.menu.list.path, async (req, res) => {
    const category = req.query.category as string | undefined;
    const items = await storage.getMenuItems(category);
    res.json(items);
  });

  app.post(api.menu.create.path, async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== 'admin') {
      return res.status(401).send("Unauthorized");
    }
    const input = api.menu.create.input.parse(req.body);
    const item = await storage.createMenuItem(input);
    res.status(201).json(item);
  });

  app.put(api.menu.update.path, async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== 'admin') {
      return res.status(401).send("Unauthorized");
    }
    const input = api.menu.update.input.parse(req.body);
    const item = await storage.updateMenuItem(Number(req.params.id), input);
    res.json(item);
  });

  app.delete(api.menu.delete.path, async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== 'admin') {
      return res.status(401).send("Unauthorized");
    }
    await storage.deleteMenuItem(Number(req.params.id));
    res.status(204).send();
  });

  // Order Routes
  app.post(api.orders.create.path, async (req, res) => {
    const input = api.orders.create.input.parse(req.body);
    // Force user ID if authenticated
    if (req.isAuthenticated()) {
      input.userId = req.user.id;
    }
    const order = await storage.createOrder(input);
    res.status(201).json(order);
  });

  app.get(api.orders.list.path, async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== 'admin') {
      return res.status(401).send("Unauthorized");
    }
    const orders = await storage.getOrders();
    res.json(orders);
  });

  app.patch(api.orders.updateStatus.path, async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== 'admin') {
      return res.status(401).send("Unauthorized");
    }
    const { status } = api.orders.updateStatus.input.parse(req.body);
    const order = await storage.updateOrderStatus(Number(req.params.id), status);
    res.json(order);
  });

  // Inquiry Routes
  app.post(api.inquiries.create.path, async (req, res) => {
    const input = api.inquiries.create.input.parse(req.body);
    const inquiry = await storage.createInquiry(input);
    res.status(201).json(inquiry);
  });

  // Company Info Routes
  app.get("/api/company", (req, res) => {
    res.json(companyConfig);
  });

  app.post("/api/company/update", (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== 'admin') {
      return res.status(401).send("Unauthorized");
    }
    
    const { address, phone, email, hours } = req.body;
    
    // Update the in-memory config
    if (address) companyConfig.address = address;
    if (phone) companyConfig.phone = phone;
    if (email) companyConfig.email = email;
    if (hours) companyConfig.hours = { ...companyConfig.hours, ...hours };
    
    res.json(companyConfig);
  });

  await seedDatabase();

  return httpServer;
}

// Seed function to add initial data - uses actual menu from PDF
export async function seedDatabase() {
  // Create admin user if doesn't exist
  const admin = await storage.getUserByUsername("admin");
  if (!admin) {
    const hashedPassword = crypto.pbkdf2Sync("admin123", "salt", 1000, 64, "sha512").toString("hex");
    await storage.createUser({ username: "admin", password: hashedPassword, role: "admin" });
  }

  const existing = await storage.getMenuItems();
  // Seed if empty OR update with fresh data
  if (existing.length > 0) return; // Keep existing if already seeded properly
  if (existing.length === 0) {
    const items = [
      // APPETIZERS
      { name: "Nachos with Salsa & Cheese Dip", price: "130", category: "Appetizers", description: "Crispy nachos with salsa and cheese", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1599599810694-b5ac4dd37e4b?w=800" },
      { name: "Nachos with Minced Spiced Chicken & Cheese Dip", price: "160", category: "Appetizers", description: "Crispy nachos with spiced chicken", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1599599810694-b5ac4dd37e4b?w=800" },
      { name: "French Fries (Classic)", price: "65", category: "Appetizers", description: "Crispy classic fries", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1618164436241-4473940571db?w=800" },
      { name: "French Fries (Peri Peri)", price: "85", category: "Appetizers", description: "Spicy peri peri fries", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1618164436241-4473940571db?w=800" },
      { name: "French Fries (Cheesy)", price: "105", category: "Appetizers", description: "Fries loaded with cheese", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1618164436241-4473940571db?w=800" },
      { name: "Chilli Cheese Garlic Bread", price: "130", category: "Appetizers", description: "Toasted bread with chili, cheese and garlic", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1573937557127-0a8d2b4fdb95?w=800" },
      { name: "Pull Apart Garlic Bread", price: "80", category: "Appetizers", description: "Soft buttery layers with garlic", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1573937557127-0a8d2b4fdb95?w=800" },
      { name: "Cheese Balls (6pc)", price: "110", category: "Appetizers", description: "Crispy fried balls with melted cheese", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1585238341710-4abb9fd3602c?w=800" },
      { name: "Honey Chilli Potato", price: "180", category: "Appetizers", description: "Crispy potatoes in sweet and spicy sauce", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800" },
      { name: "Chicken Nuggets (6pc)", price: "130", category: "Appetizers", description: "Crispy, golden bites of chicken", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1562547256-0-0?w=800" },

      // MAIN COURSE - OMELETTES
      { name: "Classic Masala Omelette", price: "70", category: "Main Course", description: "Served with 2 bread toast", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1585521537190-6a86c3f3b237?w=800" },
      { name: "Cheese Masala Omelette", price: "90", category: "Main Course", description: "Served with 2 bread toast", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1585521537190-6a86c3f3b237?w=800" },
      { name: "Spanish Omelette", price: "120", category: "Main Course", description: "Served with 2 bread toast", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1585521537190-6a86c3f3b237?w=800" },
      { name: "Veggie Loaded Omelette", price: "100", category: "Main Course", description: "Served with 2 bread toast", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1585521537190-6a86c3f3b237?w=800" },
      { name: "Masala Omelette Sandwich", price: "80", category: "Main Course", description: "Omelette sandwich with bread", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800" },

      // BURGERS
      { name: "Veg Fiesta Burger", price: "150", category: "Burgers", description: "Loaded veggie burger", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800" },
      { name: "Egg-cellent Burger", price: "180", category: "Burgers", description: "Burger with egg patty", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800" },
      { name: "Paneer Bliss Burger", price: "200", category: "Burgers", description: "Burger with paneer", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800" },
      { name: "Spicy Chicken Burger", price: "210", category: "Burgers", description: "Burger with spiced chicken", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800" },

      // SANDWICHES
      { name: "Paneer Tikka Sandwich", price: "180", category: "Main Course", description: "Grilled sandwich with paneer", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800" },
      { name: "Chicken Tikka Sandwich", price: "180", category: "Main Course", description: "Grilled sandwich with chicken", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800" },

      // PASTA
      { name: "Alfredo Pasta (Veg)", price: "200", category: "Pasta", description: "Creamy white sauce pasta", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1626844131082-256783844137?w=800" },
      { name: "Alfredo Pasta (Chicken)", price: "250", category: "Pasta", description: "Creamy white sauce pasta with chicken", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1626844131082-256783844137?w=800" },
      { name: "Mac & Cheese", price: "200", category: "Pasta", description: "Creamy, cheesy pasta made to perfection", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800" },
      { name: "Arrabita Pasta (Veg)", price: "200", category: "Pasta", description: "Spicy tomato pasta", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1626844131082-256783844137?w=800" },
      { name: "Arrabita Pasta (Chicken)", price: "250", category: "Pasta", description: "Spicy tomato pasta with chicken", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1626844131082-256783844137?w=800" },

      // PIZZA
      { name: "Margarita Pizza", price: "110", category: "Pizza", description: "Classic margarita", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800" },
      { name: "Corn and Cheese Pizza", price: "110", category: "Pizza", description: "Corn and cheese topping", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800" },
      { name: "Veggie Supreme Pizza", price: "120", category: "Pizza", description: "Onion, bell-pepper, zucchini, tomato", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800" },
      { name: "Farm-House Pizza", price: "130", category: "Pizza", description: "Onion, bell-pepper, broccoli, olives", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800" },
      { name: "Tandoori Paneer Pizza", price: "140", category: "Pizza", description: "Tandoori paneer toppings", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800" },
      { name: "Tandoori Chicken Pizza", price: "150", category: "Pizza", description: "Tandoori chicken toppings", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800" },
      { name: "Chicken Pepperoni Pizza", price: "150", category: "Pizza", description: "Chicken pepperoni", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800" },

      // SALADS
      { name: "Vibrant Veggie Bowl", price: "150", category: "Salads", description: "Fresh vegetable salad", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800" },
      { name: "Egg-cellent Salad", price: "180", category: "Salads", description: "Salad with egg", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800" },
      { name: "Roasted Chicken Toss Salad", price: "200", category: "Salads", description: "Roasted chicken with vegetables", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800" },

      // RICE BOWLS
      { name: "Veg Fried Rice", price: "150", category: "Rice Bowls", description: "Vegetable fried rice", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1609501676725-7186f017a4b2?w=800" },
      { name: "Egg Fried Rice", price: "180", category: "Rice Bowls", description: "Fried rice with egg", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1609501676725-7186f017a4b2?w=800" },
      { name: "Chicken Fried Rice", price: "200", category: "Rice Bowls", description: "Fried rice with chicken", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1609501676725-7186f017a4b2?w=800" },
      { name: "Chilli Paneer & Veg Rice", price: "250", category: "Rice Bowls", description: "Spiced paneer with rice", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1609501676725-7186f017a4b2?w=800" },
      { name: "Chilli Chicken & Veg Rice", price: "250", category: "Rice Bowls", description: "Spiced chicken with rice", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1609501676725-7186f017a4b2?w=800" },

      // CAKES
      { name: "Pineapple Cake (Pastry)", price: "70", category: "Cakes", description: "Fresh pineapple cake", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=800" },
      { name: "Pineapple Cake (500g)", price: "450", category: "Cakes", description: "Fresh pineapple cake 500g", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=800" },
      { name: "Pineapple Cake (1kg)", price: "900", category: "Cakes", description: "Fresh pineapple cake 1kg", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=800" },
      { name: "White Forest (Pastry)", price: "70", category: "Cakes", description: "Classic white forest", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?w=800" },
      { name: "White Forest (500g)", price: "450", category: "Cakes", description: "Classic white forest 500g", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?w=800" },
      { name: "White Forest (1kg)", price: "900", category: "Cakes", description: "Classic white forest 1kg", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?w=800" },
      { name: "Black Forest (Pastry)", price: "70", category: "Cakes", description: "Rich black forest cake", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800" },
      { name: "Black Forest (500g)", price: "450", category: "Cakes", description: "Rich black forest 500g", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800" },
      { name: "Black Forest (1kg)", price: "900", category: "Cakes", description: "Rich black forest 1kg", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800" },
      { name: "Death By Chocolate (Pastry)", price: "80", category: "Cakes", description: "Ultimate chocolate cake", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800" },
      { name: "Death By Chocolate (500g)", price: "500", category: "Cakes", description: "Ultimate chocolate 500g", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800" },
      { name: "Death By Chocolate (1kg)", price: "1000", category: "Cakes", description: "Ultimate chocolate 1kg", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800" },
      { name: "Butterscotch (Pastry)", price: "80", category: "Cakes", description: "Butterscotch cake", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=800" },
      { name: "Butterscotch (500g)", price: "550", category: "Cakes", description: "Butterscotch 500g", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=800" },
      { name: "Butterscotch (1kg)", price: "1100", category: "Cakes", description: "Butterscotch 1kg", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=800" },
      { name: "Chocolate Truffle (Pastry)", price: "80", category: "Cakes", description: "Chocolate truffle cake", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800" },
      { name: "Chocolate Truffle (500g)", price: "550", category: "Cakes", description: "Chocolate truffle 500g", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800" },
      { name: "Chocolate Truffle (1kg)", price: "1100", category: "Cakes", description: "Chocolate truffle 1kg", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800" },
      { name: "Red Velvet (Pastry)", price: "80", category: "Cakes", description: "Red velvet cake", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800" },
      { name: "Red Velvet (500g)", price: "550", category: "Cakes", description: "Red velvet 500g", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800" },
      { name: "Red Velvet (1kg)", price: "1100", category: "Cakes", description: "Red velvet 1kg", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800" },

      // DECADENT CAKES
      { name: "Blueberry (500g)", price: "550", category: "Decadent Cakes", description: "Blueberry cake 500g", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800" },
      { name: "Blueberry (1kg)", price: "1100", category: "Decadent Cakes", description: "Blueberry cake 1kg", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800" },
      { name: "Biscoff Chocolate (500g)", price: "600", category: "Decadent Cakes", description: "Biscoff chocolate 500g", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800" },
      { name: "Biscoff Chocolate (1kg)", price: "1200", category: "Decadent Cakes", description: "Biscoff chocolate 1kg", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800" },
      { name: "Hazelnut Chocolate (500g)", price: "600", category: "Decadent Cakes", description: "Hazelnut chocolate 500g", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800" },
      { name: "Hazelnut Chocolate (1kg)", price: "1200", category: "Decadent Cakes", description: "Hazelnut chocolate 1kg", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800" },
      { name: "Mocha Chocolate (500g)", price: "550", category: "Decadent Cakes", description: "Mocha chocolate 500g", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800" },
      { name: "Mocha Chocolate (1kg)", price: "1100", category: "Decadent Cakes", description: "Mocha chocolate 1kg", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800" },
      { name: "Kit-kat (500g)", price: "600", category: "Decadent Cakes", description: "Kit-kat cake 500g", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800" },
      { name: "Kit-kat (1kg)", price: "1200", category: "Decadent Cakes", description: "Kit-kat cake 1kg", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800" },
      { name: "Ferrero Rocher (500g)", price: "650", category: "Decadent Cakes", description: "Ferrero Rocher cake 500g", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800" },
      { name: "Ferrero Rocher (1kg)", price: "1250", category: "Decadent Cakes", description: "Ferrero Rocher cake 1kg", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800" },
      { name: "Rainbow (1kg)", price: "1450", category: "Decadent Cakes", description: "Rainbow cake 1kg", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800" },
      { name: "Brownie Cake (500g)", price: "900", category: "Decadent Cakes", description: "Brownie cake 500g", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800" },
      { name: "Brownie Cake (1kg)", price: "1800", category: "Decadent Cakes", description: "Brownie cake 1kg", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800" },

      // SWISS ROLLS
      { name: "Blueberry Vanilla Bliss", price: "60", category: "Pastries", description: "Blueberry vanilla swiss roll", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1587381606696-7a96eeee8d9a?w=800" },
      { name: "Raspberry Chocolate Delight", price: "60", category: "Pastries", description: "Raspberry chocolate swiss roll", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1587381606696-7a96eeee8d9a?w=800" },
      { name: "Cinnamon Roll with Cream-Cheese Frosting", price: "50", category: "Pastries", description: "Cinnamon roll with cream cheese", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1587381606696-7a96eeee8d9a?w=800" },

      // BROWNIES
      { name: "Choco Fudge Brownie", price: "100", category: "Pastries", description: "Chocolate fudge brownie", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800" },
      { name: "Choco Walnut Brownie", price: "110", category: "Pastries", description: "Chocolate walnut brownie", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800" },
      { name: "Choco Nutella Brownie", price: "130", category: "Pastries", description: "Chocolate nutella brownie", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800" },
      { name: "Choco Biscoff Brownie", price: "130", category: "Pastries", description: "Chocolate biscoff brownie", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800" },
      { name: "Sizzling Brownie & Icecream", price: "180", category: "Pastries", description: "Warm brownie with ice cream", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800" },

      // CHEESECAKE
      { name: "Oreo Cheesecake (Slice)", price: "150", category: "Pastries", description: "Oreo cheesecake slice", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1606312519591-b06dc57bcfbb?w=800" },
      { name: "Oreo Cheesecake (500g)", price: "750", category: "Pastries", description: "Oreo cheesecake 500g", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1606312519591-b06dc57bcfbb?w=800" },
      { name: "Oreo Cheesecake (1kg)", price: "1450", category: "Pastries", description: "Oreo cheesecake 1kg", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1606312519591-b06dc57bcfbb?w=800" },
      { name: "Blueberry Cheesecake (Slice)", price: "160", category: "Pastries", description: "Blueberry cheesecake slice", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1606312519591-b06dc57bcfbb?w=800" },
      { name: "Blueberry Cheesecake (500g)", price: "750", category: "Pastries", description: "Blueberry cheesecake 500g", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1606312519591-b06dc57bcfbb?w=800" },
      { name: "Blueberry Cheesecake (1kg)", price: "1450", category: "Pastries", description: "Blueberry cheesecake 1kg", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1606312519591-b06dc57bcfbb?w=800" },

      // JARS
      { name: "Red Velvet Jar", price: "180", category: "Pastries", description: "Red velvet in a jar", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800" },
      { name: "Death By Chocolate Jar", price: "150", category: "Pastries", description: "Chocolate in a jar", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800" },

      // DOUGHNUTS
      { name: "Dark Chocolate Doughnut", price: "65", category: "Pastries", description: "Dark chocolate doughnut", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1585330114519-10f60a49acde?w=800" },
      { name: "Milk Chocolate Doughnut", price: "65", category: "Pastries", description: "Milk chocolate doughnut", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1585330114519-10f60a49acde?w=800" },

      // TUBS
      { name: "Chocolate Mousse Tub", price: "65", category: "Pastries", description: "Chocolate mousse", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800" },
      { name: "Tiramasu Tub", price: "180", category: "Pastries", description: "Tiramasu", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800" },
      { name: "Ras Malai Tub", price: "150", category: "Pastries", description: "Ras Malai", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800" },
      { name: "Tres Leches Tub", price: "150", category: "Pastries", description: "Tres Leches", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800" },

      // PUFFS
      { name: "Veg Puff", price: "30", category: "Pastries", description: "Vegetable puff", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1585330114519-10f60a49acde?w=800" },
      { name: "Paneer Puff", price: "65", category: "Pastries", description: "Paneer puff", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1585330114519-10f60a49acde?w=800" },
      { name: "Egg Puff", price: "35", category: "Pastries", description: "Egg puff", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1585330114519-10f60a49acde?w=800" },
      { name: "Chicken Puff", price: "80", category: "Pastries", description: "Chicken puff", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1585330114519-10f60a49acde?w=800" },
      { name: "Pizza Puff", price: "60", category: "Pastries", description: "Pizza puff", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1585330114519-10f60a49acde?w=800" },

      // CUPCAKES
      { name: "Strawberry Cupcake", price: "60", category: "Pastries", description: "Strawberry cupcake", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1587381606696-7a96eeee8d9a?w=800" },
      { name: "Rainbow Cupcake", price: "60", category: "Pastries", description: "Rainbow cupcake", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1587381606696-7a96eeee8d9a?w=800" },
      { name: "Salted Caramel Cupcake", price: "60", category: "Pastries", description: "Salted caramel cupcake", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1587381606696-7a96eeee8d9a?w=800" },
      { name: "Hazelnut Cupcake", price: "80", category: "Pastries", description: "Hazelnut cupcake", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1587381606696-7a96eeee8d9a?w=800" },
      { name: "Red Velvet Cupcake", price: "80", category: "Pastries", description: "Red velvet cupcake", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1587381606696-7a96eeee8d9a?w=800" },

      // MUFFINS
      { name: "Walnut Banana Muffin", price: "60", category: "Pastries", description: "Walnut banana muffin", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800" },
      { name: "Blueberry Muffin", price: "60", category: "Pastries", description: "Blueberry muffin", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800" },
      { name: "Chocochips Muffin", price: "60", category: "Pastries", description: "Chocolate chips muffin", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800" },

      // KIDS MENU
      { name: "Hot Cross Buns", price: "60", category: "Kids Menu", description: "Korean buns", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1586985289688-cacb595b86a1?w=800" },
      { name: "Chocolava", price: "80", category: "Kids Menu", description: "Chocolate lava", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800" },
      { name: "Cream Roll (Vanilla)", price: "25", category: "Kids Menu", description: "Vanilla cream roll", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1587381606696-7a96eeee8d9a?w=800" },
      { name: "Cream Roll (Chocolate)", price: "25", category: "Kids Menu", description: "Chocolate cream roll", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1587381606696-7a96eeee8d9a?w=800" },
      { name: "Cream Roll (Pineapple)", price: "25", category: "Kids Menu", description: "Pineapple cream roll", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1587381606696-7a96eeee8d9a?w=800" },

      // BREADS
      { name: "Milk Bread", price: "50", category: "Breads", description: "Soft milk bread", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1549931326-2cefb4fda9d5?w=800" },
      { name: "Brown Bread", price: "55", category: "Breads", description: "Healthy brown bread", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1549931326-2cefb4fda9d5?w=800" },
      { name: "Sandwich Bread", price: "55", category: "Breads", description: "Soft sandwich bread", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1549931326-2cefb4fda9d5?w=800" },
      { name: "Hot Dog Buns (Pack of 5)", price: "60", category: "Breads", description: "Pack of 5 hot dog buns", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1549931326-2cefb4fda9d5?w=800" },
      { name: "Burger Buns (Pack of 4)", price: "40", category: "Breads", description: "Pack of 4 burger buns", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1549931326-2cefb4fda9d5?w=800" },
      { name: "Garlic Bread Loaf", price: "125", category: "Breads", description: "Garlic bread loaf 250g", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1573937557127-0a8d2b4fdb95?w=800" },
      { name: "Vegan Bread", price: "60", category: "Breads", description: "100% vegan bread", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1549931326-2cefb4fda9d5?w=800" },
      { name: "Pav (Pack of 6)", price: "40", category: "Breads", description: "Pack of 6 pav", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1549931326-2cefb4fda9d5?w=800" },
      { name: "Masala Buns (Pack of 4)", price: "40", category: "Breads", description: "Pack of 4 masala buns", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1549931326-2cefb4fda9d5?w=800" },
      { name: "Milk Buns (Pack of 4)", price: "40", category: "Breads", description: "Pack of 4 milk buns", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1549931326-2cefb4fda9d5?w=800" },
      { name: "Focaccia Bread", price: "50", category: "Breads", description: "Focaccia bread 125g", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1549931326-2cefb4fda9d5?w=800" },
      { name: "Garlic Toast", price: "80", category: "Breads", description: "Garlic toast 100g", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1573937557127-0a8d2b4fdb95?w=800" },

      // COOKIES
      { name: "Chocolate Chip Cookies", price: "100", category: "Breads", description: "Chocolate chip cookies 100g", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1585518419759-e21b92f5f3d0?w=800" },
      { name: "Butter Cookies", price: "80", category: "Breads", description: "Butter cookies 100g", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1585518419759-e21b92f5f3d0?w=800" },
      { name: "Jam Drop Cookies", price: "80", category: "Breads", description: "Jam drop cookies 100g", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1585518419759-e21b92f5f3d0?w=800" },
      { name: "Coconut Cookies", price: "80", category: "Breads", description: "Coconut cookies 100g", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1585518419759-e21b92f5f3d0?w=800" },
      { name: "Masala Cookies", price: "80", category: "Breads", description: "Masala cookies 100g", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1585518419759-e21b92f5f3d0?w=800" },

      // BEVERAGES
      { name: "Virgin Mojito", price: "150", category: "Beverages", description: "Refreshing mint mojito", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800" },
      { name: "Oreo Milkshake", price: "180", category: "Beverages", description: "Oreo milkshake", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1553530666-ba2a8e36cd14?w=800" },
      { name: "Strawberry Milk Shake", price: "180", category: "Beverages", description: "Fresh strawberry shake", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1553530666-ba2a8e36cd14?w=800" },
      { name: "Classic Cold Coffee", price: "180", category: "Beverages", description: "Classic cold coffee", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?w=800" },
      { name: "Mocha Cold Coffee", price: "180", category: "Beverages", description: "Mocha cold coffee", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?w=800" },
      { name: "Fresh Lime Soda", price: "100", category: "Beverages", description: "Refreshing lime soda", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800" },
      { name: "Fresh Lime Juice", price: "100", category: "Beverages", description: "Fresh lime juice", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800" },
      { name: "Masala Tea", price: "50", category: "Beverages", description: "Hot masala tea", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1597318751221-d11a7c6b72b1?w=800" },
    ];

    for (const item of items) {
      // @ts-ignore - Decimal handling in seed
      await storage.createMenuItem(item);
    }
  }
}
