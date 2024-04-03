import { AdminDataTable } from "../adminDataTable";
import { useState } from "react";
import axios from "../../../api/axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useEffect } from "react";
import { CartColumns } from "./cartsColumns";
import Pagenation from "@/components/pagenation/Pagenation";

const AdminCarts = () => {
  const [dataTable, setDataTable] = useState([]);
  const auth = useAuthHeader();
  const token = auth && auth.split(" ")[1];
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const getAllCarts = async () => {
    try {
      const response = await axios.get("/api/admin/carts", {
        headers: {
          Authorization: token,
        },
        params: { page },
      });
      setDataTable(response.data.carts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCarts();
  }, [page]);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>

      <div className="p-4 bg-white rounded-lg">
        <div className="px-4 flex justify-between">
          <h2 className="text-lg font-bold my-2">All Carts</h2>
        </div>
        <div className="p-4">
          <AdminDataTable columns={CartColumns} data={dataTable} />
        </div>
        <Pagenation page={page} setPage={setPage} number={totalPages} />
      </div>
    </div>
  );
};

export default AdminCarts;
