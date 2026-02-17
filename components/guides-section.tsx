"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { guides } from "@/lib/data";

export function GuidesSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="guides"
      className="relative py-24 md:py-32"
      aria-label="Connect with local guides"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div
          ref={ref}
          className={`mb-12 text-center transition-all duration-700 md:mb-16 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="mb-3 text-sm font-medium tracking-[0.3em] uppercase text-accent">
            Local Companions
          </p>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-5xl text-balance">
            Connect with Local Guides
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-foreground/60 text-pretty">
            Explore Kashi through the eyes of those who know it best. Our
            verified local guides offer heritage walks, food tours, spiritual
            journeys, and photography experiences.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {guides.map((guide, i) => (
            <GuideCard key={guide.id} guide={guide} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 border border-accent bg-accent/10 px-8 py-4 text-sm font-semibold tracking-widest uppercase text-accent transition-all duration-500 hover:bg-accent hover:text-accent-foreground"
          >
            View All Guides
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function GuideCard({
  guide,
  index,
}: {
  guide: (typeof guides)[number];
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <Link
      href={`/guides/${guide.id}`}
      ref={ref}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-border bg-card/50 transition-all duration-700 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={guide.image}
          alt={guide.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-serif text-xl font-bold text-foreground">
            {guide.name}
          </h3>
          <p className="mt-1 text-xs text-foreground/60">
            {guide.specializations.join(" / ")}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < Math.round(guide.rating)
                      ? "text-accent"
                      : "text-border"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {guide.rating} ({guide.reviewCount})
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
