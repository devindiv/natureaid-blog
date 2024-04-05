import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import { Tweet } from "react-tweet";

export const RichTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="block max-w-[25rem] my-2.5 border-slate-900">
          <Image
            src={urlFor(value).url()}
            alt="Post Image"
            width={480}
            height={360}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      );
    },
    twitter: ({ value }: any) => {
      return <Tweet id={value.id} />;
    },
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="p-6 list-disc space-y-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="p-4 list-decimal">{children}</ol>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl md:text-5xl py-5.5 font-bold">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl md:text-4xl py-4.5 font-bold">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl md:text-3xl py-3.5 font-bold">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl md:text-2xl py-2.5 font-bold">{children}</h4>
    ),
    h5: ({ children }: any) => (
      <h5 className="text-lg md:text-xl py-1.5 font-bold">{children}</h5>
    ),
    normal: ({ children }: any) => (
      <p className="text-base py-0.5 md:text-lg">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-gray-500 border-l-4 pl-5 py-5 my-5">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = value.href?.startsWith("/")
        ? undefined
        : "noreferrer noopener";
      return value.href ? (
        <Link
          href={value.href}
          rel={rel}
          className="text-base font-semibold text-primary"
        >
          {children}
        </Link>
      ) : (
        <span className="underline decoration-slate-800 hover:decoration-orange-500">
          {children}
        </span>
      );
    },
  },
};
