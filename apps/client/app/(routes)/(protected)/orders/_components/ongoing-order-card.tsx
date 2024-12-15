import { Button } from '@/components/ui/button';

import Image from 'next/image';


interface ItemCardProps {
    itemName: string;
    itemImage: string;
    totalItems: number;
  }
  

const OngoingOrderCard = (
    { itemName, itemImage, totalItems }: ItemCardProps
) => {
  return (
    <div className='w-full flex items-center justify-between px-3 py-5 border-none shadow-none'>
        <div className="flex gap-6 items-center justify-center">
            <Image src={itemImage} alt={itemName} height={200} width={200} className='shrink-0'/>
            <div className="md:flex flex-col gap-1 hidden">
                <h1 className="text-lg font-semibold">{itemName}</h1>
                <h1 className="text-sm text-customGray">{totalItems} items</h1>
            </div>
        </div>
        <div className="md:flex items-center justify-center hidden">
            <Button className='px-6'>
                Track Order
            </Button>
        </div>
        <div className="flex flex-col gap-1 items-center justify-center md:hidden">
        <h1 className="text-lg font-semibold">{itemName}</h1>
        <h1 className="text-sm text-customGray">{totalItems} items</h1>
            <Button className='px-6'>
                Track Order
            </Button>
        </div>
    </div>
  )
}

export default OngoingOrderCard;
