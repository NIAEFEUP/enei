import { Button } from "@enei/shadcn/ui/button";
import { cn } from "~/lib/utils";
import { ScrollArea, ScrollBar } from "@enei/shadcn/ui/scroll-area";

interface DaySelectorProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  days: String[];
}

export function DaySelector({ activeIndex, setActiveIndex, days }: DaySelectorProps) {
  return (
    <ScrollArea>
      <div className="flex flex-row space-x-3">
        {days.map((day, index) => (
          <Button
            key={index}
            className={cn(
              "text-enei-beige transition-all duration-300",
              index === activeIndex ? "font-bold" : "opacity-50",
            )}
            onClick={() => setActiveIndex(index)}
          >
            Dia {index + 1}
            {index === activeIndex ? " - " + day : ""}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
