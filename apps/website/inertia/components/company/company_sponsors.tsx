import { SponsorVariant } from "#models/company";
import { cva } from "class-variance-authority";
import { cn } from "~/lib/utils";

const sponsorsVariant = cva("text-md", {
  variants: {
    variant: {
      default: "",
      gold: "text-persian-orange",
      silver: "text-brown-400",
      bronze: "text-red-400",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface CompanySponsorsProps {
  sponsor: SponsorVariant;
}

export default function CompanySponsorText({ sponsor }: CompanySponsorsProps) {
  return (
    <h3 className={cn(sponsorsVariant({ variant: sponsor }), "text-lg font-bold")}>
      <span>{`${sponsor[0].toUpperCase()}${sponsor.slice(1).toLowerCase()}`}</span> Sponsor
    </h3>
  );
}
