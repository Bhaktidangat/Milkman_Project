import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError('Invalid username or password. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border-t-8 border-milkman-blue"
      >
        <div className="p-10 space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-black text-milkman-blue tracking-tight">Welcome <span className="text-milkman-red italic">Back!</span></h1>
            <p className="text-gray-500 font-bold text-sm tracking-widest uppercase">Dairy Freshness Awaits</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm font-bold border border-red-100 shadow-sm animate-shake">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 group">
              <label className="text-xs font-black text-milkman-blue tracking-widest uppercase flex items-center gap-2 group-focus-within:text-milkman-red transition-colors">
                <Mail className="w-4 h-4" /> USERNAME
              </label>
              <input
                type="text"
                required
                className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-xl focus:outline-none focus:border-milkman-blue focus:bg-white transition-all font-bold text-gray-800 shadow-inner"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="space-y-2 group">
              <label className="text-xs font-black text-milkman-blue tracking-widest uppercase flex items-center gap-2 group-focus-within:text-milkman-red transition-colors">
                <Lock className="w-4 h-4" /> PASSWORD
              </label>
              <input
                type="password"
                required
                className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-xl focus:outline-none focus:border-milkman-blue focus:bg-white transition-all font-bold text-gray-800 shadow-inner"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-milkman-blue text-white py-5 rounded-xl font-black text-lg hover:bg-milkman-red transition-all shadow-xl hover:shadow-milkman-red/20 disabled:opacity-50 flex items-center justify-center gap-3 active:scale-95"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" /> LOGGING IN...
                </>
              ) : (
                'SECURE LOGIN'
              )}
            </button>
          </form>

          <div className="text-center space-y-4 pt-4">
            <p className="text-gray-400 font-bold text-sm tracking-widest uppercase">
              NEW TO MILKMAN?
            </p>
            <Link to="/register" className="text-milkman-blue font-black text-lg hover:text-milkman-red transition-colors flex items-center justify-center gap-2 group">
              Join the Family <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
