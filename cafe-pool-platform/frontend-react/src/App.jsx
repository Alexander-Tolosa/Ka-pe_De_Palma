import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Coffee, Calendar, Shield, Menu, X, Instagram, Facebook, Phone, MapPin, Clock, Leaf, Mail } from 'lucide-react';
import Home from './pages/Home';
import MenuPage from './pages/Menu';
import Booking from './pages/Booking';
import AdminDashboard from './pages/AdminDashboard';

const Palmtree = Leaf;

// Custom Navigation Link Component with Active States
function NavLink({ to, children, icon: Icon, onClick }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive
          ? 'bg-coffee-600 text-white shadow-md shadow-coffee-600/20 scale-105'
          : 'text-pool-800 hover:bg-sand-100 hover:text-coffee-700'
        }`}
    >
      <Icon size={16} />
      <span>{children}</span>
    </Link>
  );
}

function MainLayout({ children, isAdminLoggedIn, setIsAdminLoggedIn }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-sand-50/50">
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full glass-card border-b border-sand-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/logo.jpg"
                alt="Kape De Palma Logo"
                className="h-14 w-14 rounded-full border-2 border-pool-950/10 object-cover shadow-sm group-hover:scale-105 transition-all duration-300"
              />
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-tight text-pool-950 group-hover:text-coffee-600 transition-colors duration-300">
                  Kape De Palma
                </span>
                <span className="text-[9px] uppercase tracking-widest text-pool-500 font-bold -mt-0.5">
                  Est. 2025
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              <NavLink to="/" icon={Palmtree}>Home</NavLink>
              <NavLink to="/menu" icon={Coffee}>Digital Menu</NavLink>
              <NavLink to="/booking" icon={Calendar}>Book Pool</NavLink>
              {isAdminLoggedIn ? (
                <>
                  <NavLink to="/admin" icon={Shield}>Dashboard</NavLink>
                  <button
                    onClick={handleLogout}
                    className="ml-2 flex items-center gap-1.5 px-4 py-2 border border-red-200 text-red-600 rounded-full text-sm font-medium hover:bg-red-50 transition-all duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <NavLink to="/admin" icon={Shield}>Admin</NavLink>
              )}
            </nav>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-pool-950 hover:text-coffee-600 p-2 rounded-xl hover:bg-sand-100/50 transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden animate-fade-in bg-white border-b border-sand-200 px-4 pt-2 pb-6 flex flex-col gap-2">
            <NavLink to="/" icon={Palmtree} onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
            <NavLink to="/menu" icon={Coffee} onClick={() => setIsMobileMenuOpen(false)}>Digital Menu</NavLink>
            <NavLink to="/booking" icon={Calendar} onClick={() => setIsMobileMenuOpen(false)}>Book Pool</NavLink>
            {isAdminLoggedIn ? (
              <>
                <NavLink to="/admin" icon={Shield} onClick={() => setIsMobileMenuOpen(false)}>Dashboard</NavLink>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-1.5 w-full mt-2 py-2 border border-red-200 text-red-600 rounded-full text-sm font-medium hover:bg-red-50 transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/admin" icon={Shield} onClick={() => setIsMobileMenuOpen(false)}>Admin</NavLink>
            )}
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="bg-pool-950 text-sand-50 pt-16 pb-8 border-t border-pool-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-pool-900/50">
            {/* Info Col */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="/logo.jpg"
                  alt="Kape De Palma Logo"
                  className="h-12 w-12 rounded-full border border-white/10 object-cover shadow"
                />
                <span className="font-serif text-xl font-bold tracking-tight">Kape De Palma</span>
              </div>
              <p className="text-pool-300 text-sm leading-relaxed max-w-sm">
                Where the rich aroma of artisanal coffee meets the serene, cool waters of a private oasis. Unwind, swim, and dine with us today.
              </p>
              <div className="flex gap-4 pt-2">
                <a 
                  href="https://www.instagram.com/kapedepalma?igsh=b2Vid3ZhaTg0NmNh&utm_source=qr&fbclid=IwY2xjawSmCXpleHRuA2FlbQIxMABicmlkETFoSWJGUldSVlVCM0U5a2Iyc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHk_vKX6zYzk4894xCn4j30dfWr0ZASEbj5H43Lq36fg9a_EKllYo1kKd6jrC_aem_07LDqxViWzLNwXHo0oQnFg" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-full bg-pool-900 flex items-center justify-center hover:bg-coffee-600 hover:text-white transition-colors"
                >
                  <Instagram size={16} />
                </a>
                <a 
                  href="https://www.facebook.com/profile.php?id=61555442954559" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-full bg-pool-900 flex items-center justify-center hover:bg-coffee-600 hover:text-white transition-colors"
                >
                  <Facebook size={16} />
                </a>
              </div>
            </div>

            {/* Quick Contacts */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-coffee-400">Reach Us</h3>
              <ul className="space-y-3 text-sm text-pool-300">
                <li className="flex items-start gap-2.5">
                  <MapPin size={18} className="text-pool-400 mt-0.5 shrink-0" />
                  <span>
                    Sta. Rita, Oton, Iloilo<br />
                    <a
                      href="https://www.google.com/maps/place/Kape+de+Palma/@10.7268375,122.4556719,17z/data=!4m6!3m5!1s0x33aefb006e4ccda5:0xb9ec594e106af84!8m2!3d10.7268498!4d122.4556782!16s%2Fg%2F11mrbvrxpk?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-[10px] text-pool-400 hover:text-pool-200 mt-1 inline-block"
                    >
                      Google Maps &rarr;
                    </a>
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone size={18} className="text-pool-400 shrink-0" />
                  <span>+63-9951234567</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail size={18} className="text-pool-400 shrink-0" />
                  <a href="mailto:kapedepalma@gmail.com" className="hover:text-pool-200 transition-colors">
                    kapedepalma@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Hours */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-coffee-400">Hours of Service</h3>
              <ul className="space-y-3.5 text-sm text-pool-300">
                <li className="flex items-start gap-2.5">
                  <Clock size={18} className="text-pool-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-sand-100">Tuesday - Sunday</div>
                    <div className="text-xs">9:00 AM - 7:00 PM</div>
                    <div className="text-[10px] text-coffee-400 font-semibold mt-0.5">Last Order: 6:30 PM</div>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <Palmtree size={18} className="text-pool-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-sand-100">Monday</div>
                    <div className="text-xs text-red-400 font-semibold">Closed</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 text-center text-xs text-pool-400">
            &copy; {new Date().getFullYear()} Ka-pe de Palma. All rights reserved. Created for hospitality & leisure operations.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  return (
    <Router>
      <MainLayout isAdminLoggedIn={isAdminLoggedIn} setIsAdminLoggedIn={setIsAdminLoggedIn}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/booking" element={<Booking />} />
          <Route
            path="/admin"
            element={
              <AdminDashboard
                isAdminLoggedIn={isAdminLoggedIn}
                setIsAdminLoggedIn={setIsAdminLoggedIn}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}
