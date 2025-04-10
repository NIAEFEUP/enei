import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import type User from "#models/user";
import { Link } from "@tuyau/inertia/react";

interface LeaderbordListProps {
  leaderboard: Array<User>;
}

export default function LeaderboardList({ leaderboard }: LeaderbordListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-enei-blue w-16">Lugar</TableHead>
          <TableHead className="text-enei-blue">Participante</TableHead>
          <TableHead className="text-enei-blue text-right">Pontos</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="border-t-enei-blue border-t-[0.15em]">
        {leaderboard?.map((user, idx) => {
          const slug = user.slug ?? " ";

          return (
            <TableRow key={user.id}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>
                <Link route="pages:profile.show" params={{ slug }}>
                  <p className="font-medium">
                    {user.participantProfile?.firstName} {user.participantProfile?.lastName}
                  </p>
                </Link>
              </TableCell>
              <TableCell className="text-right font-medium">{user.points}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
