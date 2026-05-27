import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/site/markdown-content";
import { SectionHeading } from "@/components/site/section-heading";
import { getCommission, getCommissions } from "@/lib/content";

export async function generateStaticParams() {
  const commissions = await getCommissions();

  return commissions.map((commission) => ({
    slug: commission.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const commission = await getCommission(slug);

  if (!commission) {
    return {};
  }

  return {
    title: commission.title,
    description: commission.description,
  };
}

export default async function CommissionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const commission = await getCommission(slug);

  if (!commission) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow={commission.icon}
        title={commission.title}
        description={commission.description}
      />
      <MarkdownContent className="mt-10" html={commission.html} />
    </article>
  );
}
