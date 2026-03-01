import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, total } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 space-y-8 bg-gray-50">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-white p-10 rounded-full shadow-2xl border-4 border-dashed border-milkman-blue/20"
        >
          <ShoppingBag className="w-24 h-24 text-gray-200" />
        </motion.div>
        <div className="space-y-4">
          <h2 className="text-4xl font-black text-milkman-blue tracking-tight">Your Cart is <span className="text-milkman-red italic">Empty!</span></h2>
          <p className="text-gray-500 font-bold text-sm tracking-widest uppercase">Start Adding Some Fresh Dairy</p>
        </div>
        <Link to="/products" className="bg-milkman-blue text-white px-12 py-5 rounded-full font-black text-xl hover:bg-milkman-red transition-all shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-3 group">
          Go Shopping <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-10">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center bg-blue-50 text-milkman-blue px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase gap-2 border border-blue-100"
            >
              <Sparkles className="w-4 h-4" /> YOUR SELECTION
            </motion.div>
            <h1 className="text-5xl font-black text-milkman-blue tracking-tight">Shopping <span className="text-milkman-red italic">Cart</span></h1>
          </div>

          <div className="space-y-6">
            {cart.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-[2rem] shadow-xl flex flex-col sm:flex-row items-center gap-8 border border-gray-100 hover:border-milkman-blue/20 transition-all group"
              >
                <img 
                  src={item.image_url || 'https://via.placeholder.com/150'} 
                  alt={item.name} 
                  className="w-32 h-32 object-cover rounded-2xl shadow-lg group-hover:scale-105 transition-transform"
                />
                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <h3 className="text-2xl font-black text-milkman-blue">{item.name}</h3>
                  <p className="text-gray-400 font-bold text-xs tracking-widest uppercase">{item.category_name}</p>
                  <p className="text-2xl font-black text-milkman-red">₹{item.price}</p>
                </div>
                
                <div className="flex items-center bg-gray-50 rounded-full px-3 py-2 space-x-5 shadow-inner border border-gray-100">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-white p-2 rounded-full hover:bg-milkman-red hover:text-white transition-colors shadow-sm"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="font-black text-xl text-milkman-blue min-w-[2rem] text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-white p-2 rounded-full hover:bg-milkman-blue hover:text-white transition-colors shadow-sm"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-300 hover:text-red-500 transition-colors p-3 hover:bg-red-50 rounded-full"
                >
                  <Trash2 className="w-6 h-6" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-10 rounded-[2.5rem] shadow-2xl border-t-8 border-milkman-blue sticky top-24 space-y-10"
          >
            <h2 className="text-3xl font-black text-milkman-blue tracking-tight">Order <span className="text-milkman-red">Summary</span></h2>
            
            <div className="space-y-6 font-bold text-gray-600">
              <div className="flex justify-between items-center text-sm tracking-widest uppercase">
                <span>Subtotal</span>
                <span className="text-milkman-blue">₹{total}</span>
              </div>
              <div className="flex justify-between items-center text-sm tracking-widest uppercase">
                <span>Delivery Fee</span>
                <span className="text-green-500">FREE</span>
              </div>
              <div className="h-px bg-gray-100"></div>
              <div className="flex justify-between items-center text-3xl font-black text-milkman-blue">
                <span>Total</span>
                <span className="text-milkman-red">₹{total}</span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-milkman-blue text-white py-6 rounded-2xl font-black text-xl hover:bg-milkman-red transition-all shadow-xl hover:shadow-milkman-red/20 flex items-center justify-center gap-3 active:scale-95 group"
            >
              PROCEED TO CHECKOUT <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <p className="text-[10px] text-gray-400 font-bold text-center tracking-widest uppercase px-4">
              SECURE PAYMENTS POWERED BY MILKMAN DAIRY PLATFORM
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
