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

const MenuButton = ({ ticket }) => {
  const authHeader = useAuthHeader();
  const token = authHeader && authHeader.split(" ")[1];
  const navigate = useNavigate();

  const onDelete = async (ticket) => {
    try {
      await axios.delete(`/api/admin/tickets/${ticket._id}`, {
        headers: {
          Authorization: token,
        },
      });

      // After deleting, navigate to the next page
      navigate("/admin/tickets");
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  const onProgress = async (ticket) => {
    try {
      await axios.put(
        `/api/admin/tickets/${ticket._id}`,
        { status: "in-progress" },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // After deleting, navigate to the next page
      navigate("/admin/tickets");
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };
  const onDone = async (ticket) => {
    try {
      await axios.put(
        `/api/admin/tickets/${ticket._id}`,
        { status: "closed" },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // After deleting, navigate to the next page
      navigate("/admin/tickets");
    } catch (error) {
      console.error("Error updating ticket:", error);
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
        <DropdownMenuItem onClick={() => onDelete(ticket)}>
          Delete Ticket
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onProgress(ticket)}>
          Work on Ticket
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDone(ticket)}>
          Close Ticket
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

MenuButton.propTypes = {
  ticket: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

const TicketColumns = [
  {
    id: "ID",
    accessorKey: "ticketId",
    accessorFn: (row) => row._id,
    header: "ticket ID",
  },

  {
    id: "user",
    accessorKey: "user",
    accessorFn: (row) => (row.createdBy ? row.createdBy.email : "N/A"),
    header: "User",
  },

  {
    id: "subject",
    accessorKey: "subject",
    accessorFn: (row) => row.title,
    header: "Subject",
  },

  {
    id: "description",
    accessorKey: "description",
    accessorFn: (row) => row.description,
    header: "Description",
  },

  {
    id: "priority",
    accessorKey: "priority",
    accessorFn: (row) => row.priority,
    header: "Priority",
  },

  {
    id: "status",
    accessorKey: "status",
    accessorFn: (row) => row.status,
    header: "Status",
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    accessorFn: (row) => row.createdAt,
    header: "Created At",
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const ticket = row.original;
      return <MenuButton ticket={ticket} />;
    },
  },
];

export { TicketColumns, MenuButton };
