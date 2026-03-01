import React from 'react';
import { ChevronUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#232f3e] text-white">
      {/* Back to top */}
      <button 
        onClick={scrollToTop}
        className="w-full bg-[#37475a] hover:bg-[#485769] py-4 text-sm font-bold transition-colors"
      >
        Back to top
      </button>

      {/* Footer Links */}
      <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 py-12 px-6">
        <div className="space-y-4">
          <h4 className="font-bold text-base">Get to Know Us</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="hover:underline cursor-pointer">About Us</li>
            <li className="hover:underline cursor-pointer">Careers</li>
            <li className="hover:underline cursor-pointer">Press Releases</li>
            <li className="hover:underline cursor-pointer">Milkman Science</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-base">Connect with Us</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="hover:underline cursor-pointer">Facebook</li>
            <li className="hover:underline cursor-pointer">Twitter</li>
            <li className="hover:underline cursor-pointer">Instagram</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-base">Make Money with Us</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="hover:underline cursor-pointer">Sell on Milkman</li>
            <li className="hover:underline cursor-pointer">Become an Affiliate</li>
            <li className="hover:underline cursor-pointer">Advertise Your Products</li>
            <li className="hover:underline cursor-pointer">Milkman Global Selling</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-base">Let Us Help You</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="hover:underline cursor-pointer">Your Account</li>
            <li className="hover:underline cursor-pointer">Returns Centre</li>
            <li className="hover:underline cursor-pointer">100% Purchase Protection</li>
            <li className="hover:underline cursor-pointer">Help</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 py-10 flex flex-col items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-wider">MILKMAN</span>
          <span className="text-milkman-red font-black text-xs mt-2 italic">.in</span>
        </div>
        <div className="flex gap-4 text-xs text-gray-300">
          <span className="border border-gray-600 px-3 py-1 rounded-sm">English</span>
          <span className="border border-gray-600 px-3 py-1 rounded-sm">India</span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#131a22] py-8 px-6 text-center space-y-2">
        <div className="flex justify-center gap-4 text-xs text-white hover:underline">
          <span className="cursor-pointer">Conditions of Use & Sale</span>
          <span className="cursor-pointer">Privacy Notice</span>
          <span className="cursor-pointer">Interest-Based Ads</span>
        </div>
        <p className="text-xs text-gray-400">© 2026, Milkman.in, Inc. or its affiliates</p>
      </div>
    </footer>
  );
};

export default Footer;
