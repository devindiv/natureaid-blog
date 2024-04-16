"use client";
import { categoryList } from "@/lib/interface";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";

export default function MobileNav({
  categories,
}: {
  categories: categoryList[];
}) {
  return (
    <div className="block md:absolute md:hidden ml-2 mt-1">
      <Sheet>
        <SheetTrigger>
          <Menu className="h-6 w-6" />
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <nav className="flex flex-col gap-3 text-left items-center">
            {categories.map((category, id) => (
              <Button key={id} asChild variant="ghost">
                <Link
                  href={`/${category.slug}`}
                  className="font-semibold text-sm transition-colors uppercase"
                >
                  {category.title}
                </Link>
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
