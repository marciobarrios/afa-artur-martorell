import type { Metadata } from "next";
import { ContentCard } from "@/components/site/content-card";
import { SectionHeading } from "@/components/site/section-heading";
import { getCommissions } from "@/lib/content";

export const metadata: Metadata = {
  title: "Comissions",
  description:
    "Comissions de treball de l'AFA Artur Martorell: menjador, cultura, escola verda, extraescolars i més.",
};

export default async function ComissionsPage() {
  const commissions = await getCommissions();

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Comissions"
        title="Organitzar-se per fer possible el que importa."
        description="Les comissions són grups oberts de famílies que assumeixen àmbits concrets de l'activitat de l'AFA."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {commissions.map((commission) => (
          <ContentCard
            description={commission.description}
            eyebrow={commission.icon}
            href={`/comissions/${commission.slug}`}
            key={commission.slug}
            title={commission.title}
          />
        ))}
      </div>
    </section>
  );
}
