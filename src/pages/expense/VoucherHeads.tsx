import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { MoreHorizontal, Plus, Search, Eye, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface VoucherHead {
  id: string;
  headName: string;
  headCode: string;
  headType: "income" | "expense" | "asset" | "liability";
  description: string;
  openingBalance: number;
  balanceType: "debit" | "credit";
  status: "active" | "inactive";
  createdDate: string;
}

// Sample data - replace with actual API data
const sampleVoucherHeads: VoucherHead[] = [
  {
    id: "1",
    headName: "Salary Expense",
    headCode: "VH-001",
    headType: "expense",
    description: "Monthly salary payments to staff",
    openingBalance: 0,
    balanceType: "debit",
    status: "active",
    createdDate: "2024-01-15",
  },
  {
    id: "2",
    headName: "Office Rent",
    headCode: "VH-002",
    headType: "expense",
    description: "Monthly office rent payment",
    openingBalance: 50000,
    balanceType: "debit",
    status: "active",
    createdDate: "2024-01-20",
  },
  {
    id: "3",
    headName: "Student Fee Income",
    headCode: "VH-003",
    headType: "income",
    description: "Fee collected from students",
    openingBalance: 100000,
    balanceType: "credit",
    status: "active",
    createdDate: "2024-02-01",
  },
  {
    id: "4",
    headName: "Computer Equipment",
    headCode: "VH-004",
    headType: "asset",
    description: "Computer and IT equipment purchases",
    openingBalance: 250000,
    balanceType: "debit",
    status: "active",
    createdDate: "2024-02-10",
  },
];

const VoucherHeads = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [voucherHeads] = useState<VoucherHead[]>(sampleVoucherHeads);

  const handleDelete = (id: string) => {
    toast({
      title: "Voucher Head Deleted",
      description: "The voucher head has been removed successfully.",
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "income":
        return "bg-green-100 text-green-800";
      case "expense":
        return "bg-red-100 text-red-800";
      case "asset":
        return "bg-blue-100 text-blue-800";
      case "liability":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const columns = [
    {
      key: "headCode" as keyof VoucherHead,
      header: "Code",
    },
    {
      key: "headName" as keyof VoucherHead,
      header: "Head Name",
      cell: (item: VoucherHead) => (
        <div className="font-medium">{item.headName}</div>
      ),
    },
    {
      key: "headType" as keyof VoucherHead,
      header: "Type",
      cell: (item: VoucherHead) => (
        <Badge className={getTypeColor(item.headType)}>
          {item.headType.charAt(0).toUpperCase() + item.headType.slice(1)}
        </Badge>
      ),
    },
    {
      key: "openingBalance" as keyof VoucherHead,
      header: "Opening Balance",
      cell: (item: VoucherHead) => (
        <span className="font-semibold">₹{item.openingBalance.toLocaleString()}</span>
      ),
    },
    {
      key: "balanceType" as keyof VoucherHead,
      header: "Balance Type",
      cell: (item: VoucherHead) => (
        <span className="capitalize">{item.balanceType}</span>
      ),
    },
    {
      key: "status" as keyof VoucherHead,
      header: "Status",
      cell: (item: VoucherHead) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            item.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      cell: (item: VoucherHead) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={`/expense/voucher-head/view/${item.id}`} className="flex items-center cursor-pointer">
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`/expense/voucher-head/edit/${item.id}`} className="flex items-center cursor-pointer">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleDelete(item.id)}
              className="text-red-600 cursor-pointer"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const filteredVoucherHeads = voucherHeads.filter((head) =>
    head.headName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    head.headCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    head.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <PageHeader
          title="All Voucher Heads"
          description="Manage and view all voucher heads"
          breadcrumbs={[
            { label: "Expense", href: "/expense/voucher-heads" },
            { label: "All Voucher Heads" },
          ]}
          actions={
            <Button asChild>
              <Link to="/expense/voucher-head">
                <Plus className="mr-2 h-4 w-4" />
                Create New Voucher Head
              </Link>
            </Button>
          }
        />

        <div className="mt-6 space-y-4">
          {/* Search Bar */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search voucher heads by name, code, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Data Table */}
          <DataTable
            columns={columns}
            data={filteredVoucherHeads}
            searchable={false}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default VoucherHeads;
