import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { MenuTabs } from "@/components/site/menu-tabs";
import { SectionHeading } from "@/components/site/section-heading";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAvailableMenus, getDisplayMonth, getMadridDateParts } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Menús menjador",
  description: "Consulta els menús de menjador de l'Escola Artur Martorell.",
};

export default async function MenusMenjadorPage({
  searchParams,
}: {
  searchParams: Promise<{ mes?: string }>;
}) {
  const { mes } = await searchParams;
  const menus = getAvailableMenus();
  const selectedMenu =
    menus.find((menu) => `${menu.year}-${String(menu.month).padStart(2, "0")}` === mes) ?? menus[0];
  const today = getMadridDateParts();
  const selectedIsCurrent =
    selectedMenu?.year === today.year && selectedMenu?.month === today.month;

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
        <aside>
          <SectionHeading
            eyebrow="Menús menjador"
            title="Dinars i sopars del mes."
            description="V1 mostra menús guardats com a JSON revisable a GitHub. El següent pas serà automatitzar la importació dels PDFs d'Àmbit Escola."
          />
          <Card className="mt-8 border-primary/25 bg-primary/5">
            <CardContent className="p-5">
              <div className="flex gap-3">
                <AlertCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
                <p className="text-sm leading-6 text-muted-foreground">
                  Integració preparada per reutilitzar el model de
                  <code className="mx-1 rounded bg-muted px-1 py-0.5">menu-guepards</code>: mesos,
                  dinars, sopars i PDFs originals.
                </p>
              </div>
            </CardContent>
          </Card>
          <div className="mt-8 grid gap-2">
            {menus.map((menu) => (
              <Link
                className={buttonVariants({
                  variant: menu === selectedMenu ? "default" : "outline",
                })}
                href={`/menus-menjador?mes=${menu.year}-${String(menu.month).padStart(2, "0")}`}
                key={`${menu.year}-${menu.month}`}
              >
                {getDisplayMonth(menu)}
              </Link>
            ))}
          </div>
        </aside>

        <div>
          {selectedMenu ? (
            <>
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-3xl font-semibold">
                  {getDisplayMonth(selectedMenu)}
                </h2>
                {selectedIsCurrent ? <Badge>Mes actual</Badge> : null}
              </div>
              <MenuTabs menu={selectedMenu} today={selectedIsCurrent ? today.day : undefined} />
            </>
          ) : (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                Encara no hi ha cap menú carregat.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
