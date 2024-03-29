import { Button } from "@/components/ui/button";
import { DataTable } from "../data-table";
import { columns } from "../columns";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import useScreenSize from "@/utils/useScreenSize";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axios from "@/api/axios";

const BookingList = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [dataTable, setDataTable] = useState([]);
  const [filteredDataTable, setFilteredDataTable] = useState([]);

  const auth = useAuthHeader();
  const token = auth.split(" ")[1];

  const screenSize = useScreenSize();

  const handleFilter = (status) => {
    const filteredData = dataTable.filter((item) => item.status === status);
    setFilteredDataTable(filteredData);
  };
  const handleStatus = (status) => {
    setActiveTab(status);
    if (status === "all") {
      setFilteredDataTable(dataTable);
    } else {
      handleFilter(status);
    }
  };
  const getBooking = async () => {
    try {
      const response = await axios.get("/api/carts", {
        headers: {
          Authorization: token,
        },
      });
      setDataTable(response.data.carts);
      setFilteredDataTable(response.data.carts);
      console.log(response.data.carts);
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(dataTable);
  console.log(filteredDataTable);

  useEffect(() => {
    getBooking();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      {screenSize.width > 768 ? (
        <div className="p-4 flex gap-4 bg-white rounded-lg mb-6">
          <Button
            onClick={() => handleStatus("all")}
            variant={activeTab === "all" ? "secondary" : "outline"}
          >
            All Booking
          </Button>
          <Button
            onClick={() => handleStatus("Upcoming")}
            variant={activeTab === "Upcoming" ? "secondary" : "outline"}
          >
            Upcoming
          </Button>
          <Button
            onClick={() => handleStatus("Completed")}
            variant={activeTab === "Completed" ? "secondary" : "outline"}
          >
            Completed
          </Button>
          <Button
            variant={activeTab === "Pending" ? "secondary" : "outline"}
            onClick={() => handleStatus("Pending")}
          >
            Canceled
          </Button>
          <Button
            variant={activeTab === "In Progress" ? "secondary" : "outline"}
            onClick={() => handleStatus("In Progress")}
          >
            In Progress
          </Button>
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="mb-3">
            <Button variant="outline">{activeTab}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={activeTab}
              onValueChange={(value) => handleStatus(value)}
            >
              <DropdownMenuRadioItem value="all">
                All Booking
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Upcoming">
                Upcoming
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Completed">
                Completed
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Pending">
                Canceled
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="In Progress">
                In Progress
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {/* <div className="p-4 flex gap-4 bg-white rounded-lg mb-6">
        <Button
          onClick={() => handleStatus("all")}
          variant={activeTab === "all" ? "secondary" : "outline"}
        >
          All Booking
        </Button>
        <Button
          onClick={() => handleStatus("Upcoming")}
          variant={activeTab === "Upcoming" ? "secondary" : "outline"}
        >
          Upcoming
        </Button>
        <Button
          onClick={() => handleStatus("Completed")}
          variant={activeTab === "Completed" ? "secondary" : "outline"}
        >
          Completed
        </Button>
        <Button
          variant={activeTab === "Pending" ? "secondary" : "outline"}
          onClick={() => handleStatus("Pending")}
        >
          Canceled
        </Button>
        <Button
          variant={activeTab === "In Progress" ? "secondary" : "outline"}
          onClick={() => handleStatus("In Progress")}
        >
          In Progress
        </Button>
      </div> */}
      <div className="p-4 bg-white rounded-lg">
        <div className="px-4 flex justify-between">
          <h2 className="text-lg font-bold my-2">All Booking</h2>
        </div>
        <div className="p-4">
          <DataTable columns={columns} data={filteredDataTable} />
        </div>
      </div>
    </div>
  );
};

export default BookingList;
