import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <Badge className="mb-4" variant="secondary">
          {eyebrow}
        </Badge>
      ) : null}
      <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-normal text-foreground sm:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-5 text-lg leading-8 text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}
