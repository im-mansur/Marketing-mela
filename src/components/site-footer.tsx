
"use client";

import Link from "next/link";

export function SiteFooter() {
    return (
        <footer className="py-6 md:px-8 md:py-0 bg-primary text-primary-foreground">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-center text-sm leading-loose md:text-left">
                    Built by students, for students. © {new Date().getFullYear()} Nehru Group of Institutions.
                </p>
                <p className="text-center text-sm leading-loose md:text-left">
                    Powered by <span className="font-bold">
                        <Link href="/admin" legacyBehavior><a className="hover:underline">M</a></Link>arketing Mela
                    </span>.
                </p>
            </div>
        </footer>
    )
}
