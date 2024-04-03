import { AdminDataTable } from "../adminDataTable";
import { useState } from "react";
import axios from "../../../api/axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useEffect } from "react";
import { TicketColumns } from "./ticketsColumns";
import Pagenation from "@/components/pagenation/Pagenation";

const AdminTickets = () => {
  const [dataTable, setDataTable] = useState([]);
  const auth = useAuthHeader();
  const token = auth && auth.split(" ")[1];
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const getAllTickets = async () => {
    try {
      const response = await axios.get("/api/admin/tickets", {
        headers: {
          Authorization: token,
        },
      });
      setDataTable(response.data.tickets);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getAllTickets();
  }, [page]);

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
        <Pagenation page={page} setPage={setPage} number={totalPages} />
      </div>
    </div>
  );
};

export default AdminTickets;
