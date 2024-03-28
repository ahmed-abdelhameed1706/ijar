import { useState, useEffect } from "react";
import axios from "../../../api/axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { AdminDataTable } from "../adminDataTable";
import { columns } from "../userColumns";

const AdminUsers = () => {
  // const [activeTab, setActiveTab] = useState("all");
  // const [data, setData] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const auth = useAuthHeader();
  const token = auth && auth.split(" ")[1];

  // const handleFilter = (status) => {
  //   const filteredData = data.filter((item) => item.status === status);
  //   setDataTable(filteredData);
  // };

  // const handleStatus = (status) => {
  //   setActiveTab(status);
  //   if (status === "all") {
  //     setDataTable(data);
  //   } else {
  //     handleFilter(status);
  //   }
  // };

  const getAllUsers = async () => {
    try {
      const response = await axios.get("/api/admin/users", {
        headers: {
          Authorization: token,
        },
      });
      setDataTable(response.data.users);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [dataTable]);

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
      </div>
    </div>
  );
};

export default AdminUsers;
