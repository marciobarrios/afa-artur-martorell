import { ContentPage, generatePageMetadata } from "@/components/site/content-page";

export function generateMetadata() {
  return generatePageMetadata("que-fem");
}

export default function QueFemPage() {
  return <ContentPage slug="que-fem" />;
}
