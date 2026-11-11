type Props = { eyebrow: string; title: string; description?: string; as?: "h1" | "h2"; id?: string };
export function SectionHeading({ eyebrow, title, description, as: Tag = "h2", id }: Props) {
  return <div className="max-w-3xl">
    <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em]"><span aria-hidden="true" className="h-2 w-2 bg-yellow" />{eyebrow}</p>
    <Tag id={id} className="text-heading font-medium">{title}</Tag>
    {description && <p className="mt-7 max-w-xl text-base leading-8 text-slate md:text-lg">{description}</p>}
  </div>;
}
