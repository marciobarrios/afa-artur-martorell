import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import { z } from "zod";

const contentRoot = path.join(process.cwd(), "content");

const siteSchema = z.object({
  name: z.string(),
  description: z.string(),
  url: z.url(),
  email: z.email().nullable(),
  instagramUrl: z.url(),
  schoolName: z.string(),
  address: z.string(),
});

const pageSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  eyebrow: z.string().optional(),
  order: z.number().default(0),
});

const commissionSchema = pageSchema.extend({
  icon: z.string(),
  accent: z.enum(["blue", "green", "ink"]).default("blue"),
});

export type SiteConfig = z.infer<typeof siteSchema>;
export type ContentPage = z.infer<typeof pageSchema> & {
  body: string;
  html: string;
};
export type CommissionPage = z.infer<typeof commissionSchema> & {
  body: string;
  html: string;
};

function readJson<T>(filePath: string, schema: z.ZodType<T>): T {
  const json = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return schema.parse(json);
}

function readMarkdownFiles(dirName: string) {
  const directory = path.join(contentRoot, dirName);

  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => path.join(directory, file));
}

async function markdownToHtml(markdown: string) {
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(markdown);

  return processed.toString();
}

function readMarkdownData<T>(filePath: string, schema: z.ZodType<T>) {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const data = schema.parse(parsed.data);

  return {
    data,
    body: parsed.content.trim(),
  };
}

async function readMarkdownEntry<T extends { slug: string }>(
  filePath: string,
  schema: z.ZodType<T>,
) {
  const { data, body } = readMarkdownData(filePath, schema);

  return {
    ...data,
    body,
    html: await markdownToHtml(body),
  };
}

function ensureUniqueSlugs(entries: { slug: string }[], kind: string) {
  const seen = new Set<string>();

  for (const entry of entries) {
    if (seen.has(entry.slug)) {
      throw new Error(`Duplicate ${kind} slug: ${entry.slug}`);
    }

    seen.add(entry.slug);
  }
}

export const getSiteConfig = cache(() => {
  return readJson(path.join(contentRoot, "site.json"), siteSchema);
});

export const getPages = cache(async () => {
  const pages = await Promise.all(
    readMarkdownFiles("pages").map((file) => readMarkdownEntry(file, pageSchema)),
  );
  ensureUniqueSlugs(pages, "page");

  return pages.toSorted((a, b) => a.order - b.order);
});

export const getPage = cache(async (slug: string) => {
  const pages = await getPages();
  return pages.find((page) => page.slug === slug) ?? null;
});

export const getCommissions = cache(async () => {
  const commissions = await Promise.all(
    readMarkdownFiles("commissions").map((file) => readMarkdownEntry(file, commissionSchema)),
  );
  ensureUniqueSlugs(commissions, "commission");

  return commissions.toSorted((a, b) => a.order - b.order);
});

export const getCommission = cache(async (slug: string) => {
  const commissions = await getCommissions();
  return commissions.find((commission) => commission.slug === slug) ?? null;
});
