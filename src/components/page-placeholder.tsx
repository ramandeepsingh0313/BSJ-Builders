import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
type Props = { eyebrow: string; title: string; description: string; note: string };
export function PagePlaceholder({ eyebrow, title, description, note }: Props) {
  return <section className="py-section" aria-labelledby="page-title"><Container>
    <SectionHeading as="h1" id="page-title" eyebrow={eyebrow} title={title} description={description} />
    <div className="mt-16 grid gap-8 border-t border-line pt-8 md:grid-cols-2">
      <p className="max-w-lg leading-8 text-slate">{note}</p>
      <div className="md:justify-self-end"><Button href="/" variant="outline">Back to home</Button></div>
    </div>
  </Container></section>;
}
