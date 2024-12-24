"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import useProductDetails from "@/hooks/use-product-details";
import useCart from "@/hooks/use-cart";
import useWishlist from "@/hooks/use-wishlist";
import ProductImageComponent from "./image-component";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductDetailsPageProps {
  productId: string;
}

const ProductDetailsPage = ({ productId }: ProductDetailsPageProps) => {
  const { product, isLoading, error } = useProductDetails(productId);
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [quantity, setQuantity] = useState(1);
  const cart = useCart();
  const wishlist = useWishlist();

  useEffect(() => {
    const cartQty = cart.getItemQuantity(productId);
    setQuantity(cartQty);
    setIsInCart(cartQty > 0);
  }, [cart, productId]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-red-500">{error || "Product not found"}</p>
      </div>
    );
  }

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    cart.addItem(product, quantity);
  };

  const handleToggleWishlist = () => {
    if (wishlist.isItemInWishlist(product.id)) {
      wishlist.removeItem(product.id);
    } else {
      wishlist.addItem(product);
    }
  };

  const isInWishlist = wishlist.isItemInWishlist(product.id);

  const discountedPrice =
    product.price - (product.price * (product.discount || 0)) / 100;

  return (
    <div className="w-full flex lg:flex-row flex-col lg:gap-10 gap-5">
      <div className="flex items-center justify-center p-4 overflow-hidden pb-10">
        <ProductImageComponent
          images={product.image}
          productName={product.name}
        />
      </div>
      <div className="flex items-start flex-col gap-4 w-full">
        <div className="w-full">
          <h1 className="text-3xl font-semibold text-customBlack">
            {product.name}
          </h1>
          <p className="text-lg">
            {product.description || "No description available"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl font-medium">
            ₹{discountedPrice.toFixed(2)}/Kg
          </span>
          <span className="text-lg text-gray-500 line-through">
            ₹{product.price}/kg
          </span>
          <span className="text-red-500">-{product.discount}% OFF</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-2 items-center">
            {/* <h1>Select Quantity</h1>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Quantity</SelectLabel>
                  <SelectItem value="apple"></SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select> */}
          </div>
        </div>
        <div className="flex gap-10 w-full items-center">
          <Button
            onClick={handleToggleWishlist}
            variant={isInWishlist ? "default" : "outline"}
            className={`w-full py-6 lg:px-12 text-lg border ${
              isInWishlist
                ? ""
                : "border-violet hover:bg-violet hover:text-white text-violet"
            }`}
          >
            {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          </Button>
          <Button
            onClick={handleAddToCart}
            className={`w-full lg:px-12 py-6 text-lg ${
              isInCart
                ? "text-white cursor-not-allowed"
                : "text-white hover:bg-white border hover:border-violet hover:text-violet"
            }`}
            disabled={isInCart || quantity >= product.stock}
          >
            {" "}
            {isInCart ? "Added in cart" : "Add to cart"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
