import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, HeartHandshake, Leaf, Megaphone, School, Soup } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentCard } from "@/components/site/content-card";
import { SectionHeading } from "@/components/site/section-heading";
import { getCommissions, getSiteConfig } from "@/lib/content";
import { findDailyMenu, getAvailableMenus, getDisplayMonth, getMadridDateParts } from "@/lib/menu";
import { cn } from "@/lib/utils";

const actionCards = [
  {
    title: "Gestió",
    description: "Menjador, acollida matinal, casals i serveis que fan el dia a dia més fàcil.",
    icon: Soup,
  },
  {
    title: "Promoció",
    description: "Extraescolars, xerrades i activitats pensades per infants i famílies.",
    icon: School,
  },
  {
    title: "Organització",
    description: "Festes, cultura popular, Sant Jordi i moments que fan comunitat.",
    icon: Megaphone,
  },
  {
    title: "Suport",
    description: "Recursos i acompanyament perquè l'escola guanyi benestar i qualitat.",
    icon: HeartHandshake,
  },
];

export default async function Home() {
  const [commissions, site] = await Promise.all([getCommissions(), getSiteConfig()]);
  const latestMenu = getAvailableMenus()[0];
  const today = getMadridDateParts();
  const todayLunch =
    latestMenu && latestMenu.year === today.year && latestMenu.month === today.month
      ? findDailyMenu(latestMenu, "lunch", today.day)
      : null;

  return (
    <>
      <section className="relative overflow-hidden border-b">
        <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="secondary">Famílies que fan escola</Badge>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-normal sm:text-7xl">
              AFA Artur Martorell
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Representem els interessos de les famílies i col·laborem amb l'escola perquè infants,
              mestres i comunitat tinguin un espai viu, cuidat i participatiu.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className={buttonVariants({ variant: "default", size: "lg" })}
                href="/comissions"
              >
                Veure comissions
                <ArrowRight aria-hidden="true" />
              </Link>
              <Link
                className={buttonVariants({ variant: "outline", size: "lg" })}
                href="/menus-menjador"
              >
                Menús menjador
              </Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute inset-8 rounded-full bg-secondary/30 blur-3xl" />
            <div className="relative rounded-lg border bg-card p-6 shadow-xl">
              <Image
                src="/logos/afa-horizontal-export.png"
                alt="AFA Artur Martorell"
                width={1880}
                height={480}
                priority
                className="h-auto w-full"
              />
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {actionCards.map((item) => (
                  <div className="rounded-lg border bg-background/70 p-4" key={item.title}>
                    <item.icon aria-hidden="true" className="mb-3 size-5 text-primary" />
                    <h2 className="font-bold">{item.title}</h2>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeading
            eyebrow="Què fem?"
            title="Una associació per posar mans, veu i cura al projecte d'escola."
          />
          <div>
            <p className="text-lg leading-8 text-muted-foreground">
              Gestió, promoció, organització i suport continuen sent els quatre eixos de l'AFA. La
              pàgina completa manté el text editable perquè l'equip el pugui ampliar amb exemples,
              serveis i informació actualitzada.
            </p>
            <Link className={cn(buttonVariants({ variant: "default" }), "mt-6")} href="/que-fem">
              Obrir Què fem
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y bg-card/50">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <Badge className="border-white/20 bg-white/15 text-white">Menús menjador</Badge>
              <CardTitle className="text-3xl">
                {latestMenu ? getDisplayMonth(latestMenu) : "Menú pendent"}
              </CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Consulta el menú mensual i el dinar d'avui quan hi ha dades publicades.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {todayLunch ? (
                <ul className="grid gap-2 text-sm leading-6">
                  {todayLunch.dishes.map((dish) => (
                    <li key={dish}>{dish}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm leading-6 text-primary-foreground/80">
                  No hi ha menú d'avui carregat encara. Pots veure el mes disponible a la pàgina de
                  menús.
                </p>
              )}
              <Link
                className={cn(buttonVariants({ variant: "secondary" }), "mt-6")}
                href="/menus-menjador"
              >
                Obrir menús
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Badge variant="secondary">
                <Camera aria-hidden="true" className="size-3.5" />
                Instagram
              </Badge>
              <CardTitle className="text-3xl">Segueix el dia a dia de l'AFA</CardTitle>
              <CardDescription>
                A Instagram compartim avisos, activitats, crides a participar i novetats
                relacionades amb l'AFA i l'escola.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">
                És el canal més immediat per estar al corrent de les notícies, recordatoris i
                moments compartits de la comunitat educativa.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  className={buttonVariants({ variant: "default" })}
                  href={site.instagramUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  Obrir Instagram
                  <ArrowRight aria-hidden="true" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Comissions"
            title="Petites portes d'entrada per participar."
            description="Cada comissió concentra una part del treball comunitari. Pots començar pel tema que et sigui més proper."
          />
          <Link className={buttonVariants({ variant: "outline" })} href="/comissions">
            Totes les comissions
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {commissions.slice(0, 6).map((commission) => (
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

      <section className="border-t bg-secondary/20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <Leaf aria-hidden="true" className="mb-4 size-8 text-primary" />
            <h2 className="font-display text-4xl font-semibold">Contingut fàcil de mantenir.</h2>
          </div>
          <p className="text-lg leading-8 text-muted-foreground">
            Les pàgines, comissions i menús viuen en fitxers markdown i JSON dins de GitHub. Això
            permet revisar canvis abans de publicar i deixa el projecte preparat per afegir un CMS
            visual més endavant si l'equip ho necessita.
          </p>
        </div>
      </section>
    </>
  );
}
