import { cn } from "@/lib/utils";

export function MarkdownContent({ html, className }: { html: string; className?: string }) {
  return (
    <div
      className={cn(
        "max-w-none space-y-5 text-base leading-7 text-muted-foreground [&>h2]:font-display [&>h2]:text-3xl [&>h2]:font-semibold [&>h2]:leading-tight [&>h2]:text-foreground [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-foreground [&>ol]:ml-5 [&>ol]:list-decimal [&>ul]:ml-5 [&>ul]:list-disc [&_a]:font-semibold [&_a]:text-primary [&_a]:underline-offset-4 [&_a:hover]:underline [&_strong]:text-foreground",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
