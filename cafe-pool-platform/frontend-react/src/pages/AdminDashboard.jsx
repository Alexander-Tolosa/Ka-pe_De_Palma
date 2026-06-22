import React, { useState, useEffect } from 'react';
import { getBookings, getMenu, updateBookingStatus, createMenuItem, updateMenuItem, deleteMenuItem, getStats } from '../services/api';
import { Shield, Lock, DollarSign, Calendar, Users, Coffee, Edit, Trash2, Check, X, PlusCircle, CheckSquare, RefreshCw, Eye } from 'lucide-react';

export default function AdminDashboard({ isAdminLoggedIn, setIsAdminLoggedIn }) {
  // Login states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Dashboard states
  const [activeTab, setActiveTab] = useState('bookings'); // bookings, menu
  const [bookings, setBookings] = useState([]);
  const [menu, setMenu] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [bookingFilter, setBookingFilter] = useState('ALL'); // ALL, PENDING, APPROVED, CANCELLED

  // Menu form states
  const [menuForm, setMenuForm] = useState({
    id: null,
    name: '',
    description: '',
    price: '',
    category: 'Coffee',
    imageUrl: '',
    available: true
  });
  const [isEditingMenu, setIsEditingMenu] = useState(false);

  // Fetch Dashboard Data
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [bookingsData, menuData, statsData] = await Promise.all([
        getBookings(),
        getMenu(),
        getStats()
      ]);
      setBookings(bookingsData);
      setMenu(menuData);
      setStats(statsData);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdminLoggedIn) {
      fetchDashboardData();
    }
  }, [isAdminLoggedIn]);

  // Handle Login submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    if (username.trim() === 'admin' && password.trim() === 'admin') {
      setIsAdminLoggedIn(true);
    } else {
      setLoginError('Invalid username or password credentials.');
    }
  };

  // Handle Status Update for Bookings
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateBookingStatus(id, newStatus);
      fetchDashboardData();
    } catch (err) {
      alert('Failed to update booking status: ' + err.message);
    }
  };

  // Handle Menu Edit trigger
  const triggerMenuEdit = (item) => {
    setMenuForm({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      imageUrl: item.imageUrl,
      available: item.available
    });
    setIsEditingMenu(true);
  };

  // Handle Menu Save (Create or Update)
  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...menuForm,
        price: Number(menuForm.price)
      };

      if (isEditingMenu && menuForm.id) {
        await updateMenuItem(menuForm.id, payload);
      } else {
        await createMenuItem(payload);
      }

      // Reset form
      setMenuForm({
        id: null,
        name: '',
        description: '',
        price: '',
        category: 'Coffee',
        imageUrl: '',
        available: true
      });
      setIsEditingMenu(false);
      fetchDashboardData();
    } catch (err) {
      alert('Failed to save menu item: ' + err.message);
    }
  };

  // Handle Menu Item Delete
  const handleMenuDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      try {
        await deleteMenuItem(id);
        fetchDashboardData();
      } catch (err) {
        alert('Failed to delete item: ' + err.message);
      }
    }
  };

  // Handle Menu Availability Toggle
  const handleAvailabilityToggle = async (item) => {
    try {
      await updateMenuItem(item.id, {
        ...item,
        available: !item.available
      });
      fetchDashboardData();
    } catch (err) {
      alert('Failed to toggle availability: ' + err.message);
    }
  };

  // Filter Bookings
  const filteredBookings = bookings.filter((b) => {
    if (bookingFilter === 'ALL') return true;
    return b.status.toUpperCase() === bookingFilter.toUpperCase();
  });

  // --- RENDER LOGIN IF NOT AUTHENTICATED ---
  if (!isAdminLoggedIn) {
    return (
      <div className="py-24 bg-gradient-to-b from-sand-50 to-pool-50/50 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full glass-card rounded-3xl p-8 shadow-xl border border-sand-200/50 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-coffee-600/10 text-coffee-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <Shield size={28} />
            </div>
            <h1 className="font-serif text-2xl font-bold text-pool-950">Staff Portal Secure Login</h1>
            <p className="text-pool-600 text-xs">
              This terminal is reserved for Ka-pe de Palma managers and kitchen staff. Please log in below.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {loginError && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
                {loginError}
              </div>
            )}

            {/* Username */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-pool-800" htmlFor="username">Username</label>
              <input
                required
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-4 py-2.5 border border-sand-300 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-coffee-500/20 focus:border-coffee-500 transition-all text-pool-950"
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-pool-800" htmlFor="password">Password</label>
              <div className="relative">
                <input
                  required
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border border-sand-300 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-coffee-500/20 focus:border-coffee-500 transition-all text-pool-950"
                />
                <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 text-pool-300" size={16} />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-coffee-600 hover:bg-coffee-500 text-white rounded-xl text-sm font-bold shadow-md hover:scale-[1.01] transition-all"
            >
              Sign In to Dashboard
            </button>
          </form>
          
          <div className="text-center text-[10px] text-pool-400">
            Default credentials: <strong className="text-pool-500">admin</strong> / <strong className="text-pool-500">admin</strong>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER MAIN ADMIN DASHBOARD ---
  return (
    <div className="py-12 bg-sand-50/20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="space-y-1 text-center md:text-left">
            <h1 className="font-serif text-3xl font-bold tracking-tight text-pool-950 flex items-center justify-center md:justify-start gap-2">
              <Shield className="text-coffee-600" size={26} />
              Administrative Dashboard
            </h1>
            <p className="text-pool-600 text-xs">
              Manage swimming pool slot allocations, process pending clients, and organize the digital cafe catalog.
            </p>
          </div>
          <button
            onClick={fetchDashboardData}
            className="flex items-center gap-1.5 px-4 py-2 bg-white text-pool-800 border border-sand-200 rounded-xl text-xs font-bold shadow-sm hover:bg-sand-50 hover:border-sand-300 transition-all"
          >
            <RefreshCw size={14} />
            Reload Data
          </button>
        </div>

        {/* Stats Cards Row */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Total Bookings */}
            <div className="glass-card p-6 rounded-2xl flex items-center justify-between shadow-sm">
              <div className="space-y-1.5">
                <span className="text-xs text-pool-500 font-bold uppercase tracking-wider">Bookings Total</span>
                <h2 className="text-3xl font-black text-pool-950">{stats.totalBookings}</h2>
              </div>
              <div className="bg-pool-100 text-pool-600 p-3 rounded-2xl">
                <Calendar size={22} />
              </div>
            </div>

            {/* Approved Revenue */}
            <div className="glass-card p-6 rounded-2xl flex items-center justify-between shadow-sm">
              <div className="space-y-1.5">
                <span className="text-xs text-pool-500 font-bold uppercase tracking-wider">Approved Revenue</span>
                <h2 className="text-3xl font-black text-coffee-600">${stats.totalRevenue.toFixed(2)}</h2>
              </div>
              <div className="bg-green-50 text-green-600 p-3 rounded-2xl">
                <DollarSign size={22} />
              </div>
            </div>

            {/* Approved Guests */}
            <div className="glass-card p-6 rounded-2xl flex items-center justify-between shadow-sm">
              <div className="space-y-1.5">
                <span className="text-xs text-pool-500 font-bold uppercase tracking-wider">Approved Guests</span>
                <h2 className="text-3xl font-black text-pool-950">{stats.approvedGuests}</h2>
              </div>
              <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl">
                <Users size={22} />
              </div>
            </div>

            {/* Pending actions */}
            <div className="glass-card p-6 rounded-2xl flex items-center justify-between shadow-sm">
              <div className="space-y-1.5">
                <span className="text-xs text-pool-500 font-bold uppercase tracking-wider">Pending Approvals</span>
                <h2 className="text-3xl font-black text-pool-950">{stats.pendingBookings}</h2>
              </div>
              <div className={`p-3 rounded-2xl ${stats.pendingBookings > 0 ? 'bg-orange-100 text-orange-600' : 'bg-sand-100 text-pool-400'}`}>
                <CheckSquare size={22} />
              </div>
            </div>

          </div>
        )}

        {/* Tab Toggle Controls */}
        <div className="border-b border-sand-200 flex gap-4">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`pb-4 px-2 text-sm font-bold border-b-2 transition-all ${
              activeTab === 'bookings'
                ? 'border-coffee-600 text-coffee-600'
                : 'border-transparent text-pool-500 hover:text-pool-800'
            }`}
          >
            Reservations Control ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('menu')}
            className={`pb-4 px-2 text-sm font-bold border-b-2 transition-all ${
              activeTab === 'menu'
                ? 'border-coffee-600 text-coffee-600'
                : 'border-transparent text-pool-500 hover:text-pool-800'
            }`}
          >
            Menu Items Manager ({menu.length})
          </button>
        </div>

        {/* --- TAB CONTENT: BOOKINGS CONTROL --- */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            
            {/* Filter buttons */}
            <div className="flex gap-2 flex-wrap">
              {['ALL', 'PENDING', 'APPROVED', 'CANCELLED'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setBookingFilter(filter)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${
                    bookingFilter === filter
                      ? 'bg-pool-950 text-white border-pool-950'
                      : 'bg-white text-pool-700 border-sand-200 hover:bg-sand-50'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Bookings Table */}
            <div className="glass-card rounded-2xl shadow-sm border border-sand-200/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-sand-100 text-pool-900 border-b border-sand-200 font-bold uppercase tracking-wider">
                      <th className="p-4">Ref ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Visit Date</th>
                      <th className="p-4">Session Slot</th>
                      <th className="p-4 text-center">Guests</th>
                      <th className="p-4 text-right">Revenue</th>
                      <th className="p-4 text-center">Status</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sand-100 text-pool-950">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="p-8 text-center text-pool-500 italic">
                          No reservations found matching this status.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-sand-50/50 transition-colors">
                          <td className="p-4 font-mono font-bold">#KPD-{b.id}</td>
                          <td className="p-4">
                            <div className="font-bold">{b.customerName}</div>
                            <div className="text-[10px] text-pool-500">{b.customerEmail} &bull; {b.customerPhone}</div>
                          </td>
                          <td className="p-4 font-semibold">{b.bookingDate}</td>
                          <td className="p-4">
                            <span className="px-2.5 py-1 bg-pool-50 text-pool-800 rounded-full font-bold border border-pool-100">
                              {b.timeSlot}
                            </span>
                          </td>
                          <td className="p-4 text-center font-bold">{b.guestCount}</td>
                          <td className="p-4 text-right font-bold text-coffee-600">${b.totalPrice.toFixed(2)}</td>
                          <td className="p-4 text-center">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                              b.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                              b.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                              'bg-orange-100 text-orange-700 animate-pulse-subtle'
                            }`}>
                              {b.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-1.5 justify-center">
                              {b.status === 'PENDING' && (
                                <>
                                  <button
                                    onClick={() => handleStatusChange(b.id, 'APPROVED')}
                                    className="p-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-sm"
                                    title="Approve Booking"
                                  >
                                    <Check size={14} />
                                  </button>
                                  <button
                                    onClick={() => handleStatusChange(b.id, 'CANCELLED')}
                                    className="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-sm"
                                    title="Cancel Booking"
                                  >
                                    <X size={14} />
                                  </button>
                                </>
                              )}
                              {b.status === 'APPROVED' && (
                                <button
                                  onClick={() => handleStatusChange(b.id, 'CANCELLED')}
                                  className="px-2 py-1 border border-red-200 text-red-500 hover:bg-red-50 rounded-lg"
                                >
                                  Revoke
                                </button>
                              )}
                              {b.status === 'CANCELLED' && (
                                <button
                                  onClick={() => handleStatusChange(b.id, 'APPROVED')}
                                  className="px-2 py-1 border border-green-200 text-green-600 hover:bg-green-50 rounded-lg"
                                >
                                  Reinstate
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* --- TAB CONTENT: MENU MANAGER --- */}
        {activeTab === 'menu' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Menu List Table */}
            <div className="lg:col-span-8 glass-card rounded-2xl border border-sand-200/50 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-sand-100 text-pool-900 border-b border-sand-200 font-bold uppercase tracking-wider">
                      <th className="p-4">Image</th>
                      <th className="p-4">Item details</th>
                      <th className="p-4">Category</th>
                      <th className="p-4 text-right">Price</th>
                      <th className="p-4 text-center">Status</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sand-100 text-pool-950">
                    {menu.map((item) => (
                      <tr key={item.id} className="hover:bg-sand-50/50 transition-colors">
                        <td className="p-4">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-xl shadow-sm border border-sand-200"
                          />
                        </td>
                        <td className="p-4 max-w-xs">
                          <div className="font-bold text-sm">{item.name}</div>
                          <div className="text-[10px] text-pool-500 line-clamp-2">{item.description}</div>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-0.5 bg-sand-100 text-pool-800 rounded-full font-bold">
                            {item.category}
                          </span>
                        </td>
                        <td className="p-4 text-right font-bold text-coffee-600">₱{item.price.toFixed(2)}</td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleAvailabilityToggle(item)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-colors ${
                              item.available
                                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                : 'bg-red-100 text-red-700 hover:bg-red-200'
                            }`}
                          >
                            {item.available ? 'In Stock' : 'Sold Out'}
                          </button>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => triggerMenuEdit(item)}
                              className="p-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                              title="Edit item"
                            >
                              <Edit size={12} />
                            </button>
                            <button
                              onClick={() => handleMenuDelete(item.id)}
                              className="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                              title="Delete item"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add / Edit Menu Form */}
            <form onSubmit={handleMenuSubmit} className="lg:col-span-4 bg-white border border-sand-200/50 rounded-3xl p-6 shadow-md space-y-5">
              <h3 className="font-serif text-lg font-bold text-pool-950 pb-2 border-b border-sand-100 flex items-center gap-1.5">
                <PlusCircle className="text-coffee-600" size={20} />
                {isEditingMenu ? 'Edit Menu Item' : 'Add New Menu Item'}
              </h3>

              {/* Item Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-pool-800" htmlFor="menuName">Item Name</label>
                <input
                  required
                  type="text"
                  id="menuName"
                  value={menuForm.name}
                  onChange={(e) => setMenuForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Sea Salt spanish latte"
                  className="w-full px-4 py-2 border border-sand-300 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-coffee-500/20 focus:border-coffee-500 transition-all text-pool-950"
                />
              </div>

              {/* Category */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-pool-800" htmlFor="menuCategory">Category</label>
                <select
                  id="menuCategory"
                  value={menuForm.category}
                  onChange={(e) => setMenuForm(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-2 border border-sand-300 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-coffee-500/20 focus:border-coffee-500 transition-all text-pool-950"
                >
                  <option value="Coffee">Coffee</option>
                  <option value="Refreshers">Refreshers</option>
                  <option value="Food">Food</option>
                </select>
              </div>

              {/* Price */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-pool-800" htmlFor="menuPrice">Price (PHP)</label>
                <input
                  required
                  type="number"
                  step="0.01"
                  min="0.10"
                  id="menuPrice"
                  value={menuForm.price}
                  onChange={(e) => setMenuForm(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="105.00"
                  className="w-full px-4 py-2 border border-sand-300 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-coffee-500/20 focus:border-coffee-500 transition-all text-pool-950"
                />
              </div>

              {/* Image URL */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-pool-800" htmlFor="menuImage">Image URL</label>
                <input
                  required
                  type="url"
                  id="menuImage"
                  value={menuForm.imageUrl}
                  onChange={(e) => setMenuForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2 border border-sand-300 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-coffee-500/20 focus:border-coffee-500 transition-all text-pool-950"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-pool-800" htmlFor="menuDesc">Description</label>
                <textarea
                  required
                  id="menuDesc"
                  value={menuForm.description}
                  onChange={(e) => setMenuForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Double shot espresso, sweet condensed milk..."
                  rows="3"
                  className="w-full px-4 py-2 border border-sand-300 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-coffee-500/20 focus:border-coffee-500 transition-all text-pool-950 resize-none"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-grow py-2.5 bg-coffee-600 hover:bg-coffee-500 text-white rounded-xl text-xs font-bold shadow"
                >
                  {isEditingMenu ? 'Update Item' : 'Add Item'}
                </button>
                {isEditingMenu && (
                  <button
                    type="button"
                    onClick={() => {
                      setMenuForm({ id: null, name: '', description: '', price: '', category: 'Coffee', imageUrl: '', available: true });
                      setIsEditingMenu(false);
                    }}
                    className="px-4 py-2.5 bg-sand-200 hover:bg-sand-300 text-pool-800 rounded-xl text-xs font-bold"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

          </div>
        )}

      </div>
    </div>
  );
}
