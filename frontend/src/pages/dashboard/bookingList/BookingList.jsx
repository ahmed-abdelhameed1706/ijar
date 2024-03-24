import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Search } from "lucide-react";
import { DataTable } from "../data-table";
import { columns } from "../columns";

const data = [
  {
    status: "Pending",
    email: "",
    amount: "",
  },
  {
    status: "Pending",
    email: "",
    amount: "",
  },
  {
    status: "Pending",
    email: "",
    amount: "",
  },
  {
    status: "Pending",
    email: "",
    amount: "",
  },
];

const BookingList = () => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      <div className="p-4 flex gap-4 bg-white rounded-lg mb-6">
        <Button variant="secondary">All Booking</Button>
        <Button variant="outline">Upcoming</Button>
        <Button variant="outline">Completed</Button>
        <Button variant="outline">Canceled</Button>
        <Button variant="outline">In Progress</Button>
      </div>
      <div className="p-4 bg-white rounded-lg">
        <div className="flex justify-between">
          <h2 className="text-lg font-bold mb-8 mt-2">All Booking</h2>
          <Label className="flex justify-center  items-center border border-gray-400 rounded-lg w-[300px] h-11">
            <Input
              className="border-none rounded-lg w-full outline-none ring-0 p-2 placeholder:text-base"
              type="search"
              placeholder="Search"
            />
            <div className="p-2">
              <Search strokeWidth={2.25} />
            </div>
          </Label>
        </div>
        <div className="p-4">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
};

export default BookingList;
