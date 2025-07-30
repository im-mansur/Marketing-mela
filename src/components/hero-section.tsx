
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/countdown-timer";
import { SiteHeader } from "./site-header";
import type { MelaData } from "@/lib/types";
import { AppWindow, Info } from 'lucide-react';

interface HeroSectionProps {
  eventName: string;
  tagline: string;
  eventDate: string;
  logoUrl?: string;
}

export function HeroSection({ eventName, tagline, eventDate, logoUrl }: HeroSectionProps) {
  return (
    <section id="home" className="relative w-full min-h-screen flex flex-col items-center justify-center text-center overflow-hidden p-4">
      <div className="absolute inset-0 bg-background z-10" />
      
      <div className="relative z-20 flex flex-col items-center justify-center gap-8 w-full h-full">
        
        <div className="text-center">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl font-headline text-foreground">
            {eventName}
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-foreground/80 sm:text-xl md:text-2xl">
            {tagline}
          </p>
        </div>

        <div className="w-full max-w-lg space-y-6">
            <CountdownTimer targetDate={eventDate} />
            <div className="grid grid-cols-2 gap-4">
                <Button asChild size="lg" className="shadow-lg h-14 text-base">
                <Link href="#categories"><AppWindow className="mr-2 h-5 w-5"/>Explore Categories</Link>
                </Button>
                <Button asChild size="lg" variant="secondary" className="shadow-lg h-14 text-base bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="#stalls"><Info className="mr-2 h-5 w-5"/>Stall Details</Link>
                </Button>
            </div>
        </div>
        
      </div>
    </section>
  );
}
