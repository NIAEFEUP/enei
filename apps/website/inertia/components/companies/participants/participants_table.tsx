"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { Heart, HeartOff, FileUser, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

interface Participant {
  id: number;
  name: string;
  photoUrl?: string;
  faculty?: string;
  course?: string;
  year?: string;
  cvLink?: string;
  likedBy: string[];
  isLiked: boolean;
}

interface ParticipantsTableProps {
  participants: Participant[];
  onToggleLike: (participantId: number, liked: boolean) => void;
}

const columns: ColumnDef<Participant>[] = [
  {
    accessorKey: "photo",
    header: "",
    cell: ({ row }) => {
      const participant = row.original;
      return (
        <Avatar className="text-enei-blue h-10 w-10">
          <AvatarImage src={participant.photoUrl} alt={participant.name} />
          <AvatarFallback>{participant.name[0]}</AvatarFallback>
        </Avatar>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => {
      const name = row.original.name;
      return (
        <div className="flex items-center">
          <span className="text-enei-blue text-sm font-medium">{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "faculty",
    header: "Universidade",
    cell: ({ row }) => {
      const faculty = row.original.faculty;
      return (
        <div className="flex items-center">
          <span className="text-enei-blue text-sm font-medium">{faculty || "-"}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "course",
    header: "Curso",
    cell: ({ row }) => {
      const course = row.original.course;
      return (
        <div className="flex items-center">
          <span className="text-enei-blue text-sm font-medium">{course || "-"}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "year",
    header: "Ano",
    cell: ({ row }) => {
      const year = row.original.year;
      return (
        <div className="flex items-center">
          <span className="text-enei-blue text-sm font-medium">{year || "-"}</span>
        </div>
      );
    },
  },
  {
    id: "likedBy",
    header: "Gostado por",
    cell: ({ row }) => {
      const likedBy = row.original.likedBy;
      return (
        <div className="flex items-center">
          {likedBy.length > 0 ? (
            <span className="text-enei-blue text-sm font-medium">{likedBy.join(", ")}</span>
          ) : (
            <span className="text-enei-blue text-sm font-medium">-</span>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const [liked, setLiked] = React.useState(row.original.isLiked);

      const toggleLike = () => {
        return setLiked((prev) => !prev);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-enei-blue h-8 w-8 p-0" size="sm">
              <span className="sr-only">Ações</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="">
            <DropdownMenuItem onClick={toggleLike} className="cursor-pointer">
              {liked ? <HeartOff className="mr-2 h-4 w-4" /> : <Heart className="mr-2 h-4 w-4" />}
              Like
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-row">
              <a
                href={row.original.cvLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row"
              >
                <FileUser className="mr-2 h-4 w-4" />
                CV
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];

export function ParticipantsTable({ participants }: ParticipantsTableProps) {
  const table = useReactTable({
    data: participants,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full overflow-x-auto">
      <div className="mt-4 rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id} className="border-transparent">
                {group.headers.map((header) => (
                  <TableHead key={header.id} className="text-enei-blue">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border-transparent">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No participants found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
