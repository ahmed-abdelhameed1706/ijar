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
import Pagenation from "@/components/pagenation/Pagenation";

const BookingList = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [dataTable, setDataTable] = useState([]);
  const [filteredDataTable, setFilteredDataTable] = useState([]);
  const [page, setPage] = useState(1);
  const [numberPages, setNumberPages] = useState(0);

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
        params: {
          page,
        },
      });
      setDataTable(response.data.carts);
      setFilteredDataTable(response.data.carts);
      setNumberPages(response.data.totalPages);
    } catch (error) {
      console.log(error.message);
    }
  };

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
            onClick={() => handleStatus("Canceled")}
            variant={activeTab === "Canceled" ? "secondary" : "outline"}
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
            Pending
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
              <DropdownMenuRadioItem value="Pending">
                Pending
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
          <Pagenation setPage={setPage} page={page} number={numberPages} />

          {/* <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
            >
              Next
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BookingList;
