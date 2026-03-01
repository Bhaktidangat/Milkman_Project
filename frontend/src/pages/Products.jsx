import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import ProductCard from '../components/ProductCard';
import { Filter, Loader2, Star, ShoppingBag, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          API.get('/products/products/'),
          API.get('/products/categories/'),
        ]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-4 bg-white">
        <Loader2 className="w-10 h-10 text-[#f08804] animate-spin" />
        <p className="text-sm font-medium text-gray-600">Loading your dairy collection...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 p-5 border-r border-gray-200 hidden md:block">
          <h3 className="font-bold text-sm mb-4">Categories</h3>
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => setSelectedCategory(null)}
                className={`text-sm hover:text-[#c45500] ${!selectedCategory ? 'font-bold text-[#c45500]' : 'text-[#0f1111]'}`}
              >
                All Products
              </button>
            </li>
            {categories.map(cat => (
              <li key={cat.id}>
                <button 
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-sm hover:text-[#c45500] capitalize ${selectedCategory === cat.id ? 'font-bold text-[#c45500]' : 'text-[#0f1111]'}`}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <h3 className="font-bold text-sm mb-4">Customer Review</h3>
            <div className="space-y-2">
              {[4, 3, 2, 1].map(stars => (
                <div key={stars} className="flex items-center gap-1 text-sm cursor-pointer hover:text-[#c45500]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < stars ? 'fill-[#ffa41c] text-[#ffa41c]' : 'text-gray-300'}`} />
                  ))}
                  <span className="ml-1">& Up</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="flex-1 p-5">
          <div className="mb-4 text-sm text-gray-600">
            {filteredProducts.length} results for <span className="text-[#c45500] font-bold italic">"Dairy Products"</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <ShoppingBag className="w-20 h-20 text-gray-200 mx-auto mb-4" />
              <p className="text-lg font-bold">No results found.</p>
              <p className="text-sm text-gray-500">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
