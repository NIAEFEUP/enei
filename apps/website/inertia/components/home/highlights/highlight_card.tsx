import { Badge } from "~/components/ui/badge";
import { EventType } from "./highlights";
import { cva } from "class-variance-authority";
import { cn } from "~/lib/utils";

interface HighlightCardProps {
  title: string;
  person: string;
  schedule: string;
  type: EventType;
  image: string;
}

const highlightCardVariants = cva(
  "flex flex-row gap-x-4 rounded-xl w-fit py-0 max-w-sm md:max-w-xl h-[16.35em]",
  {
    variants: {
      variant: {
        workshop: "bg-enei-workshop",
        palestra: "bg-enei-talk",
      },
    },
    defaultVariants: {
      variant: "workshop",
    },
  },
);

const getVariant = (type: EventType) => {
  switch (type) {
    case EventType.Workshop:
      return "workshop";
    case EventType.Talk:
      return "palestra";
  }
};

export default function HighlightCard({
  title,
  person,
  schedule,
  type,
  image,
}: HighlightCardProps) {
  return (
    <article className={cn(highlightCardVariants({ variant: getVariant(type) }))}>
      <img
        className="h-full w-48 rounded-xl object-cover"
        src={`/images/people/${image}`}
        alt={`${person} picture`}
      />
      <div className="flex flex-col gap-y-2 px-4 py-8">
        <div>
          <h4 className="text-enei-blue text-xl font-bold">{title}</h4>
          <p className="text-enei-blue text-lg">{person}</p>
          <p className="text-enei-blue text-sm">{schedule}</p>
        </div>
        <Badge className="bg-enei-beige text-enei-blue w-fit">{type}</Badge>
      </div>
    </article>
  );
}
