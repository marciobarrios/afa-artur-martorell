import type { Metadata } from "next";
import { Camera, Mail, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { getSiteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contacte",
  description: "Contacta amb l'AFA Artur Martorell.",
};

export default function ContactePage() {
  const site = getSiteConfig();

  return (
    <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Contacte"
        title="Tens una proposta, dubte o ganes de participar?"
        description="Escriu-nos o acosta't a una comissió. L'AFA funciona quan les famílies hi troben un lloc possible."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <Mail aria-hidden="true" className="mb-4 size-6 text-primary" />
            <h2 className="font-bold">Correu</h2>
            {site.email ? (
              <a
                className="mt-2 block break-words text-sm text-muted-foreground hover:text-primary"
                href={`mailto:${site.email}`}
              >
                {site.email}
              </a>
            ) : (
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Correu pendent de confirmar.
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <Camera aria-hidden="true" className="mb-4 size-6 text-primary" />
            <h2 className="font-bold">Instagram</h2>
            <a
              className="mt-2 block text-sm text-muted-foreground hover:text-primary"
              href={site.instagramUrl}
              rel="noreferrer"
              target="_blank"
            >
              @afaarturmartorell
            </a>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <MapPin aria-hidden="true" className="mb-4 size-6 text-primary" />
            <h2 className="font-bold">Escola</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{site.address}</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
