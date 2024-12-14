import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React from "react";

const MyOrders = () => {
  return (
    <div className="w-full flex flex-col gap-10">
        <div className="w-full">
            <h1 className="text-xl font-bold">My Orders</h1>
        </div>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="justify-between flex w-full">
          <TabsTrigger className="w-[50%] text-center text-xl" value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger className="w-[50%] text-center text-xl" value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="ongoing">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="history">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default MyOrders;
