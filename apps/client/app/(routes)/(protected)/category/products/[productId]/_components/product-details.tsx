"use client"

import { useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import useProductDetails from '@/hooks/use-product-details';

interface ProductDetailsPageProps {
  productId: string;
}

const ProductDetailsPage = ({ productId }: ProductDetailsPageProps) => {
  const { product, isLoading, error } = useProductDetails(productId);

  // Add console logs for debugging
  useEffect(() => {
    console.log('ProductId:', productId);
    console.log('Loading:', isLoading);
    console.log('Product:', product);
    console.log('Error:', error);
  }, [productId, isLoading, product, error]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-red-500">Product not found</p>
      </div>
    );
  }

  const discountedPrice = product.price - (product.price * (product.discount || 0)) / 100;

  return (
    <div className="w-full">
      <Card className="mt-20 p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="flex items-center justify-center bg-gray-50 rounded-xl p-4">
            <Image
              src={product.image[0]?.url || "/bata.png"}
              alt={product.name}
              width={400}
              height={400}
              className="rounded-xl object-contain"
            />
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-semibold text-customBlack">
              {product.name}
            </h1>

            <div className="flex flex-col gap-2">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">
                  ₹{discountedPrice.toFixed(2)}/Kg
                </span>
                {(product.discount ?? 0) > 0 && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      ₹{product.price}/kg
                    </span>
                    <span className="text-red-500">
                      -{product.discount}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Product Description */}
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-600">
                {product.description || "No description available"}
              </p>
            </div>

            {/* Additional Details */}
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Product Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Category:</p>
                  <p className="font-medium">
                    {product.category?.name || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Stock:</p>
                  <p className="font-medium">
                    {product.stock || "Out of stock"}
                  </p>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-8">
              <Button className="w-full md:w-auto px-12 py-6 text-lg">
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetailsPage;