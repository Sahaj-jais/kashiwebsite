import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { guides } from "@/lib/data";

export const metadata: Metadata = {
  title: "Local Guides | Kashi - The Unexplored City",
  description:
    "Connect with verified local guides and explore the hidden soul of Varanasi through heritage walks, food tours, spiritual journeys, and photography experiences.",
};

export default async function GuidesPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
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
            Back to Kashi
          </Link>
          <Link
            href="/"
            className="font-serif text-lg font-bold text-accent"
          >
            Kashi
          </Link>
        </div>
      </div>

      {/* Header */}
      <header className="pt-28 pb-12">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="mb-3 text-sm font-medium tracking-[0.3em] uppercase text-accent">
            Local Companions
          </p>
          <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl text-balance">
            Connect with Local Guides
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-foreground/60 text-pretty">
            {topic
              ? `Showing guides specializing in "${topic.replace(/-/g, " ")}". Each guide brings years of intimate knowledge of Kashi's hidden treasures.`
              : "Our verified local guides transform your visit from tourism into a deep, personal encounter with the soul of Kashi."}
          </p>
        </div>
      </header>

      {/* Guide cards */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-8 md:grid-cols-2">
          {guides.map((guide) => (
            <Link
              key={guide.id}
              href={`/guides/${guide.id}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card/50 transition-all duration-500 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 sm:flex-row"
            >
              <div className="relative aspect-square w-full shrink-0 overflow-hidden sm:w-48">
                <Image
                  src={guide.image}
                  alt={guide.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 192px"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-serif text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                  {guide.name}
                </h2>
                <p className="mt-1 text-xs font-medium text-accent">
                  {guide.specializations.join(" / ")}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/60">
                  {guide.intro.slice(0, 140)}...
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1">
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
                    <span className="ml-1 text-xs text-muted-foreground">
                      {guide.rating} ({guide.reviewCount} reviews)
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {guide.experience} experience
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {guide.languages.map((lang) => (
                    <span
                      key={lang}
                      className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-foreground/50"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
