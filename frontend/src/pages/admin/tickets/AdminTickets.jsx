import { AdminDataTable } from "../adminDataTable";
import { useState } from "react";
import axios from "../../../api/axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useEffect } from "react";
import { TicketColumns } from "./ticketsColumns";

const AdminTickets = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [dataTable, setDataTable] = useState([]);
  const auth = useAuthHeader();
  const token = auth && auth.split(" ")[1];

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
  const getAllTickets = async () => {
    try {
      const response = await axios.get("/api/admin/tickets", {
        headers: {
          Authorization: token,
        },
      });
      setDataTable(response.data.tickets);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getAllTickets();
  }, [dataTable]);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>

      <div className="p-4 bg-white rounded-lg">
        <div className="px-4 flex justify-between">
          <h2 className="text-lg font-bold my-2">All Tickets</h2>
        </div>
        <div className="p-4">
          <AdminDataTable columns={TicketColumns} data={dataTable} />
        </div>
      </div>
    </div>
  );
};

export default AdminTickets;
