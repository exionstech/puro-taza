import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import WishlistCardSection from "./_components/wishlist-card-section";
import { ChevronLeft } from "lucide-react";

export default function Page() {
  return (
    <section className="w-full min-h-screen max-w-screen-2xl mx-auto px-5 md:px-14 flex flex-col gap-10 mt-20">
      <div className="flex w-full flex-col gap-4">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/" className="flex gap-2 items-center">
                            <ChevronLeft className="w-4 h-4"/>
                            Back
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            <h1 className="text-3xl font-semibold">Wishlist Items</h1>
        </div>
        <WishlistCardSection/>
    </section>
  )
}