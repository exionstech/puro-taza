import Image from "next/image";
import Link from "next/link";

const socials = [
    { name: 'facebook', link: 'https://www.facebook.com/', image:"/copy-right/facebook.svg" },
    { name: 'twitter', link: 'https://www.twitter.com/', image:"/copy-right/twitter.svg" },
    { name: 'instagram', link: 'https://www.instagram.com/', image:"/copy-right/insta.svg" },
]

const Copyright = () => {
  return (
    <section className='w-full max-w-screen-2xl mx-auto px-5 md:px-14 py-2 flex items-center justify-between mt-6'>
        <div className="">
            <h1 className='text-customGray'>© 2024 PuroTaja. All Rights Reserved</h1>
        </div>
        <div className="items-center flex justify-center gap-3">
          {socials.map((social, index) => (
            <Link href={social.link} key={index} className="cursor-pointer">
              <Image src={social.image} alt={social.name} width={20} height={20} />
            </Link>
          ))}
        </div>
    </section>
  )
}

export default Copyright;
