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

export const AdminColumns = [
  {
    id: "ID",
    accessorKey: "carId",
    accessorFn: (row) => row.id,
    header: "Car ID",
  },
  {
    id: "Name",
    accessorKey: "carName",
    accessorFn: (row) => row.brandName,
    header: "Car Name",
  },
  {
    id: "Model",
    accessorKey: "carModel",
    accessorFn: (row) => row.model,
    header: "Car Model",
  },
  {
    id: "Type",
    accessorKey: "carType",
    accessorFn: (row) => row.type,
    header: "Car Type",
  },
  {
    id: "Year",
    accessorKey: "carYear",
    accessorFn: (row) => row.year,
    header: "Car Year",
  },

  {
    id: "Color",
    accessorKey: "carColor",
    accessorFn: (row) => row.color,
    header: "Car Color",
  },

  {
    id: "Price",
    accessorKey: "carPrice",
    accessorFn: (row) => row.price,
    header: "Car Price",
  },

  {
    id: "Availability",
    accessorKey: "carAvailability",
    accessorFn: (row) => row.available,
    header: "Car Availability",
  },
  {
    id: "Owner",
    accessorKey: "carOwner",
    accessorFn: (row) => row.ownerId.fullName,
    header: "Car Owner",
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
