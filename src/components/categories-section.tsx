"use client";

import type { Category } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CategoriesSectionProps {
  categories: Category[];
  setFilter: (filter: string) => void;
  activeFilter: string;
}

export function CategoriesSection({ categories, setFilter, activeFilter }: CategoriesSectionProps) {
  const allCategories = [{ id: 'all', name: 'All', emoji: '✨' }, ...categories];
  
  return (
    <section id="categories" className="py-12 md:py-20 bg-background">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Explore Our Categories</h2>
          <p className="text-lg text-muted-foreground mt-2">Find what you love from a wide range of products.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
          {allCategories.map((category) => (
            <Card
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={cn(
                "cursor-pointer group transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-2",
                activeFilter === category.id 
                  ? "border-primary bg-primary/10 shadow-lg" 
                  : "border-border hover:border-primary/50"
              )}
            >
              <CardContent className="flex flex-col items-center justify-center p-6 gap-3">
                <span className="text-5xl transition-transform duration-300 group-hover:rotate-12">
                  {category.emoji}
                </span>
                <p className="font-semibold text-center">{category.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
