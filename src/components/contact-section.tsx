"use client";

import type { MelaData } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import * as LucideIcons from "lucide-react";

interface ContactSectionProps {
  contact: MelaData['contact'];
}

export function ContactSection({ contact }: ContactSectionProps) {
  return (
    <section id="contact" className="py-12 md:py-20 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Get In Touch</h2>
          <p className="text-lg text-muted-foreground mt-2">We'd love to hear from you!</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <LucideIcons.Mail className="w-12 h-12 mx-auto text-primary" />
              <CardTitle>Email Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Send your queries to our team.</p>
              <Button variant="link" asChild className="text-accent text-lg p-0 h-auto">
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </Button>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <LucideIcons.Phone className="w-12 h-12 mx-auto text-primary" />
              <CardTitle>Call Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Talk to our event coordinators.</p>
              <Button variant="link" asChild className="text-accent text-lg p-0 h-auto">
                <a href={`tel:${contact.phone}`}>{contact.phone}</a>
              </Button>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <LucideIcons.Share2 className="w-12 h-12 mx-auto text-primary" />
              <CardTitle>Follow Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Stay updated on social media.</p>
              <div className="flex justify-center gap-4 mt-2">
                {contact.socials.map((social) => {
                  const Icon = (LucideIcons as any)[social.icon];
                  return (
                    <Button key={social.name} variant="outline" size="icon" asChild>
                      <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                        {Icon && <Icon className="w-5 h-5" />}
                      </a>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
