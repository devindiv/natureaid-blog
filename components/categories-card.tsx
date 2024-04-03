import { getCategories } from "@/lib/actions";
import { categoryList } from "@/lib/interface";
import React from "react";
import Container from "./ui/container";

const CategoryCard = async () => {
  const categories: categoryList[] = await getCategories();
  return (
    <div className="w-full my-6 bg-gray-100">
      <Container>
        <ul
          className="grid grid-cols-2 p-4
        items-center md:flex justify-center gap-2"
        >
          {categories.map((category, i) => (
            <li className="border border-primary rounded-md p-2" key={i}>
              {category.title}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
};

export default CategoryCard;
