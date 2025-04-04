import { TabsContent } from "@radix-ui/react-tabs";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import StoreReservedProducts from "./store_reserved_products";
import Container from "../common/containers";
import { UserActivityInformation } from "../../../types/user_activity";

interface ProfileActivityInfoProps {
  activityInformation: UserActivityInformation;
}

export default function ProfileActivityInfo({ activityInformation }: ProfileActivityInfoProps) {
  return (
    <Tabs defaultValue="events">
      <TabsList className="w-full">
        <TabsTrigger value="events" className="w-full">
          Eventos
        </TabsTrigger>
        <TabsTrigger value="store" className="w-full">
          Loja
        </TabsTrigger>
      </TabsList>
      <TabsContent value="events">
        <p>To implement</p>
      </TabsContent>
      <TabsContent value="store" className="mt-4">
        <Container className="grid grid-cols-1 justify-center gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <StoreReservedProducts products={activityInformation?.store} />
        </Container>
      </TabsContent>
    </Tabs>
  );
}
