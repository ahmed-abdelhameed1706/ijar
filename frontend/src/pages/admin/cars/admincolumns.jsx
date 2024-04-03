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
import PropTypes from "prop-types";
import axios from "../../../api/axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useNavigate } from "react-router-dom";

const MenuButton = ({ car }) => {
  const authHeader = useAuthHeader();
  const token = authHeader && authHeader.split(" ")[1];
  const navigate = useNavigate();

  const onDelete = async (car) => {
    try {
      await axios.delete(`/api/admin/cars/${car._id}`, {
        headers: {
          Authorization: token,
        },
      });

      // After deleting, navigate to the next page
      navigate("/admin/cars");
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

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
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onDelete(car)}>
          Delete Car
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

MenuButton.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

const AdminColumns = [
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
    accessorFn: (row) => row.owner.fullName,
    header: "Car Owner",
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const car = row.original;
      return <MenuButton car={car} />;
    },
  },
];

export { AdminColumns, MenuButton };
