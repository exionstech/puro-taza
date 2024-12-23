"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductDetailsPage from "./_components/product-details";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import useProductDetails from "@/hooks/use-product-details";
import RelatedProducts from "./_components/related-products";

export default function Page({ params }: { params: { productId: string } }) {
  const { product } = useProductDetails(params.productId);

  return (
    <div className="w-full min-h-screen max-w-screen-2xl mx-auto px-5 md:px-14 flex flex-col mt-20">
      <div className="mb-8">
        <Breadcrumb className="flex md:gap-5 gap-3 items-center">
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/category"
              className="flex gap-2 items-center text-xs md:text-lg"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/"
              className="flex ml-4 gap-2 items-center text-muted-foreground hover:text-muted-foreground text-xs md:text-lg"
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/category"
              className="flex gap-2 items-center text-muted-foreground hover:text-muted-foreground text-xs md:text-lg"
            >
              <ChevronRight className="w-4 h-4" />
              Category
            </BreadcrumbLink>
          </BreadcrumbItem>
          {product?.category && (
            <BreadcrumbItem>
              <BreadcrumbLink
                href={"/category"}
                className="flex gap-2 items-center text-muted-foreground hover:text-muted-foreground text-xs md:text-lg"
              >
                <ChevronRight className="w-4 h-4" />
                {product.category.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          )}
          {product && (
            <BreadcrumbItem>
              <BreadcrumbLink className="flex gap-2 items-center text-xs md:text-lg">
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                {product.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          )}
        </Breadcrumb>
      </div>
      <div className="lg:px-20 mt-10">
        <ProductDetailsPage productId={params.productId} />
      </div>
      <div className="">{/* Review Section... */}</div>
      <div className="w-full flex mt-10">
        <div className="w-full flex mt-10">
          {product && (
            <RelatedProducts
              categoryId={product.categoryId}
              currentProductId={product.id}
            />
          )}
        </div>
      </div>
    </div>
  );
}
