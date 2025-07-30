"use client";

import type { Product, Stall, Category } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Star, Store } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product;
  stall?: Stall;
  category?: Category;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const RatingStars = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );

export function ProductDetailModal({ product, stall, category, isOpen, onOpenChange }: ProductDetailModalProps) {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-[600px] grid-rows-[auto_1fr] p-0"
      >
        <DialogHeader className="p-6 pb-0">
            <div className='relative w-full h-64 rounded-t-lg overflow-hidden mb-4'>
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill={true}
                  className="object-cover" 
                  data-ai-hint={product['data-ai-hint']}
                />
            </div>
          <div className="flex justify-between items-start">
            <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
            <Badge variant="outline" className="text-sm">{category?.name || 'Category'}</Badge>
          </div>
          <DialogDescription className="text-base">{product.description}</DialogDescription>
        </DialogHeader>
        <div className="p-6 pt-2 grid gap-4">
            <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-primary">₹{product.price}</span>
                <RatingStars rating={product.rating} />
            </div>
            {stall && (
              <div className="bg-secondary/50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg flex items-center gap-2"><Store className="w-5 h-5 text-accent"/>Stall Information</h3>
                <p className="font-bold text-primary">Stall #{stall.stallNumber}: {stall.name}</p>
                <p className="text-sm text-muted-foreground">Owner: {stall.owner}</p>
                <p className="text-sm mt-1">{stall.description}</p>
              </div>
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
