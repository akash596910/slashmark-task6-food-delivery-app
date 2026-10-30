const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Mock Database for Restaurants & Menus
const restaurants = [
  {
    id: 1,
    name: "Biryani Junction",
    cuisine: "South Indian, Biryani",
    rating: 4.6,
    deliveryTime: "30-35 mins",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&q=80",
    menu: [
      { id: 101, name: "Hyderabadi Chicken Dum Biryani", price: 280 },
      { id: 102, name: "Paneer Butter Masala", price: 210 },
      { id: 103, name: "Butter Naan (2 pcs)", price: 60 }
    ]
  },
  {
    id: 2,
    name: "Pizza Crust & Co.",
    cuisine: "Italian, Fast Food",
    rating: 4.4,
    deliveryTime: "25-30 mins",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80",
    menu: [
      { id: 201, name: "Farmhouse Cheese Pizza", price: 349 },
      { id: 202, name: "Garlic Breadsticks", price: 139 },
      { id: 203, name: "Choco Lava Cake", price: 99 }
    ]
  },
  {
    id: 3,
    name: "Urban Burger Lab",
    cuisine: "American, Burgers",
    rating: 4.5,
    deliveryTime: "20-25 mins",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
    menu: [
      { id: 301, name: "Double Patty Crispy Burger", price: 199 },
      { id: 302, name: "Peri Peri French Fries", price: 119 },
      { id: 303, name: "Thick Cold Coffee", price: 89 }
    ]
  }
];

// In-Memory Order Storage
const orders = [];

// API: Get All Restaurants
app.get('/api/restaurants', (req, res) => {
  res.json(restaurants);
});

// API: Place Order
app.post('/api/orders', (req, res) => {
  const { customerName, address, items, totalAmount } = req.body;
  if (!customerName || !items || items.length === 0) {
    return res.status(400).json({ error: "Invalid order data" });
  }

  const newOrder = {
    orderId: "SM-" + Math.floor(100000 + Math.random() * 900000),
    customerName,
    address,
    items,
    totalAmount,
    status: "Confirmed",
    timestamp: new Date().toISOString()
  };

  orders.push(newOrder);
  res.status(201).json({ success: true, order: newOrder });
});

app.listen(PORT, () => {
  console.log(`Food Delivery Server running on http://localhost:${PORT}`);
});
