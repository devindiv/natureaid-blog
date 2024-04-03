import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import { Tweet } from "react-tweet";

export const RichTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="block h-64 md:h-72 my-2.5">
          <Image
            src={urlFor(value).url()}
            alt="Post Image"
            width={480}
            height={360}
            className="object-cover h-full rounded-lg md:w-1/2"
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
      <h1 className="text-5xl py-5 font-bold">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-4xl py-4 font-bold">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-3xl py-3 font-bold">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl py-2 font-bold">{children}</h4>
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
          className="underline decoration-slate-800 hover:decoration-orange-500"
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
