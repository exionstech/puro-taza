import Link from "next/link";

const footerItemsLinks = [
  { title: "About", link: "/about" },
  { title: "Shop", link: "/shop" },
  { title: "Cart", link: "/cart" },
  { title: "Testimonials", link: "#testimonials" },
  { title: "Privacy", link: "/privacy" },
  { title: "Terms", link: "/terms" },
  { title: "FAQs", link: "/faqs" },
  { title: "Contact", link: "/contact" },
];

const footerItemsCategories = [
  { title: "Sea water fish", link: "/categories/sea-water-fish" },
  { title: "Salt water fish", link: "/categories/salt-water-fish" },
  { title: "Prawns", link: "/categories/prawns" },
  { title: "Fresh water fish", link: "/categories/fresh-water-fish" },
  { title: "Dry fish", link: "/categories/dry-fish" },
  { title: "Premium sea foods", link: "/categories/premium-sea-foods" },
  { title: "Frozen fish", link: "/categories/frozen-fish" },
  { title: "Fillet", link: "/categories/fillet" },
  { title: "Ready to cook", link: "/categories/ready-to-cook" },
];

const FooterSection = () => {
  return (
    <section className="w-full max-w-screen-2xl px-[1rem] md:px-14 mx-auto flex flex-col md:flex-row items-start gap-10 mt-10 md:mt-20">
      <div className="md:w-[60%] w-full flex gap-6 lg:justify-between">
        <div className="w-[40%] md:w-1/2 flex flex-col gap-4">
          <div className="w-full">
            <h1 className="text-2xl text-customBlack font-medium">
              Useful Links
            </h1>
          </div>
          <div className="flex items-center lg:gap-16 gap-4">
            <div className="flex flex-col gap-3 items-start">
              {footerItemsLinks.slice(0, 4).map((item) => (
                <Link
                  href={item.link}
                  key={item.title}
                  className="text-customGray text-sm hover:border-b-[2px] border-customGray"
                >
                  {item.title}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3 items-start">
              {footerItemsLinks.slice(4, 8).map((item) => (
                <Link
                  href={item.link}
                  key={item.title}
                  className="text-customGray text-sm hover:border-b-[2px] border-customGray"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="w-[60%] md:w-1/2 flex flex-col gap-4">
          <div className="w-full">
            <h1 className="text-2xl text-customBlack font-medium">
              Categories
            </h1>
          </div>
          <div className="flex items-center lg:gap-16 gap-4">
            <div className="flex flex-col gap-3 items-start">
              {footerItemsCategories.slice(0, 4).map((item) => (
                <Link
                  href={item.link}
                  key={item.title}
                  className="text-customGray text-sm hover:border-b-[2px] border-customGray"
                >
                  {item.title}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3 items-start">
              {footerItemsCategories.slice(4, 8).map((item) => (
                <Link
                  href={item.link}
                  key={item.title}
                  className="text-customGray text-sm hover:border-b-[2px] border-customGray"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="md:w-[40%] w-full flex items-center justify-center">
        <div className="w-full aspect-video rounded-lg overflow-hidden bg-white border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.501244011331!2d88.48770200862216!3d22.56034883333806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a020b007af9ca31%3A0xa3a41f4146303146!2sUEM!5e0!3m2!1sen!2sin!4v1731930397063!5m2!1sen!2sin"
            className="w-full h-full"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            aria-label="UEM location map"
          />
        </div>
      </div>
    </section>
  );
};

export default FooterSection;