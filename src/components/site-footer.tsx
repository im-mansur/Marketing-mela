
"use client";

import Link from "next/link";
import { useMelaData } from "@/hooks/use-mela-data";

export function SiteFooter() {
    const { data } = useMelaData();
    
    // Fallback to default values if data or footer is not yet loaded.
    const footer = data?.footer || {
        line1: "Built by students, for students.",
        line2Prefix: "Powered by ",
        line2LinkText: "arketing Mela"
    };

    return (
        <footer className="py-6 md:px-8 md:py-0 bg-primary text-primary-foreground">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-center text-sm leading-loose md:text-left">
                    {footer.line1}
                </p>
                <p className="text-center text-sm leading-loose md:text-left">
                    {footer.line2Prefix}<span className="font-bold">
                        <Link href="/admin" legacyBehavior><a className="hover:underline">M</a></Link>{footer.line2LinkText}
                    </span>.
                </p>
            </div>
        </footer>
    )
}
