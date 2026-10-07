export const DUMMY_RESTAURANT = {
  id: "rest-1",
  name: "Kathmandu Kitchen",
  slug: "kathmandu-kitchen",
  branchName: "Thamel",
};

export const DUMMY_MENU_CATEGORIES = [
  { id: "cat-1", name: "Momo" },
  { id: "cat-2", name: "Chowmein" },
  { id: "cat-3", name: "Beverages" },
];

export const DUMMY_MENU_ITEMS = [
  { id: "item-1", categoryId: "cat-1", name: "Steam Buff Momo", price: 200, description: "Authentic local buff momo with spicy achar", image: "https://images.unsplash.com/photo-1626804475297-4160aae01df2?auto=format&fit=crop&w=300&h=300" },
  { id: "item-2", categoryId: "cat-1", name: "Chicken C Momos", price: 250, description: "Spicy chilli chicken momos", image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=300&h=300" },
  { id: "item-3", categoryId: "cat-2", name: "Veg Chowmein", price: 150, description: "Stir fried noodles with fresh vegetables" },
  { id: "item-4", categoryId: "cat-2", name: "Mixed Chowmein", price: 280, description: "Chicken, buff, and egg chowmein mix" },
  { id: "item-5", categoryId: "cat-3", name: "Coke", price: 80, description: "500ml bottle" },
];

export const DUMMY_ORDERS = [
  {
    id: "order-1",
    tableId: "t-1",
    status: "PENDING",
    items: [
      { id: "oi-1", name: "Steam Buff Momo", quantity: 2, price: 200 },
      { id: "oi-2", name: "Coke", quantity: 2, price: 80 },
    ],
    total: 560,
    time: "10:30 AM",
  },
  {
    id: "order-2",
    tableId: "t-3",
    status: "PREPARING",
    items: [
      { id: "oi-3", name: "Mixed Chowmein", quantity: 1, price: 280 },
    ],
    total: 280,
    time: "10:25 AM",
  },
];

export const DUMMY_TABLES = [
  { id: "t-1", name: "Table 1", status: "OCCUPIED" },
  { id: "t-2", name: "Table 2", status: "AVAILABLE" },
  { id: "t-3", name: "Table 3", status: "OCCUPIED" },
  { id: "t-4", name: "Table 4", status: "CLEANING" },
];

export const DUMMY_WAITER_REQUESTS = [
  { id: "req-1", tableId: "t-1", status: "OPEN", type: "Water", time: "2 min ago" },
  { id: "req-2", tableId: "t-3", status: "OPEN", type: "Bill", time: "5 min ago" },
];
