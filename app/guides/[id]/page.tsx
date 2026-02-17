import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { guides } from "@/lib/data";

export async function generateStaticParams() {
  return guides.map((g) => ({ id: g.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const guide = guides.find((g) => g.id === id);
  if (!guide) return { title: "Not Found" };
  return {
    title: `${guide.name} - Local Guide | Kashi`,
    description: guide.intro,
  };
}

export default async function GuideProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const guide = guides.find((g) => g.id === id);
  if (!guide) notFound();

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            href="/guides"
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
            All Guides
          </Link>
          <Link
            href="/"
            className="font-serif text-lg font-bold text-accent"
          >
            Kashi
          </Link>
        </div>
      </div>

      {/* Profile */}
      <div className="mx-auto max-w-4xl px-6 pt-28 pb-24">
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Photo */}
          <div className="shrink-0">
            <div className="relative h-64 w-64 mx-auto overflow-hidden rounded-2xl border border-border md:h-80 md:w-80">
              <Image
                src={guide.image}
                alt={guide.name}
                fill
                priority
                className="object-cover"
                sizes="320px"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              {guide.name}
            </h1>
            <p className="mt-1 text-sm font-medium text-accent">
              {guide.specializations.join(" / ")}
            </p>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${
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
              <span className="text-sm text-muted-foreground">
                {guide.rating} ({guide.reviewCount} reviews)
              </span>
            </div>

            <p className="mt-4 leading-relaxed text-foreground/70">
              {guide.intro}
            </p>

            {/* Details grid */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card/50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Experience
                </p>
                <p className="mt-1 font-serif text-lg font-bold text-foreground">
                  {guide.experience}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card/50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Languages
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {guide.languages.join(", ")}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-border bg-card/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Availability
              </p>
              <p className="mt-1 text-sm text-foreground">
                {guide.availability}
              </p>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <section className="mt-12">
          <h2 className="mb-6 font-serif text-2xl font-bold text-foreground">
            Experience Pricing
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {guide.pricing.map((tier) => (
              <div
                key={tier.label}
                className="flex flex-col rounded-xl border border-border bg-card/50 p-6 transition-all duration-300 hover:border-accent/30"
              >
                <p className="text-sm font-medium text-foreground/80">
                  {tier.label}
                </p>
                <p className="mt-2 font-serif text-3xl font-bold text-accent">
                  {"₹"}{tier.price.toLocaleString("en-IN")}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  per person
                </p>
                <Link
                  href={`/booking?guide=${guide.id}&tier=${encodeURIComponent(tier.label)}`}
                  className="mt-4 inline-flex items-center justify-center border border-accent bg-accent/10 px-4 py-2.5 text-sm font-semibold tracking-wider uppercase text-accent transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
                >
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="mt-12">
          <h2 className="mb-6 font-serif text-2xl font-bold text-foreground">
            Reviews
          </h2>
          <div className="flex flex-col gap-4">
            {guide.reviews.map((review) => (
              <div
                key={review.name}
                className="rounded-xl border border-border bg-card/50 p-6"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-foreground">
                    {review.name}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {review.date}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`h-3 w-3 ${
                        i < review.rating ? "text-accent" : "text-border"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                  {review.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
