import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import { Tweet } from "react-tweet";

export const RichTextComponents = {
  types: {
    image: ({ value }: any) => (
      <figure className="my-12">
        <Image
          src={urlFor(value).width(1200).quality(80).url()}
          alt={value.alt || "Article image"}
          width={1200}
          height={800}
          className="w-full h-auto rounded-sm"
        />
        {value.caption && (
          <figcaption className="mt-3 text-[12px] text-muted-foreground tracking-wide text-center">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),

    twitter: ({ value }: any) => (
      <div className="my-10 flex justify-center">
        <Tweet id={value.id} onError={() => null} />
      </div>
    ),

    table: ({ value }: any) => (
      <div className="my-10 overflow-x-auto">
        <table className="w-full border-collapse text-[15px]">
          <tbody>
            {value.rows?.map((row: any, rowIndex: number) => (
              <tr
                key={rowIndex}
                className={
                  rowIndex === 0
                    ? "border-y border-border"
                    : "border-b border-border/50"
                }
              >
                {row.cells?.map((cell: string, cellIndex: number) => (
                  <td
                    key={cellIndex}
                    className={`px-4 py-3 align-top leading-relaxed ${
                      rowIndex === 0
                        ? "font-medium text-foreground text-[13px] tracking-wide uppercase"
                        : "text-foreground/80"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },

  list: {
    bullet: ({ children }: any) => (
      <ul className="my-7 space-y-3 pl-0 list-none">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="my-7 space-y-3 pl-0 list-none counter-reset-item">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }: any) => (
      <li className="flex items-start gap-3 text-[16.5px] leading-[1.85] text-foreground/85">
        <span className="mt-[11px] h-[4px] w-[4px] rounded-full bg-[#2E7A52] shrink-0" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children, index }: any) => (
      <li className="flex items-start gap-4 text-[16.5px] leading-[1.85] text-foreground/85">
        <span className="font-serif text-[15px] text-[#2E7A52] shrink-0 w-5 text-right tabular-nums mt-0.5">
          {(index ?? 0) + 1}.
        </span>
        <span>{children}</span>
      </li>
    ),
  },

  block: {
    h1: ({ children }: any) => (
      <h1 className="mt-16 mb-6 font-serif text-[34px] md:text-[42px] font-light leading-[1.1] tracking-[-0.02em] text-foreground">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="mt-14 mb-5 font-serif text-[26px] md:text-[32px] font-light leading-[1.15] tracking-[-0.01em] text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mt-12 mb-4 font-serif text-[21px] md:text-[25px] font-light leading-[1.2] text-foreground">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="mt-10 mb-3 font-sans text-[14px] font-semibold tracking-[0.12em] uppercase text-[#2E7A52]">
        {children}
      </h4>
    ),
    h5: ({ children }: any) => (
      <h5 className="mt-8 mb-2 font-sans text-[12px] font-semibold tracking-[0.16em] uppercase text-muted-foreground">
        {children}
      </h5>
    ),
    normal: ({ children }: any) => (
      <p className="my-7 text-[16.5px] leading-[1.9] text-foreground/85 font-serif">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-12 border-l-[2px] border-[#2E7A52] pl-6 text-[19px] leading-[1.75] text-muted-foreground font-serif font-light not-italic">
        {children}
      </blockquote>
    ),
  },

  marks: {
    link: ({ children, value }: any) => {
      const isInternal = value?.href?.startsWith("/");
      return (
        <Link
          href={value?.href || "#"}
          rel={isInternal ? undefined : "noopener noreferrer"}
          target={isInternal ? undefined : "_blank"}
          className="text-[#2E7A52] underline underline-offset-[3px] decoration-[#2E7A52]/30 hover:decoration-[#2E7A52] transition-colors"
        >
          {children}
        </Link>
      );
    },
    strong: ({ children }: any) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-foreground/80">{children}</em>
    ),
  },
};
