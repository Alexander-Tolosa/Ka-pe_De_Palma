import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- MOCK SEED DATA FOR OFFLINE MODE ---
const defaultMenu = [
  // --- COFFEE (CAFFEINE) ---
  { id: 1, name: 'Palm Breeze Americano (Hot 8oz)', description: 'Our classic rich double espresso topped with hot water, smooth and bold.', price: 105.00, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 2, name: 'Palm Breeze Americano (Iced 16oz)', description: 'Double espresso over ice with chilled water, clean and refreshing.', price: 115.00, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 3, name: 'Lagoon Latte (Hot 8oz)', description: 'Rich espresso balanced with steamed milk and a thin layer of velvety foam.', price: 115.00, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 4, name: 'Lagoon Latte (Iced 16oz)', description: 'Smooth espresso combined with fresh cold milk and ice.', price: 135.00, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 5, name: 'Spanish Del Sol (Hot 8oz)', description: 'Creamy spanish latte featuring a blend of sweetened condensed milk, bold espresso, and textured hot milk.', price: 115.00, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 6, name: 'Spanish Del Sol (Iced 16oz)', description: 'Creamy iced spanish latte with sweet condensed milk, fresh milk, and rich espresso.', price: 180.00, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 7, name: 'Caramel Canopy (Hot 8oz)', description: 'Espresso combined with sweet caramel syrup and warm velvety steamed milk.', price: 115.00, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 8, name: 'Caramel Canopy (Iced 16oz)', description: 'Iced espresso mixed with rich caramel syrup and cold fresh milk.', price: 185.00, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 9, name: 'Salted Caramel Drift (Hot 8oz)', description: 'Perfect balance of sweet caramel and savory sea salt combined with premium espresso and steamed milk.', price: 115.00, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 10, name: 'Salted Caramel Drift (Iced 16oz)', description: 'Delicious cold brew or espresso blended with fresh milk, rich caramel, and a hint of sea salt over ice.', price: 185.00, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 11, name: 'Cacao Mocha (Hot 8oz)', description: 'Rich espresso fused with premium cocoa chocolate and steamed milk, topped with a dusting of cocoa.', price: 115.00, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 12, name: 'Cacao Mocha (Iced 16oz)', description: 'Rich chocolate, bold espresso, and cold milk poured over ice.', price: 175.00, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 13, name: 'French Vanilla Horizon (Hot 8oz)', description: 'Smooth, fragrant vanilla syrup blended with double shot espresso and hot textured milk.', price: 115.00, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 14, name: 'French Vanilla Horizon (Iced 16oz)', description: 'Chilled espresso combined with premium vanilla syrup, fresh milk, and ice.', price: 175.00, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 15, name: 'Amber Biscoff (Iced 16oz)', description: 'Signature iced latte infused with sweet Lotus Biscoff cookie butter spread and topped with biscuit crumbs.', price: 205.00, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 16, name: 'Matcha Oat Latte', description: 'Premium stone-ground Uji matcha whisked with healthy, creamy oat milk (sweetened or unsweetened).', price: 185.00, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 17, name: 'Matcha Oat Espresso', description: 'Unique layered fusion of bold espresso, premium stone-ground matcha, and creamy oat milk.', price: 205.00, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 18, name: 'Hot Chocolate (8oz)', description: 'Rich, indulgent dark chocolate blend with steamed milk.', price: 115.00, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 19, name: 'Iced Chocolate (16oz)', description: 'Rich, sweet chocolate blended with fresh cold milk, served over ice.', price: 135.00, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=500&q=80', available: true },

  // --- REFRESHERS (YAKULT SERIES) ---
  { id: 20, name: 'Mango Grove Yakult (16oz)', description: 'Tropical mango puree mixed with refreshing sweet Yakult and cold water.', price: 115.00, category: 'Refreshers', imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 21, name: 'Mango Grove Yakult (22oz)', description: 'Large tropical mango puree mixed with refreshing sweet Yakult and cold water.', price: 125.00, category: 'Refreshers', imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 22, name: 'Strawberry Bliss Yakult (16oz)', description: 'Sweet strawberry puree blended with tangy Yakult and ice.', price: 115.00, category: 'Refreshers', imageUrl: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 23, name: 'Strawberry Bliss Yakult (22oz)', description: 'Large sweet strawberry puree blended with tangy Yakult and ice.', price: 125.00, category: 'Refreshers', imageUrl: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 24, name: 'Blueberry Lagoon Yakult (16oz)', description: 'A delightful blue-themed drink featuring juicy blueberry fruit blend and fresh Yakult.', price: 115.00, category: 'Refreshers', imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 25, name: 'Blueberry Lagoon Yakult (22oz)', description: 'Large delightful blue-themed drink featuring juicy blueberry fruit blend and fresh Yakult.', price: 125.00, category: 'Refreshers', imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=80', available: true },

  // --- FRAPPES ---
  { id: 26, name: 'Matcha Frost Frappe (16oz)', description: 'Blended beverage with Uji matcha, fresh milk, and sweet whipped cream.', price: 185.00, category: 'Refreshers', imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 27, name: 'Matcha Frost Frappe (22oz)', description: 'Large blended beverage with Uji matcha, fresh milk, and sweet whipped cream.', price: 195.00, category: 'Refreshers', imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 28, name: 'Crumble and Cream Frappe (16oz)', description: 'Dreamy vanilla cream frappe loaded with cookie crumbles and whipped cream.', price: 195.00, category: 'Refreshers', imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 29, name: 'Crumble and Cream Frappe (22oz)', description: 'Large dreamy vanilla cream frappe loaded with cookie crumbles and whipped cream.', price: 205.00, category: 'Refreshers', imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 30, name: 'Coffee Caramel Frappe (16oz)', description: 'Rich coffee blend frappe with sweet caramel sauce and whipped cream.', price: 185.00, category: 'Refreshers', imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 31, name: 'Coffee Caramel Frappe (22oz)', description: 'Large rich coffee blend frappe with sweet caramel sauce and whipped cream.', price: 195.00, category: 'Refreshers', imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 32, name: 'Vanilla Frost Frappe (16oz)', description: 'Creamy, sweet vanilla bean blended frappe topped with whipped cream.', price: 195.00, category: 'Refreshers', imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 33, name: 'Vanilla Frost Frappe (22oz)', description: 'Large creamy, sweet vanilla bean blended frappe topped with whipped cream.', price: 205.00, category: 'Refreshers', imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 34, name: 'Red Velvet Frappe (16oz)', description: 'Decadent red velvet flavor blended with milk and topped with rich whipped cream.', price: 195.00, category: 'Refreshers', imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 35, name: 'Red Velvet Frappe (22oz)', description: 'Large decadent red velvet flavor blended with milk and topped with rich whipped cream.', price: 205.00, category: 'Refreshers', imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 36, name: 'Mocha Frappe (16oz)', description: 'Ice blended coffee with rich dark chocolate, fresh milk, and whipped cream.', price: 185.00, category: 'Refreshers', imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 37, name: 'Mocha Frappe (22oz)', description: 'Large ice blended coffee with rich dark chocolate, fresh milk, and whipped cream.', price: 195.00, category: 'Refreshers', imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 38, name: 'White Chocolate Frappe (16oz)', description: 'Sweet white chocolate sauce blended with milk and ice, topped with whipped cream.', price: 185.00, category: 'Refreshers', imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 39, name: 'White Chocolate Frappe (22oz)', description: 'Large sweet white chocolate sauce blended with milk and ice, topped with whipped cream.', price: 195.00, category: 'Refreshers', imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=80', available: true },

  // --- FOOD (ISLA BITES, SNACKS, PASTA, BATCHOY, RICE MEALS) ---
  // Isla Bites
  { id: 40, name: 'Pork Isla Bites', description: 'Crispy deep-fried pork bites seasoned with local spices, perfect with dip.', price: 60.00, category: 'Food', imageUrl: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 41, name: 'Chicken Isla Bites', description: 'Tender bite-sized chicken pieces breaded and fried to a perfect golden crunch.', price: 60.00, category: 'Food', imageUrl: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 42, name: 'Tuna Plain Isla Bites', description: 'Crispy breaded bites with savory plain tuna filing.', price: 60.00, category: 'Food', imageUrl: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 43, name: 'Spicy Tuna Isla Bites', description: 'Crispy fried bites loaded with savory, spicy tuna filling.', price: 60.00, category: 'Food', imageUrl: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 44, name: 'Ham and Cheese Isla Bites', description: 'Toasted golden bites stuffed with ham and rich melted cheese.', price: 60.00, category: 'Food', imageUrl: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 45, name: 'Bacon and Cheese Isla Bites', description: 'Delicious golden pockets filled with smoky bacon and savory melted cheese.', price: 69.00, category: 'Food', imageUrl: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=500&q=80', available: true },

  // Snacks
  { id: 46, name: 'Chicken Crispy Fries Bites', description: 'A satisfying combination of crispy fries and seasoned chicken bites.', price: 209.00, category: 'Food', imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 47, name: 'Beef Burger with Fries', description: 'Juicy flame-grilled beef patty with fresh lettuce, tomatoes, and cheese on a toasted bun, served with fries.', price: 259.00, category: 'Food', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 48, name: 'Chicken Burger with Fries', description: 'Crispy breaded chicken fillet with savory sauce and lettuce in a soft bun, served with fries.', price: 249.00, category: 'Food', imageUrl: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 49, name: 'Fries', description: 'Generous basket of classic golden French fries, perfectly salted and crispy.', price: 120.00, category: 'Food', imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 50, name: 'Caramela Delight', description: 'Sweet, fluffy dessert pastry drizzled with a rich and warm caramel sauce.', price: 99.00, category: 'Food', imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 51, name: 'Nachos', description: 'Crispy corn tortilla chips topped with savory seasoned beef, warm cheese sauce, tomatoes, and jalapeños.', price: 309.00, category: 'Food', imageUrl: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=500&q=80', available: true },

  // Pasta
  { id: 52, name: 'Carbonara', description: 'Rich and creamy pasta tossed with crispy bacon bits, garlic, parmesan cheese, and parsley.', price: 179.00, category: 'Food', imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 53, name: 'Spaghetti', description: 'Sweet-style Filipino spaghetti topped with savory ground beef, sliced hotdogs, and shredded cheese.', price: 169.00, category: 'Food', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80', available: true },

  // Batchoy
  { id: 54, name: 'Special Batchoy', description: 'Traditional Iloilo noodle soup with pork cracklings (chicharon), pork offal, tender beef slices, and fresh egg noodles in a rich broth.', price: 150.00, category: 'Food', imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 55, name: 'Ordinary Batchoy', description: 'Savory pork noodle soup topped with fresh green onions and crushed garlic chicharon.', price: 130.00, category: 'Food', imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 56, name: 'Lomi', description: 'Thick egg noodles in a rich, viscous savory broth packed with pork slices, chicharon, and fresh vegetables.', price: 160.00, category: 'Food', imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80', available: true },

  // Rice Meals
  { id: 57, name: 'Tapa Rice Meal', description: 'Classic Filipino cured beef (tapa) served with savory garlic fried rice (sinangag) and a sunny-side up egg.', price: 189.00, category: 'Food', imageUrl: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 58, name: 'Tocino Rice Meal', description: 'Sweet cured pork (tocino) pan-fried to a caramelized finish, served with garlic rice and fried egg.', price: 179.00, category: 'Food', imageUrl: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 59, name: 'Longganisa Rice Meal', description: 'Local sweet and garlicky sausage links served with garlic fried rice and a sunny-side up egg.', price: 169.00, category: 'Food', imageUrl: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 60, name: 'Bacon Rice Meal', description: 'Crispy, smoky bacon strips served alongside garlic fried rice and a fresh fried egg.', price: 189.00, category: 'Food', imageUrl: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 61, name: 'Chicken Fillet Rice Meal', description: 'Crispy breaded chicken breast fillet served with a rich savory gravy, steamed rice, and egg.', price: 189.00, category: 'Food', imageUrl: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 62, name: 'Fish Fillet Rice Meal', description: 'Golden fried breaded fish fillet served with fresh tartar sauce, rice, and egg.', price: 169.00, category: 'Food', imageUrl: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 63, name: 'Pork Sisig Rice Meal', description: 'Sizzling chopped pork seasoned with calamansi, onions, and red chilies, served with rice and fried egg.', price: 169.00, category: 'Food', imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 64, name: 'Camaron Relleno Rice Meal', description: 'Filipino stuffed deep-fried shrimp served with sweet and sour dipping sauce, rice, and egg.', price: 209.00, category: 'Food', imageUrl: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=500&q=80', available: true },
  { id: 65, name: 'Spicy Chicken Pastil Rice Meal', description: 'Warm steamed rice topped with flavorful shredded spicy chicken pastil, served with boiled/fried egg.', price: 179.00, category: 'Food', imageUrl: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=500&q=80', available: true }
];

const defaultBookings = [
  { id: 1, customerName: 'Alice Johnson', customerEmail: 'alice.j@example.com', customerPhone: '+1 (555) 123-4567', bookingDate: new Date().toISOString().split('T')[0], timeSlot: 'Morning', guestCount: 4, totalPrice: 60.00, status: 'APPROVED' },
  { id: 2, customerName: 'Bob Smith', customerEmail: 'bob.smith@example.com', customerPhone: '+1 (555) 987-6543', bookingDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], timeSlot: 'Afternoon', guestCount: 2, totalPrice: 30.00, status: 'PENDING' },
  { id: 3, customerName: 'Charlie Brown', customerEmail: 'charlie@example.com', customerPhone: '+1 (555) 456-7890', bookingDate: new Date(Date.now() + 172800000).toISOString().split('T')[0], timeSlot: 'Evening', guestCount: 3, totalPrice: 45.00, status: 'CANCELLED' }
];

// Initialize LocalStorage if empty
const initializeLocalStorage = () => {
  if (!localStorage.getItem('kpd_menu_v2')) {
    localStorage.setItem('kpd_menu_v2', JSON.stringify(defaultMenu));
  }
  if (!localStorage.getItem('kpd_bookings')) {
    localStorage.setItem('kpd_bookings', JSON.stringify(defaultBookings));
  }
};
initializeLocalStorage();

// Helper to interact with Mock database
const mockDb = {
  getMenu: () => JSON.parse(localStorage.getItem('kpd_menu_v2')),
  setMenu: (menu) => localStorage.setItem('kpd_menu_v2', JSON.stringify(menu)),
  getBookings: () => JSON.parse(localStorage.getItem('kpd_bookings')),
  setBookings: (bookings) => localStorage.setItem('kpd_bookings', JSON.stringify(bookings)),
};

// Error logging handler to print API state
const handleApiError = (error, actionName) => {
  console.warn(`API call failed for [${actionName}]. Using local storage fallback.`, error.message);
};

// --- API SERVICES ---

export const getMenu = async () => {
  try {
    const response = await api.get('/menu');
    return response.data;
  } catch (error) {
    handleApiError(error, 'getMenu');
    return mockDb.getMenu();
  }
};

export const createMenuItem = async (menuItem) => {
  try {
    const response = await api.post('/menu', menuItem);
    return response.data;
  } catch (error) {
    handleApiError(error, 'createMenuItem');
    const menu = mockDb.getMenu();
    const newItem = { ...menuItem, id: Date.now(), available: true };
    menu.push(newItem);
    mockDb.setMenu(menu);
    return newItem;
  }
};

export const updateMenuItem = async (id, itemDetails) => {
  try {
    const response = await api.put(`/menu/${id}`, itemDetails);
    return response.data;
  } catch (error) {
    handleApiError(error, 'updateMenuItem');
    const menu = mockDb.getMenu();
    const index = menu.findIndex((item) => item.id === Number(id));
    if (index !== -1) {
      menu[index] = { ...menu[index], ...itemDetails };
      mockDb.setMenu(menu);
      return menu[index];
    }
    throw new Error('Menu item not found locally');
  }
};

export const deleteMenuItem = async (id) => {
  try {
    await api.delete(`/menu/${id}`);
    return true;
  } catch (error) {
    handleApiError(error, 'deleteMenuItem');
    const menu = mockDb.getMenu();
    const filtered = menu.filter((item) => item.id !== Number(id));
    mockDb.setMenu(filtered);
    return true;
  }
};

export const getBookings = async () => {
  try {
    const response = await api.get('/bookings');
    return response.data;
  } catch (error) {
    handleApiError(error, 'getBookings');
    return mockDb.getBookings();
  }
};

export const createBooking = async (booking) => {
  try {
    const response = await api.post('/bookings', booking);
    return response.data;
  } catch (error) {
    handleApiError(error, 'createBooking');
    const bookings = mockDb.getBookings();
    
    // Offline capacity check
    const activeCount = bookings.filter(
      (b) => b.bookingDate === booking.bookingDate && 
             b.timeSlot.toLowerCase() === booking.timeSlot.toLowerCase() && 
             b.status !== 'CANCELLED'
    ).length;

    if (activeCount >= 5) {
      throw new Error('The selected time slot is fully booked for this date.');
    }

    const newBooking = {
      ...booking,
      id: Date.now(),
      totalPrice: booking.guestCount * 15.0,
      status: 'PENDING'
    };
    bookings.push(newBooking);
    mockDb.setBookings(bookings);
    return newBooking;
  }
};

export const updateBookingStatus = async (id, status) => {
  try {
    const response = await api.put(`/bookings/${id}/status`, { status });
    return response.data;
  } catch (error) {
    handleApiError(error, 'updateBookingStatus');
    const bookings = mockDb.getBookings();
    const index = bookings.findIndex((b) => b.id === Number(id));
    if (index !== -1) {
      bookings[index].status = status;
      mockDb.setBookings(bookings);
      return bookings[index];
    }
    throw new Error('Booking not found locally');
  }
};

export const getStats = async () => {
  try {
    const response = await api.get('/stats');
    return response.data;
  } catch (error) {
    handleApiError(error, 'getStats');
    
    // Offline stats calculation
    const bookings = mockDb.getBookings();
    const approved = bookings.filter((b) => b.status === 'APPROVED');
    
    const totalRevenue = approved.reduce((acc, curr) => acc + curr.totalPrice, 0);
    const approvedGuests = approved.reduce((acc, curr) => acc + curr.guestCount, 0);

    return {
      totalBookings: bookings.length,
      totalRevenue,
      pendingBookings: bookings.filter((b) => b.status === 'PENDING').length,
      approvedBookings: approved.length,
      cancelledBookings: bookings.filter((b) => b.status === 'CANCELLED').length,
      approvedGuests,
      maxCapacityPerSlot: 5,
      pricePerGuest: 15.0
    };
  }
};
