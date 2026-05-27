import { ContentPage, generatePageMetadata } from "@/components/site/content-page";

export function generateMetadata() {
  return generatePageMetadata("com-ho-fem");
}

export default function ComHoFemPage() {
  return <ContentPage slug="com-ho-fem" />;
}
