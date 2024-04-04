import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import ActionsComponent from "./bookingList/ActionsComponent";

export const columns = [
  {
    id: "image",
    accessorKey: "image",
    // accessorFn: (row) => row._id,
    header: "Image",
    cell: ({ row }) => {
      const booking = row.original;
      console.log(booking);
      return (
        <Avatar size="md">
          <AvatarImage
            src={booking.carId ? booking.carId : ""}
            fallback={
              <AvatarFallback>
                {booking.carId ? booking.carId.brandName : ""}
              </AvatarFallback>
            }
          />
        </Avatar>
      );
    },
  },
  {
    id: "carName",
    accessorKey: "carName",
    accessorFn: (row) => (row.carId ? row.carId.brandName : "--"),
    header: "Car BrandName",
  },
  {
    id: "Model",
    accessorKey: "carModel",
    accessorFn: (row) => (row.carId ? row.carId.model : "--"),
    header: "Car Model",
  },

  {
    id: "Price",
    accessorKey: "carPrice",
    accessorFn: (row) => `$${row.totalCost}`,
    header: "Total Cost",
  },

  {
    id: "Start Date",
    accessorKey: "startDate",
    accessorFn: (row) => {
      const date = new Date(row.startDate);
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
        .getHours()
        .toString()
        .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
      console.log(formattedDate);
      return formattedDate;
    },
    header: "Start Date",
  },

  {
    id: "End Date",
    accessorKey: "endDate",
    accessorFn: (row) => {
      const date = new Date(row.endDate);
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
        .getHours()
        .toString()
        .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
      console.log(formattedDate);
      return formattedDate;
    },
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
              : booking.status === "Cancelled"
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

      return <ActionsComponent booking={booking} />;
    },
  },
];
