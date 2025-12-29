'use client';

import { ShoppingBag, Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';

export default function Navbar() {
  const router = useRouter();
  const itemCount = useCartStore((state) => state.getItemCount());
  
  return (
    <div className="bg-white border-b px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <ShoppingBag className="w-8 h-8 text-gray-900" />
          <h1 className="text-2xl font-bold text-gray-900">E-Store</h1>
        </Link>
        <div className="flex items-center gap-4">
          <Heart className="w-6 h-6 cursor-pointer hover:text-blue-500 transition text-gray-900"
          onClick={() => router.push('/Wishlist')} />
          <div className="relative">
            <ShoppingCart 
              className="w-6 h-6 cursor-pointer hover:text-blue-500 transition text-gray-900" 
              onClick={() => router.push('/AddToCart')}
            />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}