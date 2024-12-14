import OngoingOrderCard from "./ongoing-order-card";
import { cn } from "@/lib/utils";

const items = [
  {
    itemName: "Rohu (Rui Fish)",
    itemImage: "/home/seller-card/rui.png",
    totalItems: 1,
  },
  {
    itemName: "Katla Fish",
    itemImage: "/home/seller-card/katla.png",
    totalItems: 2,
  },
  {
    itemName: "Topshey Fish",
    itemImage: "/home/seller-card/topshey.png",
    totalItems: 3,
  },
  {
    itemName: "Bata Fish",
    itemImage: "/home/seller-card/bata.png",
    totalItems: 4,
  },
];
const OngoingOrder = () => {
  return (
    <div className="w-full flex flex-col">
      {items.map((item, index) => (
        <>
          <OngoingOrderCard
            key={index}
            itemName={item.itemName}
            itemImage={item.itemImage}
            totalItems={item.totalItems}
          />
          {index < items.length - 1 && (
            <div className={cn("border-b-[3px] border-muted")}/>
          )}
        </>
      ))}
    </div>
  );
};

export default OngoingOrder;
