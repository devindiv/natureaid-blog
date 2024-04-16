"use client";
import { categoryList } from "@/lib/interface";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function DesktopNav({
  categories,
}: {
  categories: categoryList[];
}) {
  return (
    <nav className="mx-auto mt-1 space-x-3 lg:space-x-4 hidden md:flex items-center">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-sm font-semibold text-gray-800">
              Topics
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="p-4 grid grid-cols-2 gap-2 w-[32rem]">
                {categories.map((category, i) => (
                  <li key={i}>
                    <Link
                      href={`/${category.slug}`}
                      className="text-sm text-gray-600"
                    >
                      {category.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
