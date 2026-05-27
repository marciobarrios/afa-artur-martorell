import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ContentCard({
  title,
  description,
  href,
  eyebrow,
}: {
  title: string;
  description: string;
  href: string;
  eyebrow?: string;
}) {
  return (
    <Card className="group h-full transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <CardHeader>
        {eyebrow ? <Badge variant="neutral">{eyebrow}</Badge> : null}
        <CardTitle>{title}</CardTitle>
        <CardDescription className="leading-6">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link
          href={href}
          className="focus-ring inline-flex items-center gap-2 rounded-md text-sm font-bold text-primary"
        >
          Llegir més
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </CardContent>
    </Card>
  );
}
