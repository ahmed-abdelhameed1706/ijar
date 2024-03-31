import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  //   DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";

export const columns = [
  {
    id: "ID",
    accessorKey: "cartId",
    accessorFn: (row) => row._id,
    header: "cart ID",
  },
  {
    id: "carName",
    accessorKey: "carName",
    accessorFn: (row) => (row.carId ? row.carId.brandName : "N/A"),
    header: "Car BrandName",
  },
  {
    id: "Model",
    accessorKey: "carModel",
    accessorFn: (row) => (row.carId ? row.carId.model : "N/A"),
    header: "Car Model",
  },

  {
    id: "Price",
    accessorKey: "carPrice",
    accessorFn: (row) => row.totalCost,
    header: "Total Cost",
  },

  {
    id: "Start Date",
    accessorKey: "startDate",
    accessorFn: (row) => row.startDate,
    header: "Start Date",
  },

  {
    id: "End Date",
    accessorKey: "endDate",
    accessorFn: (row) => row.endDate,
    header: "End Date",
  },

  {
    id: "Rental Term",
    accessorKey: "rentalTerm",
    accessorFn: (row) => row.rentalTerm,
    header: "Rental Term",
  },

  {
    id: "status",
    accessorKey: "status",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    accessorFn: (row) => row.status.toString(),
    header: "Status",
    cell: ({ row }) => {
      const booking = row.original;

      return (
        <span
          className={`px-2 py-1 text-xs inline-flex font-semibold text-white rounded-full ${
            booking.status === "Pending"
              ? "bg-yellow-500"
              : booking.status === "Completed"
              ? "bg-green-500"
              : booking.status === "Canceled"
              ? "bg-red-500"
              : booking.status === "In Progress"
              ? "bg-blue-500"
              : ""
          }`}
        >
          {booking.status}
        </span>
      );
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const booking = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <Ellipsis className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem>View booking details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
