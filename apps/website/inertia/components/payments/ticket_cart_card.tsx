import React from "react";
import { Card, CardTitle, CardDescription, CardContent } from "@enei/shadcn/ui/card";

interface TicketCartCardProps {
  title: string;
  description: string;
  price: number;
}

export const TicketCartCard: React.FC<TicketCartCardProps> = ({ title, description, price }) => {
  return (
    // for small screens, limit the max width, otherwise, use the full width
    <Card>
      <CardContent className="mt-6">
        <div className="flex flex-col items-center justify-between sm:flex-row sm:space-x-8">
          <img src="/favicon.svg" alt="Item" className="hidden h-16 w-16 sm:block" />
          <div className="space-y-2">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <strong className="text-lg">{price}€</strong>
        </div>
      </CardContent>
    </Card>
  );
};
