import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Calendar, MapPin, Compass, Award, Star, Clock } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col w-full relative overflow-hidden">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-20 -left-20 w-80 h-80 bg-pool-300/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-96 -right-20 w-96 h-96 bg-coffee-200/20 rounded-full blur-[100px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-black text-white px-4 py-20">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60 pointer-events-none"
          style={{ 
            backgroundImage: "url('/hero-bg-clear.png')" 
          }}
        />

        <div className="max-w-4xl mx-auto text-center z-10 space-y-8 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sand-400/10 border border-sand-400/25 text-sand-300 text-xs font-semibold uppercase tracking-widest">
            <Compass size={14} className="animate-spin-slow" />
            Oton's Nature Cafe & Pool
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight leading-tight text-sand-100">
            Indulge in Flavors.<br />
            Unwind by the Water.
          </h1>
          
          <p className="text-sand-200 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Ka-pe de Palma merges artisan crafted brews and exquisite culinary plates with the ultimate relaxing poolside retreat. Book your escape today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              to="/booking"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-coffee-600 hover:bg-coffee-500 text-white rounded-full text-base font-bold shadow-lg shadow-coffee-950/30 hover:scale-105 transition-all duration-300"
            >
              <Calendar size={18} />
              Reserve Pool Pass
            </Link>
            <Link
              to="/menu"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-sand-100 border border-sand-200/30 rounded-full text-base font-bold backdrop-blur hover:scale-105 transition-all duration-300"
            >
              <Coffee size={18} />
              Explore Menu
            </Link>
          </div>
        </div>
      </section>

      {/* CORE EXPERIENCES SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="font-serif text-4xl font-bold text-pool-950">A Double Blend of Leisure</h2>
          <div className="h-1.5 w-20 bg-coffee-600 rounded-full mx-auto" />
          <p className="text-pool-600">
            Enjoy our dual facilities. Start your morning with a hot cup of specialty coffee, and spend your afternoon bathing under the sun.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Card 1: Cafe */}
          <div className="group glass-card rounded-3xl overflow-hidden shadow-xl shadow-sand-200/50 hover:shadow-2xl transition-all duration-500 flex flex-col">
            <div className="h-72 overflow-hidden relative">
              <img 
                src="/cafe-bistro.jpg" 
                alt="Cafe Interior" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-coffee-600 text-white text-xs uppercase font-bold tracking-widest px-3 py-1.5 rounded-full shadow">
                The Roast
              </div>
            </div>
            <div className="p-8 flex-grow flex flex-col justify-between space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-pool-950 mb-3 group-hover:text-coffee-600 transition-colors">
                  Artisanal Coffee & Bistro
                </h3>
                <p className="text-pool-600 text-sm leading-relaxed">
                  Our beans are sourced locally and roasted to perfection. Indulge in our signature iced lattes, robust espressos, and a gourmet bistro menu ranging from fresh sourdough sandwiches to creamy carbonara plates.
                </p>
              </div>
              <Link 
                to="/menu" 
                className="inline-flex items-center gap-1.5 text-sm font-bold text-coffee-600 hover:text-coffee-700 transition-colors self-start"
              >
                View our digital menu &rarr;
              </Link>
            </div>
          </div>

          {/* Card 2: Pool */}
          <div className="group glass-card rounded-3xl overflow-hidden shadow-xl shadow-sand-200/50 hover:shadow-2xl transition-all duration-500 flex flex-col">
            <div className="h-72 overflow-hidden relative">
              <img 
                src="/pool-oasis.jpg" 
                alt="Swimming Pool Oasis" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-pool-500 text-white text-xs uppercase font-bold tracking-widest px-3 py-1.5 rounded-full shadow">
                The Oasis
              </div>
            </div>
            <div className="p-8 flex-grow flex flex-col justify-between space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-pool-950 mb-3 group-hover:text-pool-600 transition-colors">
                  Poolside Retreat
                </h3>
                <p className="text-pool-600 text-sm leading-relaxed">
                  Escape the heat in our crystal-clear pool, surrounded by swaying palms and premium loungers. We offer secure lockers, dynamic booking slots, and absolute poolside drink services.
                </p>
              </div>
              <Link 
                to="/booking" 
                className="inline-flex items-center gap-1.5 text-sm font-bold text-pool-600 hover:text-pool-700 transition-colors self-start"
              >
                Book a pool pass &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* OPERATIONS & DETAILS */}
      <section className="bg-sand-100/70 py-20 border-y border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Hour detail */}
            <div className="flex items-start gap-4 p-6 glass-card rounded-2xl">
              <div className="bg-coffee-600/10 text-coffee-600 p-3 rounded-xl">
                <Clock size={24} />
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-bold text-pool-950 text-base tracking-wide">Opening Hours</h4>
                <div className="text-pool-600 text-sm space-y-1.5 tracking-wide leading-relaxed">
                  <p><strong>Tuesday - Sunday:</strong> 9:00 AM - 7:00 PM</p>
                  <p><strong>Monday:</strong> Closed</p>
                  <p className="text-xs text-coffee-600 font-semibold pt-0.5">Last Order: 6:30 PM</p>
                </div>
              </div>
            </div>

            {/* Location detail */}
            <div className="flex items-start gap-4 p-6 glass-card rounded-2xl">
              <div className="bg-pool-500/10 text-pool-600 p-3 rounded-xl">
                <MapPin size={24} />
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-bold text-pool-950 text-base tracking-wide">Our Location</h4>
                <div className="text-pool-600 text-sm space-y-1.5 tracking-wide leading-relaxed">
                  <p>Sta. Rita, Oton, Iloilo.</p>
                  <a 
                    href="https://www.google.com/maps/place/Kape+de+Palma/@10.7268375,122.4556719,17z/data=!4m6!3m5!1s0x33aefb006e4ccda5:0xb9ec594e106af84!8m2!3d10.7268498!4d122.4556782!16s%2Fg%2F11mrbvrxpk?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="underline text-pool-500 hover:text-pool-700 font-semibold inline-block"
                  >
                    View on Google Maps &rarr;
                  </a>
                </div>
              </div>
            </div>

            {/* Quality detail */}
            <div className="flex items-start gap-4 p-6 glass-card rounded-2xl">
              <div className="bg-sand-500/10 text-sand-700 p-3 rounded-xl">
                <Award size={24} />
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-bold text-pool-950 text-base tracking-wide">Venue Amenities</h4>
                <p className="text-pool-600 text-sm leading-relaxed tracking-wide">
                  We’ve designed our space for ultimate relaxation. Guests have access to our swimming pool, outdoor showers, comfortable nature vibe scenery, and full table service from the cafe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="font-serif text-4xl font-bold text-pool-950">Loved by Guests</h2>
          <div className="h-1.5 w-20 bg-coffee-600 rounded-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Jessica M.", rating: 5, text: "The Sea Salt Spanish Latte is absolutely out of this world! Combining it with an afternoon dip in the pool makes this my absolute favorite place in Laguna." },
            { name: "Christian L.", rating: 5, text: "Extremely tidy, peaceful vibe, and the Palma club sandwich was fantastic. The booking system was very straightforward and we loved the lounge seats." },
            { name: "Maria Clara S.", rating: 5, text: "Perfect venue for a relaxing weekend. The staff is polite, the coffee is premium grade, and the pool feels like a five-star private resort." }
          ].map((item, idx) => (
            <div key={idx} className="glass-card p-8 rounded-2xl shadow-md border border-sand-200/50 space-y-4">
              <div className="flex text-yellow-500 gap-1">
                {[...Array(item.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-pool-700 text-sm italic leading-relaxed">
                "{item.text}"
              </p>
              <div className="font-semibold text-pool-950 text-sm">
                &mdash; {item.name}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
