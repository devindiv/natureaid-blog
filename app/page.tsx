import Featured from "@/components/Featured";
import Hero from "@/components/Hero";
import Latest from "@/components/Latest";
import CategoryCard from "@/components/categories-card";
import { roboto } from "@/components/ui/fonts";
import Image from "next/image";

export const revalidate = 60;

export default function Home() {
  return (
    <main
      className={`${roboto.className} flex min-h-screen flex-col items-center justify-between`}
    >
      <Hero />
      <CategoryCard />
      <Featured />
      <Latest />
    </main>
  );
}
