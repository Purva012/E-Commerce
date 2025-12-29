import { ShoppingBag, Heart, ShoppingCart } from 'lucide-react';

export default function Navbar() {
  return (
    <div className="bg-white border-b px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-8 h-8" />
          <h1 className="text-2xl font-bold">E-Store</h1>
        </div>
        <div className="flex items-center gap-4">
          <Heart className="w-6 h-6 cursor-pointer" />
          <ShoppingCart className="w-6 h-6 cursor-pointer " />
        </div>
      </div>
    </div>
  );
}