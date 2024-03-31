/* eslint-disable react/prop-types */
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { useState } from "react";

export function AdminDataTable({ columns, data }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState();
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  // const authHeader = useAuthHeader();
  // const token = authHeader && authHeader.split(" ")[1];
  // const navigate = useNavigate();

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    // initialState: {
    //   filters: [
    //     {
    //       id: "carName", // Assuming the first column is for full name
    //       value: "",
    //     },
    //   ],
    // },
  });

  // const onChangeFilter = (id, value) => {
  //   table.getColumn(id)?.setFilterValue(value);
  // };

  const goToPreviousPage = () => {
    if (table.getCanPreviousPage()) {
      table.previousPage();
    }
  };

  const goToNextPage = () => {
    console.log("Next page");
    if (table.getCanNextPage()) {
      table.nextPage();
    }
  };

  return (
    <div>
      <div className="flex items-center py-4">
        {/* <Label className="flex justify-center items-center border border-gray-300 rounded-lg w-[300px] h-11">
          <Input
            className="border-none rounded-lg w-full outline-none ring-0 p-2 placeholder:text-base"
            value={table.getColumn("carName")?.getFilterValue() ?? ""}
            placeholder="Search"
            onChange={(e) => onChangeFilter("carName", e.target.value)}
          />
          <div className="p-2">
            <Search strokeWidth={2.25} className="text-gray-300" />
          </div>
        </Label> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuItem
                  key={column.id}
                  onClick={() => column.toggleVisibility()}
                >
                  {column.id}
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className=" text-center">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  {/* <TableCell className="text-center">
                    <Button
                      variant="danger"
                      onClick={() => onDelete(row.original)}
                    >
                      Delete
                    </Button>
                  </TableCell> */}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1} // Include the extra column for delete button
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4"></div>
    </div>
  );
}
