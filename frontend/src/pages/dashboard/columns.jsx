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
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const booking = row.original;

      return (
        <Avatar className=" justify-center">
          <AvatarImage src="https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?" />

          <AvatarFallback>BMW</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    id: "carName",
    accessorKey: "carName",
    accessorFn: (row) => row.carName,
    header: "Car Name",
  },
  {
    id: "carModel",
    accessorKey: "carModel",
    accessorFn: (row) => row.carModel,
    header: "Car Model",
  },
  {
    accessorKey: "deliverylocation",
    header: "Delivery Location",
  },
  {
    accessorKey: "pickupLocation",
    header: "Pickup Location",
  },
  {
    accessorKey: "BookingDate",
    header: "Booking Date",
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
    accessorKey: "total",
    header: "Total",
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
