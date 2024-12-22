import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker } from 'react-day-picker'

import { cn } from '~/lib/utils'
import { Button, buttonVariants } from '~/components/ui/button'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function ChangeMonthButton({ className, ...props }:  React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button variant="outline" className={cn(className, 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100')} {...props} /> 
  )
}

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'MONTHS flex flex-col',
        month: 'MONTH space-y-4',
        month_caption: 'MONTH_CAPTION flex justify-center pt-1 relative items-center',
        caption_label: 'CAPTION_LABEL text-sm font-medium',
        nav: 'NAV flex items-center justify-between',
        table: 'TABLE w-full border-collapse space-y-1',
        head_row: 'HEAD_ROW flex',
        head_cell: 'HEAD_CELL text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
        row: 'ROW flex w-full mt-2',
        cell: cn(
          'CELL relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md'
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'DAY table-cell h-8 w-8 p-0 font-normal aria-selected:opacity-100'
        ),
        day_button: 'DAY_BUTTON w-full h-full flex items-center justify-center',
        day_range_start: 'DAY_RANGE_START day-range-start',
        day_range_end: 'DAY_RANGE_END day-range-end',
        day_selected:
          'DAY_SELECTED bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'DAY_TODAY bg-accent text-accent-foreground',
        outside:
          'OUTSIDE text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground',
        day_disabled: 'DAY_DISABLED text-muted-foreground opacity-50',
        day_range_middle:
          'DAY_RANGE_MIDDLE aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'DAY_HIDDEN invisible',
        ...classNames,
      }}
      components={{
        PreviousMonthButton: ({ ...props }) => (
          <ChangeMonthButton {...props}> 
            <ChevronLeft className="w-full h-full" />
          </ChangeMonthButton>
        ),
        NextMonthButton: ({ ...props }) => (
          <ChangeMonthButton {...props}> 
            <ChevronRight className="w-full h-full" />
          </ChangeMonthButton>
        ),
        // DayButton: ({ className, ...props }) => (
        //   <button className={cn('DAY_BUTTON flex items-center justify-center', className)} {...props} />
        // ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
