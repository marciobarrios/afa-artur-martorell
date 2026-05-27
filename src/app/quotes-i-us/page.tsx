import { ContentPage, generatePageMetadata } from "@/components/site/content-page";

export function generateMetadata() {
  return generatePageMetadata("quotes-i-us");
}

export default function QuotesIUsPage() {
  return <ContentPage slug="quotes-i-us" />;
}
