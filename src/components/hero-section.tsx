
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/countdown-timer";
import { SiteHeader } from "./site-header";
import type { MelaData } from "@/lib/types";

interface HeroSectionProps {
  eventName: string;
  tagline: string;
  eventDate: string;
  logoUrl?: string;
}

export function HeroSection({ eventName, tagline, eventDate, logoUrl }: HeroSectionProps) {
  return (
    <section id="home" className="relative w-full min-h-screen flex flex-col items-center justify-start text-center overflow-hidden py-8">
      <div className="absolute inset-0 bg-background/50 z-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"/>
      
      <div className="container relative z-20 flex flex-col items-center gap-6 h-full">
        <SiteHeader logoUrl={logoUrl}/>
        <div className="flex-grow flex flex-col items-center justify-center">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            {eventName}
          </h1>
          <p className="max-w-[700px] text-foreground/80 md:text-xl">
            {tagline}
          </p>
          <CountdownTimer targetDate={eventDate} />
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="shadow-lg">
              <Link href="#categories">Explore Categories</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="shadow-lg">
              <Link href="#stalls">Stall Details</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
