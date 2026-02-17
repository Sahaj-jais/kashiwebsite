import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { unexploredPlaces, guides } from "@/lib/data";

export async function generateStaticParams() {
  return unexploredPlaces.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const place = unexploredPlaces.find((p) => p.slug === slug);
  if (!place) return { title: "Not Found" };
  return {
    title: `${place.title} | Unexplored Kashi`,
    description: place.intro,
  };
}

export default async function ExploreDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const place = unexploredPlaces.find((p) => p.slug === slug);
  if (!place) notFound();

  const relatedGuides = guides.filter((g) =>
    place.relatedGuideIds.includes(g.id)
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            href="/#explore"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70 transition-colors hover:text-accent"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Explore
          </Link>
          <Link
            href="/"
            className="font-serif text-lg font-bold text-accent"
          >
            Kashi
          </Link>
        </div>
      </div>

      {/* Hero image */}
      <header className="relative pt-16">
        <div className="relative aspect-[21/9] w-full">
          <Image
            src={place.image}
            alt={place.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>

        <div className="relative mx-auto -mt-20 max-w-3xl px-6">
          <span className="mb-3 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
            {place.category}
          </span>
          <h1 className="font-serif text-3xl font-bold leading-tight text-foreground md:text-5xl text-balance">
            {place.title}
          </h1>
          <p className="mt-4 text-lg text-foreground/60 text-pretty">
            {place.intro}
          </p>
          <div className="mt-6 h-px w-16 bg-accent" aria-hidden="true" />
        </div>
      </header>

      {/* Content */}
      <article className="mx-auto max-w-3xl px-6 py-16">
        {/* Why unexplored */}
        <section className="mb-12">
          <h2 className="mb-3 font-serif text-2xl font-bold text-foreground">
            Why is This Unexplored?
          </h2>
          <p className="text-base leading-relaxed text-foreground/70">
            {place.whyUnexplored}
          </p>
        </section>

        {/* Cultural importance */}
        <section className="mb-12">
          <h2 className="mb-3 font-serif text-2xl font-bold text-foreground">
            Cultural Importance
          </h2>
          <p className="text-base leading-relaxed text-foreground/70">
            {place.culturalImportance}
          </p>
        </section>

        {/* Full story */}
        <section className="mb-12">
          <h2 className="mb-3 font-serif text-2xl font-bold text-foreground">
            The Full Story
          </h2>
          <p className="text-base leading-relaxed text-foreground/70">
            {place.fullStory}
          </p>
        </section>

        {/* Related guides */}
        {relatedGuides.length > 0 && (
          <section className="mb-12 rounded-2xl border border-border bg-card/50 p-8">
            <h2 className="mb-6 font-serif text-2xl font-bold text-foreground">
              Experience This with a Local Guide
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.id}
                  href={`/guides/${guide.id}`}
                  className="group flex items-center gap-4 rounded-xl border border-border bg-background/50 p-4 transition-all duration-300 hover:border-accent/50"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={guide.image}
                      alt={guide.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div>
                    <p className="font-serif font-bold text-foreground group-hover:text-accent transition-colors">
                      {guide.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {guide.specializations.join(" / ")}
                    </p>
                    <div className="mt-1 flex items-center gap-1 text-xs text-accent">
                      <span>{"*".repeat(Math.round(guide.rating))}</span>
                      <span className="text-muted-foreground">
                        {guide.rating} ({guide.reviewCount})
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 border-t border-border pt-8 text-center">
          <p className="font-serif text-lg italic text-foreground/60">
            Ready to experience this hidden gem for yourself?
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 border border-accent bg-accent/10 px-6 py-3 text-sm font-semibold tracking-widest uppercase text-accent transition-all duration-500 hover:bg-accent hover:text-accent-foreground"
            >
              Find a Guide
            </Link>
            <Link
              href="/#explore"
              className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-semibold tracking-widest uppercase text-foreground/60 transition-all duration-500 hover:border-accent/50 hover:text-foreground"
            >
              Explore More
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
