import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React from "react";
import OngoingOrder from "./ongoing-order";
import HistoryOrder from "./history-order";

const MyOrders = () => {
  return (
    <div className="w-full flex flex-col gap-10">
        <div className="w-full">
            <h1 className="text-xl font-bold">My Orders</h1>
        </div>
      <Tabs defaultValue="ongoing" className="w-full">
        <TabsList className="justify-between flex w-full">
          <TabsTrigger className="w-[50%] text-center text-xl" value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger className="w-[50%] text-center text-xl" value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="ongoing" className="pt-3">
          <OngoingOrder/>
        </TabsContent>
        <TabsContent value="history">
            <HistoryOrder/>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyOrders;
