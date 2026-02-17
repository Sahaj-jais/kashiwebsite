"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { unexploredPlaces, unexploredCategories } from "@/lib/data";

export function ExploreSection() {
  const { ref, isVisible } = useScrollReveal();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? unexploredPlaces.filter((p) => p.categorySlug === activeCategory)
    : unexploredPlaces;

  return (
    <section
      id="explore"
      className="relative bg-secondary py-24 md:py-32"
      aria-label="Explore the unexplored aspects of Kashi"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div
          ref={ref}
          className={`mb-12 text-center transition-all duration-700 md:mb-16 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="mb-3 text-sm font-medium tracking-[0.3em] uppercase text-accent">
            The Main Highlight
          </p>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-5xl text-balance">
            The Unexplored Kashi
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-foreground/60 text-pretty">
            Beyond the well-trodden tourist paths lies another Kashi entirely.
            Click any topic to discover, learn, and dive deeper into the hidden
            soul of the world{"'"}s oldest living city.
          </p>
        </div>

        {/* Category filter chips */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setActiveCategory(null)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
              activeCategory === null
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-card/50 text-foreground/60 hover:border-accent/50 hover:text-foreground"
            }`}
          >
            All
          </button>
          {unexploredCategories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() =>
                setActiveCategory(
                  activeCategory === cat.slug ? null : cat.slug
                )
              }
              className={`rounded-full border px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeCategory === cat.slug
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-card/50 text-foreground/60 hover:border-accent/50 hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((place, index) => (
            <PlaceCard key={place.slug} place={place} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Individual explore card with Step 1 & Step 2 ----------
function PlaceCard({
  place,
  index,
}: {
  place: (typeof unexploredPlaces)[number];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <article
      ref={ref}
      className={`group flex flex-col overflow-hidden border border-border bg-card transition-all duration-700 hover:border-accent/50 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={place.image}
          alt={place.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
        <span className="absolute top-4 left-4 bg-accent/90 px-3 py-1 text-xs font-semibold tracking-wider uppercase text-accent-foreground">
          {place.category}
        </span>
      </div>

      {/* Step 1 — Brief intro */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 font-serif text-lg font-bold text-card-foreground md:text-xl">
          {place.title}
        </h3>
        <p className="mb-1 text-sm leading-relaxed text-card-foreground/70">
          {place.intro}
        </p>

        {/* Cultural importance tag */}
        <p className="mt-2 text-xs italic text-accent/80">
          {place.whyUnexplored}
        </p>

        {/* Expandable deeper content */}
        <div
          className={`overflow-hidden transition-all duration-500 ${
            expanded ? "mt-4 max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-border pt-4">
            <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent">
              Cultural Importance
            </h4>
            <p className="mb-3 text-sm leading-relaxed text-card-foreground/60">
              {place.culturalImportance}
            </p>
            <p className="text-sm leading-relaxed text-card-foreground/50">
              {place.fullStory.slice(0, 200)}...
            </p>
          </div>
        </div>

        {/* Step 2 — Actions */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent/80"
            aria-expanded={expanded}
          >
            {expanded ? "Less" : "Learn More"}
            <svg
              className={`h-3 w-3 transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <span className="text-border">|</span>
          <Link
            href={`/explore/${place.slug}`}
            className="text-sm font-medium text-foreground/50 transition-colors hover:text-accent"
          >
            Full Story
          </Link>
          <span className="text-border">|</span>
          <Link
            href={`/guides?topic=${place.categorySlug}`}
            className="text-sm font-medium text-foreground/50 transition-colors hover:text-accent"
          >
            Book Guide
          </Link>
        </div>
      </div>
    </article>
  );
}
