/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const DateDialog = ({ setPickUp, setDropOff }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // console.log(new Date().toISOString().slice(0, 10));

  const handleChangePickUp = (event) => {
    setStartDate(event.target.value);
    const selectedDate = new Date(event.target.value);
    setPickUp(selectedDate);
  };

  const handleChangeDropOff = (event) => {
    setEndDate(event.target.value);
    const selectedDate = new Date(event.target.value);
    setDropOff(selectedDate);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Modify Rental Dates</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select Your Rental Dates</DialogTitle>
          <DialogDescription>
            Enter the date and exact time you&apos;d like to pick up your rental
            car.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Pick-up Date:
            </Label>
            <Input
              type="date"
              value={startDate}
              min={new Date().toISOString().slice(0, 10)}
              onChange={handleChangePickUp}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Drop-off Date:
            </Label>
            <Input
              type="date"
              value={endDate}
              min={
                startDate ? startDate : new Date().toISOString().slice(0, 10)
              }
              onChange={handleChangeDropOff}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" disabled={!startDate || !endDate}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DateDialog;
