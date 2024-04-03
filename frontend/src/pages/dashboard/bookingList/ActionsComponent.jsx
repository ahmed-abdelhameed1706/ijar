/* eslint-disable react/prop-types */
import {
  DropdownMenu,
  //   DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import axios from "@/api/axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
const ActionsComponent = ({ booking }) => {
  console.log(booking);
  const auth = useAuthHeader();
  const token = auth.split(" ")[1];
  const handleCancelBooking = async () => {
    try {
      const response = await axios.put(`/api/cart`, {
        headers: {
          Authorization: token,
        },
        params: {
          id: booking._id,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error.message);
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
        {/* <DropdownMenuItem>View booking details</DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button variant="destructive" onClick={() => handleCancelBooking()}>
            {" "}
            Cancel Booking
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsComponent;
