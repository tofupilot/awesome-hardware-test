"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, CheckCircle, ExternalLink } from "lucide-react";
import { translations, Locale } from "@/lib/translations";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { subscribeToNewsletter } from "@/app/actions/newsletter";

interface NewsletterSectionProps {
  lang: Locale;
}

export function NewsletterSection({ lang }: NewsletterSectionProps) {
  const t = translations[lang] || translations["en"]; // Fallback to English
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError(null);
    
    try {
      const result = await subscribeToNewsletter(email, lang);

      if (result.success) {
        setIsSubscribed(true);
        setEmail("");
      } else {
        console.error('Newsletter subscription failed:', {
          error: result.error,
          details: result.details
        });
        setError(result.error || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      console.error('Error during newsletter subscription:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <Card className="bg-zinc-800/70 border-sky-500/50 rounded-none !p-4 flex flex-col h-full text-center">
        <CardTitle className="text-lg font-mono text-sky-400">
          [NEWSLETTER]
        </CardTitle>
        <CheckCircle className="h-12 w-12 text-sky-400 mx-auto" />
        <CardDescription className="text-zinc-400 text-sm leading-relaxed font-mono">
          {t.newsletter.confirmedText}
        </CardDescription>
      </Card>
    );
  }

  return (
    <Card className="bg-zinc-800/70 border-sky-500/50 rounded-none !p-4 flex flex-col h-full">
      <CardTitle className="text-lg font-mono text-sky-400">
        [NEWSLETTER]
      </CardTitle>
      <CardDescription className="text-zinc-400 text-sm leading-relaxed font-mono flex-1">
        {t.newsletter.description}
      </CardDescription>

      {error && (
        <div className="text-red-400 text-xs font-mono mb-2">
          {error}
        </div>
      )}
      
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-2 mt-auto"
        suppressHydrationWarning={true}
      >
        <Input
          type="email"
          placeholder={t.newsletter.placeholder}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(null); // Clear error when user types
          }}
          className="flex-1 bg-zinc-900/70 border-sky-500/30 text-zinc-100 placeholder-zinc-500 font-mono focus:border-sky-500 focus:ring-sky-500/20 rounded-none text-sm"
          required
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-sky-600 hover:bg-sky-700 text-white font-mono rounded-none text-sm px-6 w-full sm:w-auto"
        >
          {isLoading ? t.newsletter.subscribing : t.newsletter.subscribe}
        </Button>
      </form>
    </Card>
  );
}
