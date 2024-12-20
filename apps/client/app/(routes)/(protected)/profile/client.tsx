"use client"
import { useEffect, useState } from "react";
import { UserCircle2, MapPin } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";

import ProfileInformation from "./_components/profile-information";
import EditAddressSection from "./_components/edit-address";

const ProfileClientPage = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null;
  }

  if (!user) {
    return null;
  }

  return (
    <section className="w-full max-w-screen-2xl mx-auto px-5 md:px-14 py-8">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <UserCircle2 className="w-4 h-4" />
            Profile Information
          </TabsTrigger>
          <TabsTrigger value="addresses" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Address Book
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileInformation user={user} />
        </TabsContent>

        <TabsContent value="addresses">
          <EditAddressSection user={user}/>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default ProfileClientPage;