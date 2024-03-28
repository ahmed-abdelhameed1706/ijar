import { Button } from "@/components/ui/button";
import { AdminDataTable } from "../adminDataTable";
import { AdminColumns } from "../admincolumns";
import { useState } from "react";

const data = [
  {
    status: "In Progress",
    carName: "BMW",
    carModel: "X5",
    deliverylocation: "Lagos",
    pickupLocation: "Abuja",
    BookingDate: "12/12/2021",
    total: "$200",
  },
  {
    status: "Canceled",
    carName: "Toyota",
    carModel: "Camry",
    deliverylocation: "Lagos",
    pickupLocation: "Abuja",
    BookingDate: "12/12/2021",
    total: "$500",
  },
  {
    status: "Completed",
    carName: "Mercedes",
    carModel: "Benz",
    deliverylocation: "Lagos",
    pickupLocation: "Abuja",
    BookingDate: "12/12/2021",
    total: "$200",
  },
  {
    status: "In Progress",
    carName: "Toyota",
    carModel: "Camry",
    deliverylocation: "Lagos",
    pickupLocation: "Abuja",
    BookingDate: "12/12/2021",
    total: "$300",
  },
];

const AdminCars = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [dataTable, setDataTable] = useState(data);

  const handleFilter = (status) => {
    const filteredData = data.filter((item) => item.status === status);
    setDataTable(filteredData);
  };
  const handleStatus = (status) => {
    setActiveTab(status);
    if (status === "all") {
      setDataTable(data);
    } else {
      handleFilter(status);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
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
      <div className="p-4 bg-white rounded-lg">
        <div className="px-4 flex justify-between">
          <h2 className="text-lg font-bold my-2">All Booking</h2>
        </div>
        <div className="p-4">
          <AdminDataTable columns={AdminColumns} data={dataTable} />
        </div>
      </div>
    </div>
  );
};

export default AdminCars;
