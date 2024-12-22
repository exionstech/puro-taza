import WishlistCardSection from "./_components/wishlist-card-section";

export default function Page() {
  return (
    <section className="w-full min-h-screen max-w-screen-2xl mx-auto px-5 md:px-14 flex flex-col gap-10 mt-20">
        <div>
            <h1 className="text-3xl font-semibold">Wishlist Items</h1>
        </div>
        <WishlistCardSection/>
    </section>
  )
}