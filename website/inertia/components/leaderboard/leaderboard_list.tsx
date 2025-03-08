import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"

import User from "#models/user"
import { Link } from "@tuyau/inertia/react"

interface LeaderbordListProps {
    leaderboard: Array<User>
}

export default function LeaderboardList({
    leaderboard
}: LeaderbordListProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-16">Lugar</TableHead>
                    <TableHead>Participante</TableHead>
                    <TableHead className="text-right">Pontos</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {leaderboard?.map((user, idx) => {
                    const slug = user.participantProfile.slug ?? " "

                    return (
                        <TableRow key={user.id}>
                            <TableCell>
                                {idx + 1}
                            </TableCell>
                            <TableCell>
                                <Link route="pages:profile.show" params={{ slug }}>
                                    <p className="font-medium">
                                        {user.participantProfile?.firstName} {user.participantProfile?.lastName}
                                    </p>
                                </Link>
                            </TableCell>
                            <TableCell className="text-right font-medium">{user.points}</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>

    )
}