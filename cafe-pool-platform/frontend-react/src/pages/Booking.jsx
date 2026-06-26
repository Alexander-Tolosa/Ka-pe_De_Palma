import React, { useState } from 'react';
import { createBooking } from '../services/api';
import { Calendar, User, Mail, Phone, Users, ShieldAlert, CheckCircle, Clock } from 'lucide-react';

export default function Booking() {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    bookingDate: new Date().toISOString().split('T')[0],
    timeSlot: 'Morning',
    guestCount: 2
  });

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const PRICE_PER_GUEST = 15.00;
  const maxGuests = 10;
  
  // Calculate today's date in YYYY-MM-DD for date-picker min attribute
  const todayStr = new Date().toISOString().split('T')[0];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'guestCount' ? Math.max(1, Math.min(maxGuests, Number(value))) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessData(null);

    try {
      const savedBooking = await createBooking({
        ...formData,
        guestCount: Number(formData.guestCount)
      });
      setSuccessData(savedBooking);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.error || err.message || 'Failed to complete booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = formData.guestCount * PRICE_PER_GUEST;

  return (
    <div className="py-16 bg-gradient-to-b from-sand-50 to-pool-50/50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Page Title */}
        <div 
          className="relative text-center overflow-hidden mb-12 rounded-3xl py-12 md:py-16 px-6 shadow-lg bg-cover bg-center"
          style={{ backgroundImage: `url('/cozy-nature-pool.png')` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-pool-950/70 via-pool-950/65 to-pool-950/75 mix-blend-multiply" />

          {/* Content */}
          <div className="relative z-10 space-y-4">
            <span className="inline-block text-cyan-200 bg-cyan-950/40 backdrop-blur-md border border-cyan-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Pool Reservation
            </span>
            <h1 className="font-serif text-4xl font-bold text-white tracking-wide drop-shadow-md">
              Book Your Pool Pass
            </h1>
            <div className="h-1.5 w-16 bg-cyan-500 rounded-full mx-auto" />
            <p className="text-cyan-50/90 text-sm max-w-lg mx-auto drop-shadow-sm leading-relaxed">
              Secure entry to our luxury pool facilities. Choose your date, select a preferred time slot, and calculate your booking price in real-time.
            </p>
          </div>
        </div>

        {successData ? (
          /* SUCCESS SCREEN */
          <div className="glass-card rounded-3xl p-8 md:p-12 shadow-xl border border-pool-200 text-center space-y-8 animate-fade-in max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle size={44} />
            </div>
            
            <div className="space-y-3">
              <h2 className="font-serif text-3xl font-bold text-pool-950">Booking Received!</h2>
              <p className="text-pool-600 text-sm">
                Your reservation has been created and is currently <strong className="text-coffee-600">Pending</strong> approval from our management team. We have sent a validation receipt to your email.
              </p>
            </div>

            {/* Receipt details */}
            <div className="bg-sand-100/60 border border-sand-200 rounded-2xl p-6 text-left space-y-4 text-sm text-pool-950">
              <div className="flex justify-between border-b border-sand-200 pb-2">
                <span className="text-pool-500">Booking Reference</span>
                <span className="font-bold">#KPD-{successData.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-pool-500">Guest Name</span>
                <span className="font-semibold">{successData.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-pool-500">Scheduled Date</span>
                <span className="font-semibold">{successData.bookingDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-pool-500">Time Slot</span>
                <span className="font-semibold">{successData.timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-pool-500">Total Guests</span>
                <span className="font-semibold">{successData.guestCount} {successData.guestCount === 1 ? 'Person' : 'People'}</span>
              </div>
              <div className="flex justify-between border-t border-sand-200 pt-3 text-base">
                <span className="text-pool-800 font-bold">Total Charged</span>
                <span className="font-extrabold text-coffee-600">${successData.totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => setSuccessData(null)}
              className="w-full py-4 bg-pool-700 hover:bg-pool-600 text-white rounded-full text-sm font-bold shadow-md hover:scale-[1.02] transition-all"
            >
              Book Another Session
            </button>
          </div>
        ) : (
          /* BOOKING FORM */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white/85 backdrop-blur-md border border-sand-200/50 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
              
              {/* Error Banner */}
              {errorMsg && (
                <div className="flex gap-2.5 items-start bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-xs">
                  <ShieldAlert size={18} className="shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Booking Error: </span>
                    {errorMsg}
                  </div>
                </div>
              )}

              {/* Customer Details */}
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-pool-950 pb-2 border-b border-sand-100">
                  1. Contact Information
                </h3>
                
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-pool-800" htmlFor="customerName">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-pool-400" size={16} />
                    <input
                      required
                      type="text"
                      id="customerName"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      placeholder="Jane Doe"
                      className="w-full pl-10 pr-4 py-2.5 border border-sand-300 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-pool-500/20 focus:border-pool-500 transition-all text-pool-950"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-pool-800" htmlFor="customerEmail">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-pool-400" size={16} />
                      <input
                        required
                        type="email"
                        id="customerEmail"
                        name="customerEmail"
                        value={formData.customerEmail}
                        onChange={handleInputChange}
                        placeholder="jane.doe@example.com"
                        className="w-full pl-10 pr-4 py-2.5 border border-sand-300 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-pool-500/20 focus:border-pool-500 transition-all text-pool-950"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-pool-800" htmlFor="customerPhone">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-pool-400" size={16} />
                      <input
                        required
                        type="tel"
                        id="customerPhone"
                        name="customerPhone"
                        value={formData.customerPhone}
                        onChange={handleInputChange}
                        placeholder="+63 (917) 123-4567"
                        className="w-full pl-10 pr-4 py-2.5 border border-sand-300 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-pool-500/20 focus:border-pool-500 transition-all text-pool-950"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Slot and Guest counts */}
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-pool-950 pb-2 border-b border-sand-100">
                  2. Visit Schedule
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Booking Date */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-pool-800" htmlFor="bookingDate">Preferred Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-pool-400" size={16} />
                      <input
                        required
                        type="date"
                        id="bookingDate"
                        name="bookingDate"
                        min={todayStr}
                        value={formData.bookingDate}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-sand-300 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-pool-500/20 focus:border-pool-500 transition-all text-pool-950"
                      />
                    </div>
                  </div>

                  {/* Guest Count */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-pool-800" htmlFor="guestCount">Number of Guests</label>
                    <div className="relative">
                      <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 text-pool-400" size={16} />
                      <input
                        required
                        type="number"
                        id="guestCount"
                        name="guestCount"
                        min="1"
                        max={maxGuests}
                        value={formData.guestCount}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-sand-300 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-pool-500/20 focus:border-pool-500 transition-all text-pool-950"
                      />
                    </div>
                  </div>
                </div>

                {/* Time slot choice */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-pool-800">Preferred Session Slot</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { name: 'Morning', time: '9 AM - 12 PM' },
                      { name: 'Afternoon', time: '1 PM - 5 PM' },
                      { name: 'Evening', time: '6 PM - 7 PM' }
                    ].map((slot) => (
                      <button
                        key={slot.name}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, timeSlot: slot.name }))}
                        className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                          formData.timeSlot === slot.name
                            ? 'bg-pool-500 border-pool-600 text-white shadow-md shadow-pool-500/25 scale-[1.03]'
                            : 'bg-white border-sand-200 text-pool-950 hover:bg-sand-50'
                        }`}
                      >
                        <span className="text-xs font-bold">{slot.name}</span>
                        <span className={`text-[10px] ${formData.timeSlot === slot.name ? 'text-pool-100' : 'text-pool-500'}`}>
                          {slot.time}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-coffee-600 hover:bg-coffee-500 text-white text-sm font-bold rounded-full shadow-lg shadow-coffee-600/10 flex items-center justify-center gap-2 hover:scale-[1.01] transition-all disabled:bg-sand-400"
              >
                {loading ? 'Processing Reservation...' : 'Submit Pool Reservation'}
              </button>
            </form>

            {/* Sidebar Pricing breakdown */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Pricing breakdown card */}
              <div className="glass-card rounded-3xl p-6 shadow-lg border border-sand-200/50 space-y-6">
                <h3 className="font-serif text-lg font-bold text-pool-950 pb-2 border-b border-sand-100">
                  Billing Invoice Summary
                </h3>
                
                <div className="space-y-4 text-xs text-pool-950">
                  <div className="flex justify-between items-center">
                    <span className="text-pool-500">Base pool fee per guest</span>
                    <span className="font-bold">${PRICE_PER_GUEST.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-pool-500">Subtotal calculation</span>
                    <span>{formData.guestCount} {formData.guestCount === 1 ? 'Guest' : 'Guests'} &times; ${PRICE_PER_GUEST.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-pool-500">Locker access & towels</span>
                    <span className="text-green-600 font-bold uppercase tracking-wider">Free Included</span>
                  </div>
                  
                  <div className="h-px bg-sand-200 my-2" />
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="font-bold text-sm block">Total Pool Cost</span>
                      <span className="text-[10px] text-pool-500">Pay at the lobby desk</span>
                    </div>
                    <span className="font-extrabold text-2xl text-coffee-600">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Pool Policy info */}
              <div className="glass-card-dark rounded-3xl p-6 shadow-lg space-y-4">
                <h4 className="font-serif text-base font-bold text-coffee-300 flex items-center gap-1.5">
                  <Clock size={16} />
                  Oasis Rules & Policy
                </h4>
                <ul className="text-xs text-pool-100 space-y-2.5 leading-relaxed">
                  <li>&bull; Check-in opens 15 minutes before the session starts.</li>
                  <li>&bull; Clean, appropriate swim attire is strictly required.</li>
                  <li>&bull; Children under 12 must be supervised by an adult at all times.</li>
                  <li>&bull; Cancel reservations via email/call at least 24 hours prior.</li>
                </ul>
              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
}
