import Image, { type ImageProps } from "next/image";
type Props = Omit<ImageProps, "fill" | "width" | "height"> & { caption?: string };
/** A reserved aspect ratio prevents layout shifts; supply accurate alt text for real photography. */
export function ProjectImage({ caption, alt, className = "", sizes = "(min-width: 1440px) 1280px, (min-width: 768px) 90vw, 100vw", ...props }: Props) {
  return <figure>
    <div className="relative aspect-[4/3] overflow-hidden bg-light-grey md:aspect-[16/9]">
      <Image {...props} alt={alt} fill sizes={sizes} className={`object-cover ${className}`} />
    </div>
    {caption && <figcaption className="mt-4 text-xs leading-6 text-slate">{caption}</figcaption>}
  </figure>;
}
