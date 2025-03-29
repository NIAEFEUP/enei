import { JSX } from "react";

interface ReasonsToEnrollItemProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

export default function ReasonsToEnrollItem({
  icon,
  title,
  description,
}: ReasonsToEnrollItemProps) {
  return (
    <div className="bg-enei-beige text-enei-blue mt-14 flex flex-col gap-y-3 p-12">
      <div className="mx-auto h-10 w-10">{icon}</div>
      <h3 className="text-center text-2xl font-bold">{title}</h3>
      <p className="text-center">{description}</p>
    </div>
  );
}
