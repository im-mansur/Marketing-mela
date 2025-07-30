
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
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center">
            <Skeleton className="h-6 w-32" />
            <div className="flex flex-1 items-center justify-end space-x-4">
              <Skeleton className="h-6 w-48 hidden md:block" />
              <Skeleton className="h-8 w-8 md:hidden" />
            </div>
          </div>
        </header>
        <main className="flex-1">
          <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10 min-h-[calc(100vh-4rem)]">
            <div className="flex flex-col items-center gap-4 text-center">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-24 w-full max-w-2xl mt-4" />
              <div className="flex gap-4 mt-4">
                <Skeleton className="h-10 w-36" />
                <Skeleton className="h-10 w-36" />
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
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
