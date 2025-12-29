"use client"

import React, { useState, useEffect, useMemo } from "react";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FilterCheckboxProps, Filters, Product, ProductCardProps } from "./types/products";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlist.store";
import { toast } from "sonner";

export default function ProductListingPage(): React.ReactElement {
  const [products, setProducts] = useState<Product[]>([]);
  
  const [filters, setFilters] = useState<Filters>({
    electronics: false,
    jewelery: false,
    mensClothing: false,
    womensClothing: false,
    under50: false,
    fiftyTo100: false,
    oneHundredTo200: false,
    over200: false,
    rating4Plus: false,
    rating3Plus: false,
    rating2Plus: false,
    rating1Plus: false,
  });

  useEffect(() => {
    const fetchProducts = async () => {
        const response = await fetch("https://fakestoreapi.com/products");
        const data: Product[] = await response.json();
        setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (filterName: keyof Filters) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryFilters = [
        filters.electronics,
        filters.jewelery,
        filters.mensClothing,
        filters.womensClothing,
      ];
      const anyCategorySelected = categoryFilters.some(Boolean);

      if (anyCategorySelected) {
        let matchesCategory = false;
        if (filters.electronics && product.category === "electronics") matchesCategory = true;
        if (filters.jewelery && product.category === "jewelery") matchesCategory = true;
        if (filters.mensClothing && product.category === "men's clothing") matchesCategory = true;
        if (filters.womensClothing && product.category === "women's clothing") matchesCategory = true;
        
        if (!matchesCategory) return false;
      }

      const priceFilters = [
        filters.under50,
        filters.fiftyTo100,
        filters.oneHundredTo200,
        filters.over200,
      ];
      const anyPriceSelected = priceFilters.some(Boolean);

      if (anyPriceSelected) {
        let matchesPrice = false;
        if (filters.under50 && product.price < 50) matchesPrice = true;
        if (filters.fiftyTo100 && product.price >= 50 && product.price < 100) matchesPrice = true;
        if (filters.oneHundredTo200 && product.price >= 100 && product.price < 200) matchesPrice = true;
        if (filters.over200 && product.price >= 200) matchesPrice = true;
        
        if (!matchesPrice) return false;
      }

      if (filters.rating4Plus && product.rating.rate < 4) return false;
      if (filters.rating3Plus && product.rating.rate < 3) return false;
      if (filters.rating2Plus && product.rating.rate < 2) return false;
      if (filters.rating1Plus && product.rating.rate < 1) return false;

      return true;
    });
  }, [products, filters]);

  const clearAllFilters = () => {
    setFilters({
      electronics: false,
      jewelery: false,
      mensClothing: false,
      womensClothing: false,
      under50: false,
      fiftyTo100: false,
      oneHundredTo200: false,
      over200: false,
      rating4Plus: false,
      rating3Plus: false,
      rating2Plus: false,
      rating1Plus: false,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto flex gap-6 p-6">
        <div className="w-64">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-4 text-gray-900">Filters</h3>

              <h4 className="font-semibold mb-3 text-sm text-gray-900">Category</h4>
              <div className="space-y-3 mb-6 text-gray-900">
                <FilterCheckbox
                  id="electronics"
                  label="Electronics"
                  checked={filters.electronics}
                  onChange={() => handleFilterChange("electronics")}
                />
                <FilterCheckbox
                  id="jewelery"
                  label="Jewelery"
                  checked={filters.jewelery}
                  onChange={() => handleFilterChange("jewelery")}
                />
                <FilterCheckbox
                  id="mensClothing"
                  label="Men's Clothing"
                  checked={filters.mensClothing}
                  onChange={() => handleFilterChange("mensClothing")}
                />
                <FilterCheckbox
                  id="womensClothing"
                  label="Women's Clothing"
                  checked={filters.womensClothing}
                  onChange={() => handleFilterChange("womensClothing")}
                />
              </div>

              <h4 className="font-semibold mb-3 text-sm text-gray-900">Price Range</h4>
              <div className="space-y-3 mb-6 text-gray-900">
                <FilterCheckbox
                  id="under50"
                  label="Under $50"
                  checked={filters.under50}
                  onChange={() => handleFilterChange("under50")}
                />
                <FilterCheckbox
                  id="fiftyTo100"
                  label="$50 - $100"
                  checked={filters.fiftyTo100}
                  onChange={() => handleFilterChange("fiftyTo100")}
                />
                <FilterCheckbox
                  id="oneHundredTo200"
                  label="$100 - $200"
                  checked={filters.oneHundredTo200}
                  onChange={() => handleFilterChange("oneHundredTo200")}
                />
                <FilterCheckbox
                  id="over200"
                  label="Over $200"
                  checked={filters.over200}
                  onChange={() => handleFilterChange("over200")}
                />
              </div>

              <h4 className="font-semibold mb-3 text-sm text-gray-900">Rating</h4>
              <div className="space-y-3 mb-6 text-gray-900">
                <FilterCheckbox
                  id="rating4Plus"
                  label="4+ Stars"
                  checked={filters.rating4Plus}
                  onChange={() => handleFilterChange("rating4Plus")}
                />
                <FilterCheckbox
                  id="rating3Plus"
                  label="3+ Stars"
                  checked={filters.rating3Plus}
                  onChange={() => handleFilterChange("rating3Plus")}
                />
                 <FilterCheckbox
                  id="rating4Plus"
                  label="2+ Stars"
                  checked={filters.rating2Plus}
                  onChange={() => handleFilterChange("rating2Plus")}
                />
                <FilterCheckbox
                  id="rating1Plus"
                  label="1+ Stars"
                  checked={filters.rating1Plus}
                  onChange={() => handleFilterChange("rating1Plus")}
                />
              </div>

              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={clearAllFilters}
              >
                Clear All Filters
              </Button>
            </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-700">
              Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> products
            </p>
          </div>
          <ScrollArea className="h-[calc(100vh-240px)]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pr-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

const FilterCheckbox: React.FC<FilterCheckboxProps> = ({ id, label, checked, onChange }): React.ReactElement => {
  return (
    <div className="flex items-center gap-3 py-1">
      <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
      <label htmlFor={id} className="text-sm cursor-pointer flex-1">
        {label}
      </label>
    </div>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({ product }): React.ReactElement => {
  const addItem = useCartStore((state) => state.addItem);
  const wishlistItems = useWishlistStore((state) => state.items);
  const addToWishlist = useWishlistStore((state) => state.addItem);
  const removeFromWishlist = useWishlistStore((state) => state.removeItem);
  
  const [isAdding, setIsAdding] = useState(false);
  
  // Check if product is in wishlist
  const isInWishlist = wishlistItems.some((item) => item.id === product.id.toString());

  const handleAddToCart = () => {
    setIsAdding(true);
    
    addItem({
      id: product.id.toString(),
      name: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
    });

    setTimeout(() => {
      setIsAdding(false);
      toast.success("Added to cart!");
    }, 300);
  };

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      // Remove from wishlist
      removeFromWishlist(product.id.toString());
      toast.success("Removed from wishlist");
    } else {
      // Add to wishlist with quantity 1
      addToWishlist({
        id: product.id.toString(),
        name: product.title,
        price: product.price,
        quantity: 1,
        image: product.image,
        category: product.category,
      });
      toast.success("Added to wishlist!");
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow rounded-lg overflow-hidden h-full flex flex-col relative">
      <div className="p-4 bg-gray-50 flex items-center justify-center h-48">
        <img
          src={product.image}
          className="max-h-full max-w-full object-contain"
          alt={product.title}
        />
        <button 
          onClick={handleToggleWishlist}
          className="absolute top-2 right-2 p-2 bg-white rounded-full hover:bg-gray-100 transition shadow-sm"
        > 
          <Heart 
            className={`w-5 h-5 transition-colors ${
              isInWishlist ? "fill-red-500 text-red-500" : "text-gray-700"
            }`}
          />
        </button>
      </div>
      
      <CardContent className="p-4 flex-1 flex flex-col">
        <Badge variant="secondary" className="text-xs mb-2 w-fit text-gray-600">
          {product.category}
        </Badge>
        
        <h3 className="text-sm font-semibold mb-2 line-clamp-2 text-gray-900 hover:text-blue-600 cursor-pointer">
          {product.title}
        </h3>

        <div className="flex items-center gap-2 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < Math.floor(product.rating.rate)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-xs text-gray-600">
            ({product.rating.count})
          </span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </CardContent>

      <CardFooter className="px-4 pb-4 pt-0">
        <Button 
          className="w-full flex items-center gap-2 justify-center bg-gray-900"
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          <ShoppingCart className="w-4 h-4" />
          {isAdding ? "Adding..." : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
};