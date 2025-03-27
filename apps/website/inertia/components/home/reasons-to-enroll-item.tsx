import { JSX } from "react"

interface ReasonsToEnrollItemProps {
    icon: JSX.Element
    title: string
    description: string
}

export default function ReasonsToEnrollItem({
    icon,
    title,
    description
}: ReasonsToEnrollItemProps) {
    return (
        <div className="flex flex-col gap-y-3 bg-enei-beige text-enei-blue p-12 mt-14">
            <div className="mx-auto h-10 w-10">
                {icon}
            </div>
            <h3 className="text-2xl font-bold text-center">
                {title}
            </h3>
            <p className="text-center">
                {description}
            </p>
        </div>
    )
}