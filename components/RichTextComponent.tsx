import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import { Tweet } from "react-tweet";

export const RichTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <figure className="my-10">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || "Article image"}
            width={1200}
            height={800}
            className="w-full h-auto object-cover"
          />
          {value.caption && (
            <figcaption className="mt-2 text-xs text-muted-foreground">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },

    twitter: ({ value }: any) => {
      return (
        <div className="my-10 flex justify-center">
          <Tweet id={value.id} onError={() => null} />
        </div>
      );
    },

    table: ({ value }: any) => {
      return (
        <div className="my-10 overflow-x-auto">
          <table className="w-full border-collapse border border-border text-sm">
            <tbody>
              {value.rows?.map((row: any, rowIndex: number) => (
                <tr key={rowIndex}>
                  {row.cells?.map((cell: string, cellIndex: number) => (
                    <td
                      key={cellIndex}
                      className="border border-border px-4 py-2 align-top"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
  },

  list: {
    bullet: ({ children }: any) => (
      <ul className="my-6 list-disc pl-6 space-y-2 text-base md:text-lg leading-relaxed">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="my-6 list-decimal pl-6 space-y-2 text-base md:text-lg leading-relaxed">
        {children}
      </ol>
    ),
  },

  block: {
    h1: ({ children }: any) => (
      <h1 className="mt-16 mb-8 text-3xl md:text-4xl font-semibold tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="mt-14 mb-6 text-2xl md:text-3xl font-semibold tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mt-12 mb-4 text-xl md:text-2xl font-semibold">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="mt-10 mb-3 text-lg md:text-xl font-semibold">
        {children}
      </h4>
    ),
    h5: ({ children }: any) => (
      <h5 className="mt-8 mb-2 text-base md:text-lg font-semibold">
        {children}
      </h5>
    ),

    normal: ({ children }: any) => (
      <p className="my-6 text-base md:text-lg leading-relaxed text-foreground">
        {children}
      </p>
    ),

    blockquote: ({ children }: any) => (
      <blockquote className="my-10 border-l-2 border-border pl-6 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },

  marks: {
    link: ({ children, value }: any) => {
      const isInternal = value?.href?.startsWith("/");
      const rel = isInternal ? undefined : "noopener noreferrer";

      return (
        <Link
          href={value?.href || "#"}
          rel={rel}
          target={isInternal ? undefined : "_blank"}
          className="
            underline
            underline-offset-4
            decoration-border
            hover:decoration-foreground
            transition-colors
          "
        >
          {children}
        </Link>
      );
    },
  },
};
