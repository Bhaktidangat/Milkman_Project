import React from 'react';
import { ShoppingCart, Star, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-milkman-white border border-milkman-light-blue rounded-lg p-4 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
      {/* Product Image */}
      <div className="relative h-48 mb-4 flex items-center justify-center overflow-hidden rounded-md">
        <img 
          src={product.image_url || product.image || 'https://via.placeholder.com/200'} 
          alt={product.name} 
          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform"
        />
      </div>
      
      {/* Product Details */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-base text-gray-800 font-semibold line-clamp-2 hover:text-milkman-dark-blue mb-1">
          {product.name}
        </h3>
        
        {/* Rating Simulation */}
        <div className="flex items-center gap-1 mb-1 text-milkman-dark-blue">
          <div className="flex">
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
          </div>
          <span className="text-xs text-gray-500">(1,240)</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-sm font-medium self-start mt-1 text-gray-700">₹</span>
          <span className="text-2xl font-bold text-gray-900">{Math.floor(product.price)}</span>
          <span className="text-sm font-medium text-gray-700">{ (product.price % 1).toFixed(2).substring(2) }</span>
        </div>

        {/* Delivery Info */}
        <div className="text-xs text-gray-600 mb-4">
          Get it by <span className="font-bold text-gray-800">Tomorrow, 7 AM</span>
          <br />
          FREE Delivery by Milkman
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          className="mt-auto w-full bg-milkman-primary-blue hover:bg-milkman-dark-blue text-milkman-white font-semibold py-2 rounded-md transition-colors shadow-sm active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
