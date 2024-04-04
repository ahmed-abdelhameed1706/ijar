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

const MenuButton = ({ cart }) => {
  const authHeader = useAuthHeader();
  const token = authHeader && authHeader.split(" ")[1];
  const navigate = useNavigate();

  const onDelete = async (cart) => {
    try {
      await axios.delete(`/api/admin/carts/${cart._id}`, {
        headers: {
          Authorization: token,
        },
      });

      // After deleting, navigate to the next page
      navigate("/admin/carts");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting cart:", error);
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
        <DropdownMenuItem onClick={() => onDelete(cart)}>
          Delete cart
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

MenuButton.propTypes = {
  cart: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

const CartColumns = [
  {
    id: "ID",
    accessorKey: "cartId",
    accessorFn: (row) => row._id,
    header: "cart ID",
  },
  {
    id: "Car BrandName",
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
    id: "Status",
    accessorKey: "status",
    accessorFn: (row) => row.status,
    header: "Status",
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const cart = row.original;
      return <MenuButton cart={cart} />;
    },
  },
];

export { CartColumns, MenuButton };
