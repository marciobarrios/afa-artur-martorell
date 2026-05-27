import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/site/markdown-content";
import { SectionHeading } from "@/components/site/section-heading";
import { getPage } from "@/lib/content";

export async function generatePageMetadata(slug: string): Promise<Metadata> {
  const page = await getPage(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
  };
}

export async function ContentPage({ slug }: { slug: string }) {
  const page = await getPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading eyebrow={page.eyebrow} title={page.title} description={page.description} />
      <MarkdownContent className="mt-10" html={page.html} />
    </article>
  );
}
