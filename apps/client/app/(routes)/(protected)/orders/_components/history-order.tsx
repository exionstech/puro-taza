import HistoryOrderCard from "./history-order-card";
import { cn } from "@/lib/utils";

const items = [
  {
    itemName: "Rohu (Rui Fish)",
    itemImage: "/home/seller-card/rui.png",
    totalItems: 1,
    isComplete: true,
  },
  {
    itemName: "Katla Fish",
    itemImage: "/home/seller-card/katla.png",
    totalItems: 2,
    isComplete: false,
  },
  {
    itemName: "Topshey Fish",
    itemImage: "/home/seller-card/topshey.png",
    totalItems: 3,
    isComplete: true,
  },
  {
    itemName: "Bata Fish",
    itemImage: "/home/seller-card/bata.png",
    totalItems: 4,
    isComplete: false,
  },
];
const HistoryOrder = () => {
  return (
    <div className="w-full flex flex-col">
      {items.map((item, index) => (
        <>
          <HistoryOrderCard
            key={index}
            itemName={item.itemName}
            itemImage={item.itemImage}
            totalItems={item.totalItems}
            isComplete={item.isComplete}
          />
          {index < items.length - 1 && (
            <div className={cn("border-b-[3px] border-muted")} />
          )}
        </>
      ))}
    </div>
  );
};

export default HistoryOrder;
