/* eslint-disable react/prop-types */
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { ChevronsRight } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardCard = ({ Icon, title, score, footer, color }) => {
  return (
    <Card className="w-full">
      <CardContent className="flex justify-between p-4">
        <div>
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <div className="text-2xl font-bold">{score}</div>
        </div>
        <div
          className={`p-2 w-14 h-14 flex justify-center items-center rounded-s-3xl rounded-ee-3xl ${color}`}
        >
          <Icon size={32} color="white" />
        </div>
      </CardContent>
      <hr className="mx-4" />
      <CardFooter className="flex justify-center p-4 ">
        <Link to="">
          <p className="text-sm flex items-center gap-1 text-blue-700">
            {footer}
            <ChevronsRight size={18} />
          </p>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default DashboardCard;
