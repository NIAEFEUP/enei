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
import { Heart, HeartOff, ExternalLink } from "lucide-react";

export type Participant = {
  id: string;
  name: string;
  photoUrl?: string;
  faculty: string;
  course: string;
  year: string;
  cvLink: string;
  likedBy: string[];
  isLiked: boolean;
};

const data: Participant[] = [
  {
    id: "1",
    name: "Ana Silva",
    photoUrl: "/avatars/ana.jpg",
    faculty: "FEUP",
    course: "Engenharia Informática",
    year: "3º",
    cvLink: "https://example.com/cv/ana",
    likedBy: ["Empresa A", "Empresa B"],
    isLiked: false,
  },
  {
    id: "2",
    name: "Carlos Sousa",
    faculty: "FEP",
    course: "Economia",
    year: "2º",
    cvLink: "https://example.com/cv/carlos",
    likedBy: [],
    isLiked: true,
  },
];

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
          <span className="text-enei-blue text-sm font-medium">{faculty}</span>
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
          <span className="text-enei-blue text-sm font-medium">{course}</span>
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
          <span className="text-enei-blue text-sm font-medium">{year}</span>
        </div>
      );
    },
  },
  {
    id: "cv",
    header: "CV",
    cell: ({ row }) => (
      <Button size="sm" className="text-enei-beige" asChild>
        <a href={row.original.cvLink} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="mr-1 h-4 w-4" />
          CV
        </a>
      </Button>
    ),
  },
  {
    id: "likedBy",
    header: "Gostado por",
    cell: ({ row }) => row.original.likedBy.join(", ") || "—",
  },
  {
    id: "like",
    header: "",
    cell: ({ row }) => {
      const [liked, setLiked] = React.useState(row.original.isLiked);

      const toggleLike = () => setLiked((prev) => !prev);

      return (
        <Button variant="ghost" size="icon" onClick={toggleLike}>
          {liked ? (
            <HeartOff className="text-red-500" />
          ) : (
            <Heart className="text-muted-foreground" />
          )}
        </Button>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];

export function ParticipantsTable() {
  const table = useReactTable({
    data,
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
                <TableRow key={row.id}>
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
