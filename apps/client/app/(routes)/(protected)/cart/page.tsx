import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { ChevronLeft } from "lucide-react";
import EmptyCart from "./_components/empty-cart";

const CartPage = () => {
  return (
    <section className="w-full max-w-screen-2xl mx-auto px-5 md:px-14 flex items-start flex-col">
      <div className="flex w-full mt-16">
        <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="flex gap-2 items-center">
              <ChevronLeft className="w-4 h-4"/>
              Back
              </BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="w-full flex items-center justify-center">
        <EmptyCart/>
      </div>
    </section>
  );
};

export default CartPage;