import * as React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@enei/react-utils/cn";
import { Button, buttonVariants } from "#components/ui/button";
import { addYears, subYears } from "date-fns";

type CalendarProps = React.ComponentProps<typeof DayPicker> & { initialMonth?: Date };

function ChangeMonthButton({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      variant="outline"
      className={cn(className, "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100")}
      {...props}
    />
  );
}

function ChangeYearButton({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      variant="outline"
      className={cn(className, "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100")}
      {...props}
    />
  );
}

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  const [month, setMonth] = React.useState(() => {
    if (props.mode === "single" && "selected" in props) return props.selected;

    return props.initialMonth ?? new Date();
  });

  return (
    <DayPicker
      month={month}
      onMonthChange={setMonth}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col",
        month: "space-y-4",
        caption: "flex justify-center pt-2 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "flex items-center justify-between",
        table: "w-full border-collapse space-x-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md",
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "table-cell h-8 w-8 p-0 font-normal aria-selected:opacity-100",
        ),
        day_button: "w-full h-full flex items-center justify-center",
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        PreviousMonthButton: ({ ...props }) => (
          <div className="flex gap-1">
            <ChangeYearButton onClick={() => setMonth((month) => subYears(month, 1))}>
              <ChevronsLeft className="h-full w-full" />
            </ChangeYearButton>
            <ChangeMonthButton {...props}>
              <ChevronLeft className="h-full w-full" />
            </ChangeMonthButton>
          </div>
        ),
        NextMonthButton: ({ ...props }) => (
          <div className="flex gap-1">
            <ChangeMonthButton {...props}>
              <ChevronRight className="h-full w-full" />
            </ChangeMonthButton>
            <ChangeYearButton onClick={() => setMonth((month) => addYears(month, 1))}>
              <ChevronsRight className="h-full w-full" />
            </ChangeYearButton>
          </div>
        ),
      }}
      {...props}
    />
  );
}

export { Calendar };
