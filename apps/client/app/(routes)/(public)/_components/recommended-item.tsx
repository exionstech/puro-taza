import React from 'react';
import ItemCard from './sub-components/best-sellers/item-card';

const items = [
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

const RecommendedItem = () => {

  return (
    <section className="w-full max-w-screen-2xl h-auto px-5 md:px-14 flex items-center flex-col mx-auto gap-10 mt-10 md:mt-16">
      <div className="w-full md:text-start text-center">
        <h1 className="text-3xl text-customBlack font-medium">Recommended</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
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
    </section>
  );
};

export default RecommendedItem
