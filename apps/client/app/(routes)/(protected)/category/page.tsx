"use client";

import { useEffect, useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { CategoryList } from "./_components/category-list";
import { ChevronLeft, ChevronRight, LoaderIcon } from "lucide-react";
import CategoryProducts from './_components/category-products';

export default function CategoriesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 600);
  
      return () => clearTimeout(timer);
    }, []);

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
      {isLoading ? 
      <div className='w-full h-[400px] items-start justify-center flex'>
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"/>
      </div> : 
      <>
      <div className="w-full flex md:flex-row flex-col gap-5 py-2">
        <div className="md:w-[25%] w-full overflow-y-auto md:max-h-[500px] scroll-smooth">
          <CategoryList 
            onSelectCategory={handleCategorySelect}
            selectedCategoryId={selectedCategoryId}
          />
        </div>
        <div className="md:w-[75%] w-full border max-h-[500px] overflow-y-auto scroll-smooth rounded-lg px-5 py-5">
          <CategoryProducts selectedCategoryId={selectedCategoryId}/>
        </div>
      </div>
      </>
      }
    </div>
  );
}