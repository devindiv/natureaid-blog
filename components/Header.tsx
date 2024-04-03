import React from "react";
import Container from "./ui/container";
import Image from "next/image";
import Link from "next/link";
import SubscribeButton from "./ui/subscribe-button";
import DesktopNav from "./desktop-nav";
import { categoryList } from "@/lib/interface";
import { getCategories } from "@/lib/actions";

const Header = async () => {
  const categories: categoryList[] = await getCategories();
  return (
    <header className="sticky bg-slate-50 top-0 z-10 sm:flex sm:justify-between">
      <Container>
        <div className="relative flex items-center w-full h-16 px-4 justify-between">
          <Link href="/" className="">
            <Image
              src="/natureaid-lettering.svg"
              alt="Natureaid Logo"
              width={400}
              height={400}
              className="w-36 md:w-40"
            />
          </Link>
          <DesktopNav categories={categories} />
          <SubscribeButton />
        </div>
      </Container>
    </header>
  );
};

export default Header;
