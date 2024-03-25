import DashboardCard from "@/components/dashboard/DashboardCard";
import { CalendarRange, Car, ChevronsRight, ListChecks } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const cards = [
    {
      Icon: CalendarRange,
      title: "My Booking",
      score: "5",
      footer: "View all Booking",
      color: "bg-blue-900",
    },
    {
      Icon: ListChecks,
      title: "Total Transactions",
      score: "$53500",
      footer: "View all Transactions",
      color: "bg-emerald-900",
    },
    {
      Icon: Car,
      title: "Wishlist cars",
      score: "20",
      footer: "Go To Wishlist",
      color: "bg-red-800",
    },
  ];

  // const data = [
  //   {
  //     status: "Pending",
  //     email: "",
  //     amount: "",
  //   },
  //   {
  //     status: "Pending",
  //     email: "",
  //     amount: "",
  //   },
  //   {
  //     status: "Pending",
  //     email: "",
  //     amount: "",
  //   },
  //   {
  //     status: "Pending",
  //     email: "",
  //     amount: "",
  //   },
  // ];

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      <div className="flex md:flex-row flex-col gap-3">
        {cards.map((item) => (
          <DashboardCard
            key={item.title}
            Icon={item.Icon}
            title={item.title}
            score={item.score}
            footer={item.footer}
            color={item.color}
          />
        ))}
      </div>
      <div className="flex justify-between p-4 mt-4 rounded-lg bg-gray-50">
        <h2 className="text-lg font-bold">Current Bookings</h2>

        <Link to="">
          <p className="text-sm flex gap-1 items-center text-blue-700">
            View All Booking
            <ChevronsRight size={18} />
          </p>
        </Link>
        {/* <DataTable columns={columns} data={data} /> */}
      </div>
    </div>
  );
};

export default DashboardPage;
