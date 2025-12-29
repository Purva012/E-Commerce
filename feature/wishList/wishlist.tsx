"use client"

import React from "react";
import { ShoppingCart, Trash2, ArrowLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useWishlistStore } from "@/store/wishlist.store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CartPage(): React.ReactElement {
  const cartItems = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);
  const router = useRouter();

  const handleRemoveItem = (id: string) => {
    removeItem(id);
    toast.success("Removed from wishlist");
  };

  const handleContinueShopping = () => {
    router.push("/");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to get started!</p>
          <Button 
            className="bg-gray-900"
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <button
          onClick={handleContinueShopping}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Continue Shopping</span>
        </button>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Wishlist</h1>
          <div className="flex items-center gap-2 text-gray-600">
            <ShoppingCart className="w-5 h-5" />
            <span className="font-medium">{cartItems.length} items</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Wishlist Items</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cartItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow relative overflow-hidden">
                <div className="relative">
                  <div className="p-6 bg-gray-50 flex items-center justify-center h-64">
                    <img
                      src={item.image}
                      className="max-h-full max-w-full object-contain"
                      alt={item.name}
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full hover:bg-red-50 transition shadow-md"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>

                <CardContent className="p-4">
                  <Badge variant="secondary" className="text-xs mb-3 text-gray-600">
                    {item.category}
                  </Badge>
                  
                  <h3 className="font-semibold text-base mb-3 line-clamp-2 text-gray-900">
                    {item.name}
                  </h3>

                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < 4
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">(500)</span>
                  </div>

                  <div className="mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <Button
                    className="w-full bg-gray-900 hover:bg-gray-800"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Move to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}