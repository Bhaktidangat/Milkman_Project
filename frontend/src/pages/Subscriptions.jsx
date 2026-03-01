import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import { Calendar, Clock, Loader2, Sparkles, CheckCircle2, ArrowRight, PlusCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    product: '',
    frequency: 'daily',
    start_date: new Date().toISOString().split('T')[0],
    end_date: '',
  });

  useEffect(() => {
    fetchSubscriptions();
    fetchProducts();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const res = await API.get('/subscriptions/subscriptions/');
      setSubscriptions(res.data);
    } catch (err) {
      console.error('Error fetching subscriptions:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await API.get('/products/products/');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/subscriptions/subscriptions/', formData);
      setShowModal(false);
      fetchSubscriptions();
    } catch (err) {
      console.error('Subscription failed:', err);
      alert('Subscription failed. Please check your inputs.');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="w-12 h-12 text-milkman-blue animate-spin" />
        <p className="text-milkman-blue font-bold tracking-widest uppercase">Fetching subscriptions...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="space-y-4 text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center bg-blue-50 text-milkman-blue px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase gap-2 border border-blue-100"
            >
              <Sparkles className="w-4 h-4" /> RECURRING FRESHNESS
            </motion.div>
            <h1 className="text-5xl font-black text-milkman-blue tracking-tight">Your <span className="text-milkman-red italic underline decoration-wavy underline-offset-8">Subscriptions!</span></h1>
            <p className="text-gray-500 font-bold text-sm tracking-widest uppercase">Manage Your Daily Dairy Routine</p>
          </div>
          
          <button 
            onClick={() => setShowModal(true)}
            className="bg-milkman-blue text-white px-10 py-5 rounded-full font-black text-lg hover:bg-milkman-red transition-all shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-3 group"
          >
            <PlusCircle className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" /> 
            NEW SUBSCRIPTION
          </button>
        </div>

        {subscriptions.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[3rem] border-4 border-dashed border-gray-100 shadow-xl space-y-8">
            <Calendar className="w-24 h-24 text-gray-100 mx-auto" />
            <div className="space-y-2">
              <p className="text-gray-400 text-2xl font-black italic">No active subscriptions found.</p>
              <p className="text-gray-400 text-sm font-bold tracking-widest uppercase">Start your healthy journey today!</p>
            </div>
            <button 
              onClick={() => setShowModal(true)}
              className="text-milkman-blue font-black text-lg hover:text-milkman-red transition-colors flex items-center justify-center gap-2 mx-auto group"
            >
              Subscribe Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {subscriptions.map((sub, index) => (
              <motion.div 
                key={sub.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 hover:border-milkman-blue/20 transition-all group overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 bg-milkman-red text-white text-[10px] font-black px-4 py-2 rounded-bl-3xl shadow-lg uppercase tracking-widest">
                  {sub.frequency}
                </div>
                
                <div className="flex items-center gap-6 mb-8">
                  <img 
                    src={sub.product_details.image || 'https://images.unsplash.com/photo-1550583724-125581f77833?auto=format&fit=crop&q=80&w=150'} 
                    alt={sub.product_details.name} 
                    className="w-20 h-20 object-cover rounded-2xl shadow-lg border-2 border-white group-hover:scale-110 transition-transform"
                  />
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black text-milkman-blue group-hover:text-milkman-red transition-colors line-clamp-1">{sub.product_details.name}</h3>
                    <p className="text-gray-400 font-bold text-xs tracking-widest uppercase">{sub.product_details.category_name}</p>
                  </div>
                </div>
                
                <div className="space-y-5">
                  <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl shadow-inner border border-gray-100">
                    <Clock className="w-6 h-6 text-milkman-blue" />
                    <div>
                      <p className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Start Date</p>
                      <p className="text-lg font-black text-milkman-blue">{new Date(sub.start_date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl shadow-inner border border-gray-100">
                    <Calendar className="w-6 h-6 text-milkman-red" />
                    <div>
                      <p className="text-[10px] font-black text-gray-400 tracking-widest uppercase">End Date</p>
                      <p className="text-lg font-black text-milkman-blue">{new Date(sub.end_date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                    <span className="text-sm font-black text-green-600 tracking-widest uppercase">Active Now</span>
                  </div>
                  <button className="text-gray-300 hover:text-red-500 font-black text-xs tracking-widest uppercase transition-colors p-2 hover:bg-red-50 rounded-xl">
                    CANCEL
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Subscription Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-milkman-blue/40 backdrop-blur-xl"
              onClick={() => setShowModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="bg-white max-w-lg w-full rounded-[3rem] shadow-2xl relative z-10 overflow-hidden border-t-8 border-milkman-red"
            >
              <div className="p-12 space-y-10">
                <div className="text-center space-y-4">
                  <h2 className="text-4xl font-black text-milkman-blue tracking-tight">New <span className="text-milkman-red italic underline decoration-wavy underline-offset-8 italic">Plan!</span></h2>
                  <p className="text-gray-500 font-bold text-sm tracking-widest uppercase">Daily Freshness Guaranteed</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2 group">
                    <label className="text-xs font-black text-milkman-blue tracking-widest uppercase flex items-center gap-2 group-focus-within:text-milkman-red transition-colors">
                      SELECT PRODUCT
                    </label>
                    <select
                      required
                      className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:outline-none focus:border-milkman-blue focus:bg-white transition-all font-bold text-gray-800 shadow-inner appearance-none cursor-pointer"
                      value={formData.product}
                      onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    >
                      <option value="">Choose your dairy</option>
                      {products.map(p => (
                        <option key={p.id} value={p.id}>{p.name} - ₹{p.price}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2 group">
                    <label className="text-xs font-black text-milkman-blue tracking-widest uppercase flex items-center gap-2 group-focus-within:text-milkman-red transition-colors">
                      FREQUENCY
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {['daily', 'weekly', 'monthly'].map(freq => (
                        <button
                          key={freq}
                          type="button"
                          onClick={() => setFormData({ ...formData, frequency: freq })}
                          className={`p-3 rounded-2xl font-black text-[10px] tracking-widest uppercase transition-all shadow-sm border-2 ${
                            formData.frequency === freq 
                              ? 'bg-milkman-blue text-white border-milkman-blue shadow-lg scale-105' 
                              : 'bg-gray-50 text-gray-400 border-gray-100 hover:border-milkman-blue/20'
                          }`}
                        >
                          {freq}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2 group">
                      <label className="text-xs font-black text-milkman-blue tracking-widest uppercase flex items-center gap-2 group-focus-within:text-milkman-red transition-colors">
                        START DATE
                      </label>
                      <input
                        type="date"
                        required
                        className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:outline-none focus:border-milkman-blue focus:bg-white transition-all font-bold text-gray-800 shadow-inner"
                        value={formData.start_date}
                        onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2 group">
                      <label className="text-xs font-black text-milkman-blue tracking-widest uppercase flex items-center gap-2 group-focus-within:text-milkman-red transition-colors">
                        END DATE
                      </label>
                      <input
                        type="date"
                        required
                        className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:outline-none focus:border-milkman-blue focus:bg-white transition-all font-bold text-gray-800 shadow-inner"
                        value={formData.end_date}
                        onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-milkman-red text-white py-6 rounded-3xl font-black text-xl hover:bg-milkman-blue transition-all shadow-2xl hover:shadow-milkman-blue/20 flex items-center justify-center gap-3 active:scale-95 group mt-4"
                  >
                    START SUBSCRIPTION <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Subscriptions;
