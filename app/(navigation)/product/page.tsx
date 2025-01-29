"use client"

import React, { useEffect, useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { BreadcrumbComponent } from '@/components/breadcrumb';
import { DataTable } from '@/components/dataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Product } from '@/interface/Product';
import { faker } from "@faker-js/faker";
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Plus, SquarePen, Trash2 } from 'lucide-react';
import { customNumberFormat } from '@/functions/general';

export default function ProductPage() {
    const [data, setData] = useState<Product[]>([]);

    const columns: ColumnDef<Product>[] = [
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
            accessorKey: "sku",
            header: "SKU",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("sku")}</div>
            ),
        },
        {
            accessorKey: "name",
            header: "Nama",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("name")}</div>
            ),
        },
        {
            accessorKey: "category",
            header: "Kategori",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("category")}</div>
            ),
        },
        {
            accessorKey: "hpp",
            header: "HPP",
            cell: ({ row }) => (
                <div className="capitalize">Rp. {customNumberFormat(row.getValue("hpp"))}</div>
            ),
        },
        {
            accessorKey: "price",
            header: "Harga Jual",
            cell: ({ row }) => (
                <div className="capitalize">Rp. {customNumberFormat(row.getValue("price"))}</div>
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

    useEffect(() => {
        const item = Array.from({ length: 1000 }, (_, index) => ({
            id: (index + 1).toString(),
            sku: `SKU-${String(index + 1).padStart(4, "0")}`,
            category: faker.helpers.arrayElement([
                "Electronics",
                "Clothing",
                "Home Appliances",
                "Gaming",
                "Footwear",
                "Beauty",
                "Sports",
                "Books",
            ]),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            hpp: faker.number.int({ min: 50000, max: 1000000 }),
            price: faker.number.int({ min: 100000, max: 2000000 }),
            image: faker.image.urlLoremFlickr({ category: "product" }),
        }));

        setData(item)
    }, [])

    return (
        <>
            <BreadcrumbComponent
                data={[
                    { title: 'Produk', url: '' },
                ]}
            />
            <div className="p-4 pt-0 ">
                <DataTable
                    actions={actions}
                    data={data}
                    columns={columns}
                />
            </div>
        </>
    )
}