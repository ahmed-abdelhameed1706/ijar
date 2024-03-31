import { useState, useEffect } from "react";
import axios from "../../../api/axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { AdminDataTable } from "../adminDataTable";
import { columns } from "./userColumns";
import Pagenation from "@/components/pagenation/Pagenation";
import { set } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AdminUsers = () => {
  // const [activeTab, setActiveTab] = useState("all");
  // const [data, setData] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const auth = useAuthHeader();
  const token = auth && auth.split(" ")[1];
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const getAllUsers = async () => {
    try {
      const response = await axios.get("/api/admin/users", {
        headers: {
          Authorization: token,
        },
        params: { page },
      });
      setDataTable(response.data.users);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    navigate("/admin/users");
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [dataTable, page]);

  // useEffect(() => {
  //   setDataTable(data); // Set dataTable after data has been updated
  // }, [data]);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>
      <div className="p-4 bg-white rounded-lg">
        <div className="px-4 flex justify-between">
          <h2 className="text-lg font-bold my-2">All Users</h2>
        </div>
        <div className="p-4">
          <AdminDataTable columns={columns} data={dataTable} />
        </div>
        <Pagenation page={page} setPage={setPage} number={totalPages} />
      </div>
    </div>
  );
};

export default AdminUsers;
