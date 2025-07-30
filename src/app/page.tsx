
"use client";

import { useState } from "react";
import { useMelaData } from "@/hooks/use-mela-data";

import { HeroSection } from "@/components/hero-section";
import { CategoriesSection } from "@/components/categories-section";
import { ProductsSection } from "@/components/products-section";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";
import { ConfettiTrigger } from "@/components/confetti-trigger";
import { Skeleton } from "@/components/ui/skeleton";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  const { data, isLoading } = useMelaData();
  const [filter, setFilter] = useState<string>('all');
  
  if (isLoading || !data) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 text-center p-4">
            <Skeleton className="h-12 w-80" />
            <Skeleton className="h-6 w-64" />
            <div className="w-full max-w-lg mt-8 space-y-6">
              <Skeleton className="h-36 w-full" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="container mt-4">
        <SiteHeader/>
      </div>
      <main className="flex-1">
        <HeroSection 
          eventName={data.eventName} 
          tagline={data.tagline} 
          eventDate={data.eventDate}
          logoUrl={data.logoUrl}
        />
        <CategoriesSection 
          categories={data.categories}
          setFilter={setFilter}
          activeFilter={filter}
        />
        <ProductsSection 
          products={data.products}
          stalls={data.stalls}
          categories={data.categories}
          filter={filter}
          setFilter={setFilter}
        />
        <AboutSection about={data.about} />
        <ContactSection contact={data.contact} />
      </main>
      <SiteFooter />
      <ConfettiTrigger />
    </div>
  );
}
