import { Button } from "@/components/ui/button";
import { AdminDataTable } from "../adminDataTable";
import { useState } from "react";
import axios from "../../../api/axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useEffect } from "react";
import { CartColumns } from "./cartsColumns";

const AdminCarts = () => {
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
  const getAllCarts = async () => {
    try {
      const response = await axios.get("/api/admin/carts", {
        headers: {
          Authorization: token,
        },
      });
      setDataTable(response.data.carts);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getAllCarts();
  }, [dataTable]);

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
      </div>
    </div>
  );
};

export default AdminCarts;
