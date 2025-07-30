"use client";

import type { MelaData } from "@/lib/types";

interface AboutSectionProps {
  about: MelaData['about'];
}

export function AboutSection({ about }: AboutSectionProps) {
  return (
    <section id="about" className="py-12 md:py-20 bg-background">
      <div className="container max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-headline">{about.title}</h2>
        <div className="mt-6 text-lg text-foreground/80 leading-relaxed max-w-prose mx-auto">
          <p>{about.content}</p>
        </div>
      </div>
    </section>
  );
}
