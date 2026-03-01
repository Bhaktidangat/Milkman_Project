import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { User, Mail, Lock, Phone, MapPin, Loader2, AlertCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await API.post('/accounts/register/', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.username?.[0] || 'Registration failed. Please check your inputs.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-t-8 border-milkman-red relative"
      >
        <div className="p-12 space-y-10">
          <div className="text-center space-y-4">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center bg-red-50 text-milkman-red px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase gap-2 border border-red-100"
            >
              <Sparkles className="w-4 h-4" /> START YOUR JOURNEY
            </motion.div>
            <h1 className="text-5xl font-black text-milkman-blue tracking-tight">Create <span className="text-milkman-red italic underline decoration-wavy underline-offset-8">Account!</span></h1>
            <p className="text-gray-500 font-bold text-sm tracking-widest uppercase">Pure Dairy is One Step Away</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold border border-red-100 shadow-sm animate-shake">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2 group">
              <label className="text-xs font-black text-milkman-blue tracking-widest uppercase flex items-center gap-2 group-focus-within:text-milkman-red transition-colors">
                <User className="w-4 h-4" /> USERNAME
              </label>
              <input
                type="text"
                name="username"
                required
                className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:outline-none focus:border-milkman-blue focus:bg-white transition-all font-bold text-gray-800 shadow-inner"
                placeholder="Enter username"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2 group">
              <label className="text-xs font-black text-milkman-blue tracking-widest uppercase flex items-center gap-2 group-focus-within:text-milkman-red transition-colors">
                <Mail className="w-4 h-4" /> EMAIL ADDRESS
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:outline-none focus:border-milkman-blue focus:bg-white transition-all font-bold text-gray-800 shadow-inner"
                placeholder="Enter email"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2 group">
              <label className="text-xs font-black text-milkman-blue tracking-widest uppercase flex items-center gap-2 group-focus-within:text-milkman-red transition-colors">
                <Lock className="w-4 h-4" /> PASSWORD
              </label>
              <input
                type="password"
                name="password"
                required
                className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:outline-none focus:border-milkman-blue focus:bg-white transition-all font-bold text-gray-800 shadow-inner"
                placeholder="••••••••"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2 group">
              <label className="text-xs font-black text-milkman-blue tracking-widest uppercase flex items-center gap-2 group-focus-within:text-milkman-red transition-colors">
                <Phone className="w-4 h-4" /> PHONE NUMBER
              </label>
              <input
                type="tel"
                name="phone"
                required
                className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:outline-none focus:border-milkman-blue focus:bg-white transition-all font-bold text-gray-800 shadow-inner"
                placeholder="9876543210"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2 group md:col-span-2">
              <label className="text-xs font-black text-milkman-blue tracking-widest uppercase flex items-center gap-2 group-focus-within:text-milkman-red transition-colors">
                <MapPin className="w-4 h-4" /> FULL ADDRESS
              </label>
              <textarea
                name="address"
                required
                className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:outline-none focus:border-milkman-blue focus:bg-white transition-all font-bold text-gray-800 shadow-inner min-h-[100px]"
                placeholder="Enter your complete address for delivery"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="md:col-span-2 bg-milkman-red text-white py-5 rounded-[2rem] font-black text-xl hover:bg-milkman-blue transition-all shadow-2xl hover:shadow-milkman-blue/20 disabled:opacity-50 flex items-center justify-center gap-3 active:scale-95 mt-4"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-7 h-7 animate-spin" /> CREATING ACCOUNT...
                </>
              ) : (
                'JOIN THE MILKMAN FAMILY'
              )}
            </button>
          </form>

          <div className="text-center space-y-4 pt-6">
            <p className="text-gray-400 font-bold text-sm tracking-widest uppercase">
              ALREADY A MEMBER?
            </p>
            <Link to="/login" className="text-milkman-blue font-black text-xl hover:text-milkman-red transition-colors flex items-center justify-center gap-2 group">
              Log In Instead <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
