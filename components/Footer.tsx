import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="bg-gray-200 text-slate-700 gap-2 flex flex-col justify-center items-center p-4 md:px-32 md:py-6">
        <Link href="/">
          <Image
            src="/natureaid-lettering.svg"
            alt="Natureaid Logo"
            width={400}
            height={400}
            className="w-36 md:w-40"
          />
        </Link>
        <Link href="/privacy">Privacy Policy</Link>
        <p className="text-xs">
          Copyright &copy; NatureAid 2024 all rights reserved
        </p>
      </div>
    </footer>
  );
}
