"use client";

import { useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { CategoryList } from "./_components/category-list";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CategoryProducts from './_components/category-products';

export default function CategoriesPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <div className="w-full max-w-screen-2xl px-5 md:px-14 mx-auto flex flex-col gap-5 mt-20">
      <div className="">
        <Breadcrumb className="flex gap-5">
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="flex gap-2 items-center">
              <ChevronLeft className="w-4 h-4" />
              Back
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink className="flex gap-2 items-center text-muted-foreground hover:text-muted-foreground">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/category" className="flex gap-2 items-center">
              <ChevronRight className="w-4 h-4" />
              Category
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="w-full flex md:flex-row flex-col gap-5">
        <div className="md:w-[25%] w-full overflow-y-auto md:max-h-[500px] scroll-smooth">
          <CategoryList 
            onSelectCategory={handleCategorySelect}
            selectedCategoryId={selectedCategoryId}
          />
        </div>
        <div className="md:w-[75%] w-full border min-h-[400px] rounded-lg px-5 py-5">
          <CategoryProducts selectedCategoryId={selectedCategoryId} />
        </div>
      </div>
    </div>
  );
}