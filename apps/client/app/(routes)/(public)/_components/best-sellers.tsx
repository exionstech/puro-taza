import React from 'react';
import ItemCard from './sub-components/best-sellers/item-card';
import { Marquee } from '@/components/shared/marqee';

const items = [
    {
      itemName: 'Rohu (Rui Fish)',
      itemImage: '/home/seller-card/rui.png',
      itemPrice: 150,
      discount: 20,
    },
    {
      itemName: 'Katla Fish',
      itemImage: '/home/seller-card/katla.png',
      itemPrice: 150,
      discount: 20,
    },
    {
      itemName: 'Topshey Fish',
      itemImage: '/home/seller-card/topshey.png',
      itemPrice: 150,
      discount: 20,
    },
    {
      itemName: 'Bata Fish',
      itemImage: '/home/seller-card/bata.png',
      itemPrice: 150,
      discount: 20,
    },
    {
      itemName: 'Bhetki Fish',
      itemImage: '/home/seller-card/bhetki.png',
      itemPrice: 150,
      discount: 20,
    },
    {
      itemName: 'Mud Crab',
      itemImage: '/home/seller-card/mud-crab.png',
      itemPrice: 150,
      discount: 20,
    },
    {
      itemName: 'Pabda Fish',
      itemImage: '/home/seller-card/pabda.png',
      itemPrice: 150,
      discount: 20,
    },
    {
      itemName: 'Pomfret Fish',
      itemImage: '/home/seller-card/pomphet.png',
      itemPrice: 150,
      discount: 20,
    },
  ];


const BestSellers = () => {


  return (
    <section className="w-full max-w-screen-2xl h-auto px-5 md:px-14 flex items-center flex-col mx-auto gap-10 mt-10">
      <div className="w-full md:text-start text-center">
        <h1 className="text-3xl text-customBlack font-medium">Best Sellers</h1>
      </div>
      <Marquee pauseOnHover className="[--duration:50s] max-w-screen-2xl [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div className="flex gap-6 w-max py-2 overflow-x-hidden">
          {items.map((item, index) => (
            <ItemCard
              key={index}
              itemName={item.itemName}
              itemImage={item.itemImage}
              itemPrice={item.itemPrice}
              discount={item.discount}
            />
          ))}
        </div>
      </Marquee>
    </section>
  );
};

export default BestSellers;
