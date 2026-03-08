import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, ShieldCheck, Clock, Award, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../api/axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);

  

  const banners = [
    {
      img: '', // Removed image for Fresh Milk banner
      title: 'Fresh Milk Delivered Daily',
      subtitle: 'Pure A2 Cow Milk starting at just ₹68/L'
    },
    {
      img: '', // Removed image for Artisanal Bilona Ghee banner
      title: 'Artisanal Bilona Ghee',
      subtitle: 'Traditional purity in every golden drop'
    },
    {
      img: '', // Removed image for Probiotic Dahi & Paneer banner
      title: 'Probiotic Dahi & Paneer',
      subtitle: 'Health and taste in every spoonful'
    }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get('/products/products/');
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();

    const interval = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-milkman-off-white min-h-screen pb-12">
      {/* Banner Carousel */}
      <section className="relative h-[250px] md:h-[600px] overflow-hidden bg-milkman-primary-blue">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBanner}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img 
              src={banners[currentBanner].img} 
              className="w-full h-full object-cover opacity-70"
              alt="Banner"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-milkman-off-white"></div>
            
            {/* Banner Text Overlay */}
            <div className="absolute top-1/4 left-12 z-10">
              <h2 className="text-4xl md:text-5xl font-black text-milkman-white drop-shadow-lg mb-2 md:mb-4">{banners[currentBanner].title}</h2>
              <p className="text-xl md:text-2xl font-bold text-milkman-white drop-shadow-md">{banners[currentBanner].subtitle}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Controls */}
        <button 
          onClick={() => setCurrentBanner(prev => (prev - 1 + banners.length) % banners.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-milkman-dark-blue bg-opacity-50 hover:bg-opacity-75 rounded-full transition-all"
        >
          <ChevronLeft className="w-8 h-8 text-milkman-white" />
        </button>
        <button 
          onClick={() => setCurrentBanner(prev => (prev + 1) % banners.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-milkman-dark-blue bg-opacity-50 hover:bg-opacity-75 rounded-full transition-all"
        >
          <ChevronRight className="w-8 h-8 text-milkman-white" />
        </button>
      </section>

      {/* Main Content Overlapping Banner */}
      <main className="max-w-[1500px] mx-auto px-4 -mt-12 md:-mt-64 relative z-30">
        {/* Category Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[
            { title: 'Fresh Milk', img: 'https://images.pexels.com/photos/799273/pexels-photo-799273.jpeg', link: '/products' },
            { title: 'Ghee & Butter', img: 'https://images.pexels.com/photos/4182680/pexels-photo-4182680.jpeg', link: '/products' },
            { title: 'Dahi & Paneer', img: 'https://images.pexels.com/photos/10809260/pexels-photo-10809260.jpeg', link: '/products' },
            { title: 'Monthly Subscription', img: 'https://media.istockphoto.com/id/1498985176/vector/calendar-with-payment-date-payment-calendar-icon-planning-schedule-pay-reminder-payment-icon.jpg?s=2048x2048&w=is&k=20&c=bcM3XYdSmziRj5seUDgB6fw5AlmpKIKb6iOBR9uvmXo=', link: '/subscriptions' }
          ].map((cat, i) => (
            <div key={i} className="bg-milkman-white p-5 flex flex-col h-[420px] rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-3 text-milkman-dark-blue">{cat.title}</h3>
              <div className="flex-1 overflow-hidden rounded-md">
                <img src={cat.img} alt={cat.title} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300" />
              </div>
              <Link to={cat.link} className="text-sm text-milkman-primary-blue hover:underline mt-4">Shop now →</Link>
            </div>
          ))}
        </div>

        {/* Amul Heritage Section (Embedded style) */}
        <div className="bg-milkman-white p-8 mb-8 flex flex-col md:flex-row items-center gap-10 rounded-lg shadow-sm">
          <div className="md:w-1/3">
            <img 
              src="https://images.pexels.com/photos/6804192/pexels-photo-6804192.jpeg" 
              alt="The Milkman Story" 
              className="rounded-lg shadow-lg w-full h-[300px] object-cover"
            />
          </div>
          <div className="md:w-2/3 space-y-4">
            <div className="flex items-center gap-2 text-milkman-dark-blue font-black tracking-widest text-sm">
              <Award className="w-5 h-5 text-milkman-primary-blue" /> INSPIRED BY EXCELLENCE
            </div>
            <h2 className="text-3xl font-bold text-gray-800">The Milkman Story: Quality & Trust Since 2023</h2>
            <p className="text-gray-600 leading-relaxed">
              Inspired by the rich legacy of dairy cooperatives, Milkman was founded in 2023 with a vision to bring the freshest and purest dairy products directly to your home. We partner with local farmers who uphold the highest standards of quality and ethical practices, ensuring every product you receive is a testament to purity and tradition.
            </p>
            <Link to="/products" className="inline-block text-milkman-primary-blue font-bold hover:underline">Explore our Premium Collection →</Link>
          </div>
        </div>

        {/* Product Row (Horizontal Scroll style) */}
        <div className="bg-milkman-white p-6 mb-8 rounded-lg shadow-sm overflow-hidden">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Trending Dairy Products</h3>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {products.map((p) => (
              <Link key={p.id} to={`/products?q=${encodeURIComponent(p.name || '')}`} className="min-w-[200px] max-w-[200px] group bg-milkman-off-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="h-[150px] overflow-hidden mb-3 rounded-md">
                  <img 
                    src={p.image_url || p.image || 'https://via.placeholder.com/200'} 
                    alt={p.name} 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/200'; }}
                  />
                </div>
                <h4 className="text-sm text-gray-700 font-medium line-clamp-2 h-10">{p.name}</h4>
                <div className="flex items-center gap-1 mt-1 text-milkman-dark-blue">
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <span className="text-xs text-gray-500 ml-1">(1,240)</span>
                </div>
                <p className="text-lg font-bold mt-1 text-gray-900">₹{p.price}</p>
                <p className="text-xs text-gray-500">Get it by Tomorrow, 7 AM</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Persuasive Praise Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { title: 'Unmatched Purity', desc: 'Every drop is tested for 100+ quality parameters. No adulteration, just nature.', icon: ShieldCheck },
            { title: 'Superfast Delivery', desc: 'We deliver before you wake up. Morning tea with fresh milk is a promise.', icon: Clock },
            { title: 'Farm to Home', desc: 'Directly sourced from local farmers, ensuring the highest nutrients.', icon: Heart }
          ].map((item, i) => (
            <div key={i} className="bg-milkman-white p-8 rounded-lg shadow-sm border border-milkman-light-blue flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-milkman-light-blue rounded-full flex items-center justify-center text-milkman-dark-blue">
                <item.icon className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-gray-800">{item.title}</h4>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
