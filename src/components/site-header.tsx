"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#categories", label: "Categories" },
  { href: "#stalls", label: "Stalls" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="w-full bg-card/80 backdrop-blur-sm shadow-lg rounded-xl mb-auto">
      <div className="container flex h-20 items-center">
        <Link href="/" className="flex items-center gap-4 font-bold text-lg text-primary">
          <Image src="/logo.png" alt="Nehru Group of Institutions" width={150} height={150} />
        </Link>
        <nav className="hidden md:flex flex-1 justify-center items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-foreground/80 transition-colors hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex md:hidden flex-1 justify-end">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium p-6">
                 <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary mb-4">
                  <Image src="/logo.png" alt="Nehru Group of Institutions" width={100} height={100} />
                </Link>
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="text-foreground/80 transition-colors hover:text-primary">
                    <SheetTrigger asChild>
                      <button>{link.label}</button>
                    </SheetTrigger>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
