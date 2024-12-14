import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card'
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
    <Card className='w-full flex items-center justify-between px-3 py-3'>
        <div className="flex gap-6 items-center justify-center">
            <Image src={itemImage} alt={itemName} height={50} width={50} className='shrink-0'/>
            <div className="flex flex-col gap-2 text-center">
                <h1 className="text-lg font-semibold">{itemName}</h1>
                <h1 className="text-sm text-customGray">{totalItems} items</h1>
            </div>
        </div>
        <div className="">
            <Button className='px-6'>
                Track Order
            </Button>
        </div>
    </Card>
  )
}

export default OngoingOrderCard
