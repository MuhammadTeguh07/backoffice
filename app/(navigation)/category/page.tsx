"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BreadcrumbComponent } from '@/components/breadcrumb';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Category } from '@/interface/Category';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Plus, SquarePen, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/dataTable';

export default function CategoryPage() {

  const data: Category[] = [
    {
      id: "m5gr84i9",
      name: "ken99@yahoo.com",
    },
    {
      id: "3u1reuv4",
      name: "Abe45@gmail.com",
    },
    {
      id: "derv1ws0",
      name: "Monserrat44@gmail.com",
    },
    {
      id: "5kma53ae",
      name: "Silas22@gmail.com",
    },
    {
      id: "bhqecj4p",
      name: "carmella@hotmail.com",
    },
    {
      id: "m5gr84i9",
      name: "ken99@yahoo.com",
    },
    {
      id: "3u1reuv4",
      name: "Abe45@gmail.com",
    },
    {
      id: "derv1ws0",
      name: "Monserrat44@gmail.com",
    },
    {
      id: "5kma53ae",
      name: "Silas22@gmail.com",
    },
    {
      id: "bhqecj4p",
      name: "carmella@hotmail.com",
    },
    {
      id: "m5gr84i9",
      name: "ken99@yahoo.com",
    },
    {
      id: "3u1reuv4",
      name: "Abe45@gmail.com",
    },
    {
      id: "derv1ws0",
      name: "Monserrat44@gmail.com",
    },
    {
      id: "5kma53ae",
      name: "Silas22@gmail.com",
    },
    {
      id: "bhqecj4p",
      name: "carmella@hotmail.com",
    },
  ]

  const columns: ColumnDef<Category>[] = [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={
    //         table.getIsAllPageRowsSelected() ||
    //         (table.getIsSomePageRowsSelected() && "indeterminate")
    //       }
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorKey: "name",
      header: "Nama",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      id: "actions",
      header: "Aksi",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem><SquarePen />Ubah</DropdownMenuItem>
              <DropdownMenuItem><Trash2 />Hapus</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const actions = [<Button size={"sm"}><Plus /> Tambah</Button>]

  return (
    <>
      <BreadcrumbComponent
        data={[
          { title: 'Kategori', url: '' },
        ]}
      />

      <div className="p-4 pt-0">
        <DataTable
          actions={actions}
          data={data}
          columns={columns}
        />
      </div>
    </>
  )
}