import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import axios from "../../../api/axios";
import PropTypes from "prop-types";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";

import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useNavigate } from "react-router-dom";

const MenuButton = ({ user }) => {
  const authHeader = useAuthHeader();
  const token = authHeader && authHeader.split(" ")[1];
  const navigate = useNavigate();

  const onDelete = async (user) => {
    await axios.delete(`/api/admin/users/${user._id}`, {
      headers: {
        Authorization: token,
      },
    });

    console.log("Deleting user:", user._id);
    // After deleting, navigate to the next page
    navigate("/admin/users");
  };

  const changeActivity = async (user) => {
    await axios.put(
      `/api/admin/users/${user._id}`,
      { active: !user.active },
      {
        headers: {
          Authorization: token,
        },
      }
    );
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
        <DropdownMenuItem onClick={() => onDelete(user)}>
          Delete User
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeActivity(user)}>
          {user.active ? "Deactivate User" : "Activate User"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
MenuButton.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

const columns = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <Avatar className=" justify-center">
          <AvatarImage src={user.imageUrl} />
          <AvatarFallback>{user.fullName}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    id: "fullName",
    accessorKey: "fullName",
    accessorFn: (row) => row.fullName,
    header: "User Full Name",
  },
  {
    id: "email",
    accessorKey: "email",
    accessorFn: (row) => row.email,
    header: "User Email",
  },
  {
    id: "phoneNumber",
    accessorKey: "phoneNumber",
    accessorFn: (row) => row.phoneNumber,
    header: "User Phone",
  },
  {
    id: "role",
    accessorKey: "role",
    accessorFn: (row) => row.role,
    header: "User Role",
  },
  {
    id: "dob",
    accessorKey: "dob",
    accessorFn: (row) => row.brithDate,
    header: "User DOB",
  },

  {
    id: "Account Active",
    accessorKey: "active",
    accessorFn: (row) => (row.active ? "Active" : "Inactive"),
    header: "Account Active",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
      return <MenuButton user={user} />;
    },
  },
];

export { columns, MenuButton };
