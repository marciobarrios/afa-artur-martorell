import { Camera, MapPin } from "lucide-react";
import { getSiteConfig } from "@/lib/content";
import { Logo } from "./logo";

export function SiteFooter() {
  const site = getSiteConfig();

  return (
    <footer className="border-t bg-card/60">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.5fr_1fr] lg:px-8">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-md text-sm leading-6 text-muted-foreground">{site.description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground md:justify-end md:text-right">
          <a
            className="inline-flex items-center gap-2 hover:text-primary"
            href={site.instagramUrl}
            rel="noreferrer"
            target="_blank"
          >
            <Camera aria-hidden="true" className="size-4" />
            Instagram AFA
          </a>
          <a
            className="inline-flex items-center gap-2 hover:text-primary"
            href={site.mapsUrl}
            rel="noreferrer"
            target="_blank"
          >
            <MapPin aria-hidden="true" className="size-4" />
            {site.address}
          </a>
        </div>
      </div>
    </footer>
  );
}
