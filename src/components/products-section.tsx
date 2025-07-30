"use client";

import { useState, useMemo } from 'react';
import type { Product, Stall, Category } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { ProductDetailModal } from './product-detail-modal';

interface ProductsSectionProps {
  products: Product[];
  stalls: Stall[];
  categories: Category[];
  filter: string;
  setFilter: (filter: string) => void;
}

const RatingStars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ))}
  </div>
);

export function ProductsSection({ products, stalls, categories, filter, setFilter }: ProductsSectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    if (filter === 'all') return products;
    return products.filter((product) => product.categoryId === filter);
  }, [filter, products]);

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || 'N/A';
  }

  return (
    <section id="stalls" className="py-12 md:py-20 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Featured Products</h2>
          <p className="text-lg text-muted-foreground mt-2">Discover unique items from our talented vendors.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <CardHeader className="p-0 relative">
                <Badge variant="secondary" className="absolute top-3 right-3 z-10 bg-primary/80 text-primary-foreground">
                  Stall #{product.stallNumber}
                </Badge>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={600}
                  height={400}
                  data-ai-hint={product['data-ai-hint']}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </CardHeader>
              <CardContent className="p-4 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg font-bold">{product.name}</CardTitle>
                    <Badge variant="outline">{getCategoryName(product.categoryId)}</Badge>
                </div>
                <p className="text-muted-foreground text-sm flex-grow">{product.description}</p>
              </CardContent>
              <CardFooter className="p-4 flex justify-between items-center bg-muted/50">
                <div className="flex flex-col">
                    <span className="text-xl font-bold text-primary">₹{product.price}</span>
                    <RatingStars rating={product.rating} />
                </div>
                <Button variant="default" onClick={() => setSelectedProduct(product)}>View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            <p>No products found in this category.</p>
            <Button variant="link" onClick={() => setFilter('all')}>View all products</Button>
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          stall={stalls.find(s => s.stallNumber === selectedProduct.stallNumber)}
          category={categories.find(c => c.id === selectedProduct.categoryId)}
          isOpen={!!selectedProduct}
          onOpenChange={(open) => !open && setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
