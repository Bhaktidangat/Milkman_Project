import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import API from '../api/axios';
import { CreditCard, Smartphone, Banknote, Loader2, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Checkout = () => {
  const { cart, total, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const items = cart.map(item => ({ id: item.id, quantity: item.quantity }));
      await API.post('/orders/orders/checkout/', { items, payment_method: paymentMethod });
      setSuccess(true);
      clearCart();
    } catch (err) {
      console.error('Checkout failed:', err);
      alert('Checkout failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6 overflow-hidden relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full text-center space-y-12 bg-gray-50 p-20 rounded-[4rem] shadow-2xl border-t-8 border-milkman-blue relative z-10"
        >
          <div className="bg-green-500 w-32 h-32 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce border-8 border-white">
            <CheckCircle2 className="w-20 h-20 text-white" />
          </div>
          <div className="space-y-4">
            <h1 className="text-6xl font-black text-milkman-blue tracking-tight">Thank <span className="text-milkman-red italic">You!</span></h1>
            <p className="text-2xl font-bold text-gray-500">Your order has been placed successfully!</p>
          </div>
          <p className="text-gray-400 font-bold text-sm tracking-widest uppercase">
            Freshness is on its way to your doorstep.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="bg-milkman-blue text-white px-12 py-6 rounded-3xl font-black text-xl hover:bg-milkman-red transition-all shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-3 group mx-auto"
          >
            CONTINUE SHOPPING <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
          <div className="absolute top-10 left-10 bg-milkman-blue w-64 h-64 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 bg-milkman-red w-64 h-64 rounded-full blur-3xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-12">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center bg-blue-50 text-milkman-blue px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase gap-2 border border-blue-100"
            >
              <Sparkles className="w-4 h-4" /> SECURE CHECKOUT
            </motion.div>
            <h1 className="text-5xl font-black text-milkman-blue tracking-tight">Final <span className="text-milkman-red italic underline decoration-wavy underline-offset-8">Step!</span></h1>
          </div>

          <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-gray-100 space-y-10">
            <h2 className="text-3xl font-black text-milkman-blue">Payment <span className="text-milkman-red">Options</span></h2>
            
            <div className="space-y-0">
              {[
                { id: 'upi', label: 'UPI / Net Banking', icon: Smartphone, color: 'text-purple-600' },
                { id: 'card', label: 'Debit / Credit Card', icon: CreditCard, color: 'text-blue-600' },
                { id: 'cod', label: 'Cash on Delivery', icon: Banknote, color: 'text-green-600' }
              ].map((method) => (
                <label 
                  key={method.id}
                  className={`flex items-center gap-6 p-6 rounded-3xl border-2 transition-all cursor-pointer group hover:shadow-xl ${
                    paymentMethod === method.id 
                      ? 'bg-milkman-blue/5 border-milkman-blue' 
                      : 'bg-gray-50 border-gray-100 hover:border-milkman-blue/20'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="payment" 
                    className="w-6 h-6 text-milkman-blue focus:ring-milkman-blue border-gray-300"
                    checked={paymentMethod === method.id}
                    onChange={() => setPaymentMethod(method.id)}
                  />
                  <div className={`p-4 rounded-2xl bg-white shadow-sm group-hover:scale-110 transition-transform ${method.color}`}>
                    <method.icon className="w-8 h-8" />
                  </div>
                  <span className="text-xl font-black text-milkman-blue">{method.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-12 rounded-[3rem] shadow-2xl border-t-8 border-milkman-blue flex flex-col h-full"
          >
            <h2 className="text-3xl font-black text-milkman-blue tracking-tight">Final <span className="text-milkman-red italic">Total</span></h2>
            
            <div className="flex-grow space-y-6">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center group">
                  <div className="space-y-1">
                    <p className="text-lg font-black text-milkman-blue group-hover:text-milkman-red transition-colors">{item.name}</p>
                    <p className="text-gray-400 font-bold text-xs tracking-widest uppercase">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-xl font-black text-milkman-blue">₹{item.price * item.quantity}</p>
                </div>
              ))}
              
              <div className="h-px bg-gray-100 my-8"></div>
              
              <div className="flex justify-between items-center text-sm tracking-widest uppercase font-black text-gray-400">
                <span>Subtotal</span>
                <span className="text-milkman-blue">₹{total}</span>
              </div>
              <div className="flex justify-between items-center text-sm tracking-widest uppercase font-black text-gray-400">
                <span>Delivery</span>
                <span className="text-green-500 italic">FREE</span>
              </div>
              
              <div className="flex justify-between items-center text-4xl font-black text-milkman-blue pt-4">
                <span>Total</span>
                <span className="text-milkman-red">₹{total}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={submitting}
              className="block z-10 w-full bg-milkman-blue text-white py-7 rounded-3xl font-black text-2xl hover:bg-milkman-red transition-all shadow-2xl hover:shadow-milkman-red/20 disabled:opacity-50 flex items-center justify-center gap-4 active:scale-95 group"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-8 h-8 animate-spin" /> PROCESSING...
                </>
              ) : (
                <>
                  PAY ₹{total} <ArrowRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            
            <div className="flex items-center justify-center gap-2 text-gray-400 font-black text-[10px] tracking-[0.2em] uppercase">
              <Sparkles className="w-4 h-4 text-milkman-red" /> 100% SECURE & ENCRYPTED
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
