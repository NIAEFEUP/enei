"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
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
import axios from "axios";
import { useTuyau } from "~/hooks/use_tuyau";
import { router } from "@inertiajs/react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { useMemo } from "react";
import { cn } from "~/lib/utils";

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
      const liked = row.original.isLiked;
      const tuyau = useTuyau();

      const toggleLike = async () => {
        try {
          await axios.post(tuyau.$url("actions:company.like.participant"), {
            participantId: row.original.id,
          });
          router.reload();
        } catch (error) {
          console.error("Error liking participant:", error);
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-enei-blue h-8 w-8 p-0" size="sm">
              <span className="sr-only">Ações</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent onClick={toggleLike} align="end" className="">
            <DropdownMenuItem className="cursor-pointer">
              {liked ? <HeartOff className="mr-2 h-4 w-4" /> : <Heart className="mr-2 h-4 w-4" />}
              Like
            </DropdownMenuItem>
            {row.original.cvLink && (
              <DropdownMenuItem className="flex flex-row">
                <a
                  href={row.original.cvLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row"
                >
                  <FileUser className="mr-2 h-4 w-4" />
                  CV
                </a>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];

export function ParticipantsTable({ participants }: ParticipantsTableProps) {
  const t = useMemo(() => [
    ...structuredClone(participants), 
    ...structuredClone(participants), 
    ...structuredClone(participants), 
    ...structuredClone(participants), 
    ...structuredClone(participants), 
    ...structuredClone(participants), 
    ...structuredClone(participants), 
  ], [participants]);
  const table = useReactTable({
    data: t,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const currentPage = table.getState().pagination.pageIndex;

  const [hasMoreBefore, hasMoreAfter, possiblePages] = useMemo(() => {
    let firstPage = Math.max(0, currentPage - 2);
    let lastPage = Math.min(table.getPageCount() - 1, currentPage + 2);

    const hasBefore = firstPage > 0;
    const hasAfter = lastPage < table.getPageCount() - 1;

    return [
      hasBefore,
      hasAfter,
      Array.from({ length: lastPage - firstPage + 1 }, (_, i) => firstPage + i),
    ];
  }, [table, currentPage]);

  console.log({ hasMoreBefore, hasMoreAfter, possiblePages });

  console.log(table.getState().pagination.pageIndex);
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
                  Não foram encontrados participantes.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Pagination className={cn("mt-4 w-full mx-0")}>
          <PaginationContent className="flex flex-row justify-between max-w-lg w-full">
            {table.getCanPreviousPage() ? (
              <PaginationItem onClick={() => table.previousPage()}>
                <PaginationPrevious className="text-enei-blue cursor-pointer select-none rounded" />
              </PaginationItem>
            ): (<div/>)}
            <div className={cn("flex flex-row gap-2", {"pl-28": !table.getCanPreviousPage(), "pr-28": !table.getCanNextPage()})}>
              {hasMoreBefore && (
                <PaginationItem>
                  <PaginationEllipsis className="text-enei-blue cursor-pointer select-none rounded" />
                </PaginationItem>
              )}
              <>
                {possiblePages.map((page) => (
                  <PaginationItem key={page} onClick={() => table.setPageIndex(page)}>
                    <PaginationLink
                      className={cn("text-enei-blue cursor-pointer select-none rounded", {
                        "bg-muted/50": page === currentPage,
                      })}
                    >
                      {page + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              </>
              {hasMoreAfter && (
                <PaginationItem>
                  <PaginationEllipsis className="text-enei-blue cursor-pointer select-none rounded" />
                </PaginationItem>
              )}
            </div>
            {table.getCanNextPage() ? (
              <PaginationItem onClick={() => table.nextPage()}>
                <PaginationNext className="text-enei-blue cursor-pointer select-none rounded" />
              </PaginationItem>
            ): (<div />)}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
