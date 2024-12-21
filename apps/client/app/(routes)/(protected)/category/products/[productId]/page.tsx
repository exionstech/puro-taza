"use client"

import ProductDetailsPage from "./_components/product-details";


export default function Page({ params }: { params: { productId: string } }) {
  return (
    <div className="w-full min-h-screen max-w-screen-2xl mx-auto px-5 md:px-14 py-10 flex flex-col">
      <ProductDetailsPage productId={params.productId} />
    </div>
  );
}