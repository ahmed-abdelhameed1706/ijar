import { Button } from "@/components/ui/button";

export const columns = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: (data) => (
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          View
        </Button>
        <Button variant="outline" size="sm">
          Cancel
        </Button>
      </div>
    ),
  },
];
