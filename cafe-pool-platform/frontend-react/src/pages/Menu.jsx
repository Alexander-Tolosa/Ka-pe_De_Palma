import React, { useState, useEffect } from 'react';
import { getMenu } from '../services/api';
import { Coffee, Search, Utensils, Award, Heart, Loader2 } from 'lucide-react';

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Coffee', 'Refreshers', 'Food'];

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getMenu();
        setMenuItems(data);
      } catch (err) {
        console.error('Error fetching menu items:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 bg-sand-50/30 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div 
          className="relative text-center overflow-hidden mb-16 rounded-3xl py-16 md:py-24 px-6 md:px-12 shadow-lg bg-cover bg-center"
          style={{ backgroundImage: `url('/cozy-nature-coffee.png')` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-pool-950/70 via-pool-950/65 to-pool-950/75 mix-blend-multiply" />
          
          {/* Content */}
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1 text-amber-200 bg-amber-950/40 backdrop-blur-md border border-amber-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Coffee size={14} />
              Freshly Prepared Daily
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white tracking-wide drop-shadow-md">
              Our Digital Menu
            </h1>
            <div className="h-1.5 w-16 bg-amber-500 rounded-full mx-auto" />
            <p className="text-amber-50/90 text-sm md:text-base leading-relaxed max-w-xl mx-auto drop-shadow-sm">
              From sunrise double espressos to sunset poolside refreshments, browse our hand-crafted selections. Made with organic, premium ingredients.
            </p>
          </div>
        </div>

        {/* Filter and Search controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12 glass-card p-4 rounded-2xl shadow-sm">
          {/* Categories Tab */}
          <div className="flex flex-wrap gap-2 justify-center w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-coffee-600 text-white shadow-md shadow-coffee-600/10'
                    : 'bg-white text-pool-700 hover:bg-sand-100 border border-sand-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-pool-400" size={16} />
            <input
              type="text"
              placeholder="Search dishes or drinks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-sand-300 rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-coffee-500/25 focus:border-coffee-500 transition-all text-pool-950"
            />
          </div>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="animate-spin text-coffee-600" size={48} />
            <span className="text-pool-600 text-sm font-medium">Preparing the menu board...</span>
          </div>
        ) : filteredItems.length === 0 ? (
          /* Empty State */
          <div className="text-center py-24 glass-card rounded-3xl p-8 max-w-md mx-auto space-y-4 shadow-sm border border-sand-200">
            <Utensils size={48} className="text-pool-300 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-pool-950">No Items Found</h3>
            <p className="text-pool-600 text-sm">
              We couldn't find any menu items fitting your category or search query. Try resetting your search query!
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="px-6 py-2 bg-coffee-600 hover:bg-coffee-500 text-white text-xs font-bold rounded-full shadow"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Menu Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`group glass-card rounded-2xl overflow-hidden shadow-md hover:shadow-lg border border-sand-200/50 hover:border-coffee-300/30 transition-all duration-300 flex flex-col justify-between ${
                  !item.available ? 'opacity-70' : ''
                }`}
              >
                {/* Image Section */}
                <div className="h-60 overflow-hidden relative">
                  <img
                    src={item.imageUrl || 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=500&q=80'}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 text-pool-900 text-[10px] uppercase font-extrabold tracking-widest px-2.5 py-1 rounded-full shadow-sm">
                    {item.category}
                  </div>
                  
                  {/* Availability Badge Overlay */}
                  {!item.available && (
                    <div className="absolute inset-0 bg-pool-950/70 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="text-white text-xs uppercase font-extrabold tracking-widest px-4 py-2 border-2 border-white rounded-lg shadow-lg rotate-[-5deg]">
                        Sold Out
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-serif text-lg font-bold text-pool-950 group-hover:text-coffee-600 transition-colors duration-300">
                        {item.name}
                      </h3>
                      <span className="font-bold text-coffee-600 text-base shrink-0">
                        ₱{item.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-pool-600 text-xs leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Pool discount tagline */}
                  <div className="pt-3 border-t border-sand-100 flex items-center justify-between text-[11px] text-pool-500 font-semibold">
                    <span className="flex items-center gap-1">
                      <Award size={12} className="text-coffee-600 shrink-0" />
                      10% Pool Slot Discount
                    </span>
                    <Heart size={14} className="text-red-300 hover:text-red-500 cursor-pointer transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
