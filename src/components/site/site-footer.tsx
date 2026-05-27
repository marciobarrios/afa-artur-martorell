import Link from "next/link";
import { Camera, Mail, MapPin } from "lucide-react";
import { getSiteConfig } from "@/lib/content";
import { Logo } from "./logo";

export function SiteFooter() {
  const site = getSiteConfig();

  return (
    <footer className="border-t bg-card/60">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-md text-sm leading-6 text-muted-foreground">{site.description}</p>
        </div>
        <div>
          <h2 className="text-sm font-black uppercase tracking-wide text-primary">Enllaços</h2>
          <div className="mt-4 grid gap-2 text-sm">
            <Link href="/comissions" className="hover:text-primary">
              Comissions
            </Link>
            <Link href="/menus-menjador" className="hover:text-primary">
              Menús menjador
            </Link>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-black uppercase tracking-wide text-primary">Contacte</h2>
          <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
            {site.email ? (
              <a
                className="inline-flex items-start gap-2 hover:text-primary"
                href={`mailto:${site.email}`}
              >
                <Mail aria-hidden="true" className="mt-0.5 size-4" />
                {site.email}
              </a>
            ) : null}
            <a
              className="inline-flex items-start gap-2 hover:text-primary"
              href={site.instagramUrl}
              rel="noreferrer"
              target="_blank"
            >
              <Camera aria-hidden="true" className="mt-0.5 size-4" />
              Instagram AFA
            </a>
            <span className="inline-flex items-start gap-2">
              <MapPin aria-hidden="true" className="mt-0.5 size-4" />
              {site.address}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
