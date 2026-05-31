import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, Bean, Beef, Fish, Salad } from "lucide-react";
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
            description="Consulta els dinars i sopars de cada mes, canvia de mes quan ho necessitis i revisa els plats previstos per a cada dia lectiu."
          />
          <Card className="mt-8 border-primary/30 bg-primary/5 dark:border-primary/45 dark:bg-primary/12">
            <CardContent className="p-5">
              <div className="flex items-center gap-2">
                <BarChart3 aria-hidden="true" className="size-5 text-primary" />
                <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
                  Curiositats dels menús 2026
                </h2>
              </div>
              <ul className="mt-4 grid gap-3 text-sm leading-6">
                <li className="flex gap-3">
                  <Salad aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" />
                  <p>
                    <strong>Verdures gairebé cada dia.</strong>{" "}
                    <span className="text-muted-foreground">
                      Apareixen en aproximadament el{" "}
                      <strong className="font-bold text-primary">87% dels àpats</strong> de dinar i
                      sopar.
                    </span>
                  </p>
                </li>
                <li className="flex gap-3">
                  <Beef aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" />
                  <p>
                    <strong>Carn unes 2 vegades per setmana.</strong>{" "}
                    <span className="text-muted-foreground">
                      Als dinars, hi ha plats amb carn uns{" "}
                      <strong className="font-bold text-primary">2,3 cops per setmana</strong> de
                      mitjana.
                    </span>
                  </p>
                </li>
                <li className="flex gap-3">
                  <Fish aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" />
                  <p>
                    <strong>Peix un cop per setmana.</strong>{" "}
                    <span className="text-muted-foreground">
                      El peix apareix als dinars unes{" "}
                      <strong className="font-bold text-primary">1,1 vegades per setmana</strong>.
                    </span>
                  </p>
                </li>
                <li className="flex gap-3">
                  <Bean aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" />
                  <p>
                    <strong>Llegums molt presents.</strong>{" "}
                    <span className="text-muted-foreground">
                      Llenties, cigrons, mongetes o hummus apareixen als dinars{" "}
                      <strong className="font-bold text-primary">
                        gairebé 2 cops per setmana.
                      </strong>
                    </span>
                  </p>
                </li>
              </ul>
              <p className="mt-4 border-t border-primary/10 pt-3 text-[0.7rem] leading-5 text-muted-foreground/70">
                Càlcul orientatiu sobre els menús publicats de gener a juny de 2026.
              </p>
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
