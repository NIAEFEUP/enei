import { Badge } from "~/components/ui/badge"
import { EventType } from "./highlights"
import { cva } from "class-variance-authority"
import { cn } from "~/lib/utils"


interface HighlightCardProps {
    title: string
    person: string
    schedule: string
    type: EventType,
    image: string
}

const highlightCardVariants = cva(
    'border border-2 rounded-xl w-fit py-0 max-w-xl h-fit h-[16.35em]',
    {
        variants: {
            variant: {
                workshop: 'bg-enei-workshop',
                palestra: 'bg-enei-talk',
            },
        },
        defaultVariants: {
            variant: 'workshop',
        },
    }
)

const getVariant = (type: EventType) => {
    switch (type) {
        case EventType.Workshop:
            return 'workshop'
        case EventType.Talk:
            return 'palestra'
    }
}

export default function HighlightCard({
    title,
    person,
    schedule,
    type,
    image
}: HighlightCardProps) {
    return (
        <article className={cn(highlightCardVariants({ variant: getVariant(type)}))}>
            <div className="flex flex-row gap-x-4">
                <img 
                    className="w-48 h-64 object-cover rounded-xl" 
                    src={`/images/people/${image}`} 
                    alt={`${person} picture`}
                />
                <div className="flex flex-col gap-y-2 py-8 px-4">
                    <div>
                        <h3 className="text-xl font-bold text-enei-blue">
                            {title}
                        </h3>
                        <p className="text-lg text-enei-blue">
                            {person}
                        </p>
                        <p className="text-sm text-enei-blue">
                            {schedule}
                        </p>
                    </div>
                    <Badge className="w-1/3 bg-enei-beige text-enei-blue">
                        {type}
                    </Badge>
                </div>
            </div>
        </article>
    )
}