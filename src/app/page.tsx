import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, Code2, HeartHandshake, Megaphone, School, Soup } from "lucide-react";
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
              Fem comunitat, cuidem l'escola
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
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute inset-x-8 top-10 h-56 rounded-full bg-secondary/25 blur-3xl" />
            <Image
              src="/logos/afa-imagotype.svg"
              alt="AFA Artur Martorell"
              width={914}
              height={490}
              priority
              className="relative mx-auto h-auto w-full max-w-lg"
            />
            <div className="relative mt-8 grid gap-3 sm:grid-cols-2">
              {actionCards.map((item) => (
                <div className="rounded-lg border bg-card/80 p-4 shadow-sm" key={item.title}>
                  <item.icon aria-hidden="true" className="mb-3 size-5 text-primary" />
                  <h2 className="font-bold">{item.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </div>
              ))}
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
            <Link className={cn(buttonVariants({ variant: "outline" }), "mt-6")} href="/que-fem">
              Obrir Què fem
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y bg-card/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <Badge variant="secondary">Novetats</Badge>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-normal">
              Al dia de l'AFA
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Menús, avisos i publicacions recents per tenir a mà el que passa a l'escola.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <Card className="border-none bg-primary text-primary-foreground">
              <CardHeader>
                <Badge className="border-primary-foreground/45 bg-primary-foreground/15 text-primary-foreground dark:border-primary-foreground/55 dark:bg-primary-foreground/12">
                  Menús menjador
                </Badge>
                <CardTitle className="text-3xl">
                  {latestMenu ? getDisplayMonth(latestMenu) : "Menú pendent"}
                </CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Consulta el menú mensual i el dinar d'avui quan hi ha dades publicades.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {todayLunch ? (
                  <div>
                    <div className="mb-3 inline-flex items-center gap-2 text-sm font-bold">
                      <Soup aria-hidden="true" className="size-4" />
                      Dinar d'avui
                    </div>
                    <ul className="grid gap-0.5 text-sm leading-5">
                      {todayLunch.dishes.map((dish) => (
                        <li className="flex items-start gap-2 py-0.5 pl-2.5" key={dish}>
                          <span
                            aria-hidden="true"
                            className="mt-2 size-1.5 shrink-0 rounded-full bg-secondary"
                          />
                          <span>{dish}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-sm leading-6 text-primary-foreground/80">
                    No hi ha menú d'avui carregat encara. Pots veure el mes disponible a la pàgina
                    de menús.
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
            <Code2 aria-hidden="true" className="mb-4 size-8 text-primary" />
            <h2 className="font-display text-4xl font-semibold">Codi obert per a altres AFA.</h2>
          </div>
          <div>
            <p className="text-lg leading-8 text-muted-foreground">
              Aquest web és lliure i reutilitzable: qualsevol AFA pot copiar el projecte, adaptar-lo
              a la seva escola i aprofitar-ne el codi. Si us pot servir, també us podem ajudar de
              franc a posar-lo en marxa.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                className={buttonVariants({ variant: "default" })}
                href="https://github.com/marciobarrios/afa-artur-martorell"
                rel="noreferrer"
                target="_blank"
              >
                Veure el codi a GitHub
                <ArrowRight aria-hidden="true" />
              </a>
              <Link className={buttonVariants({ variant: "outline" })} href="/contacte">
                Demanar ajuda
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
