import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { MoreHorizontal, Plus, Search, Eye, Edit, Trash2, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

interface Partner {
  id: string;
  partnerName: string;
  partnerType: string;
  email: string;
  phone: string;
  city: string;
  commissionRate: string;
  status: "active" | "inactive";
  joinedDate: string;
}

// Sample data - replace with actual API data
const samplePartners: Partner[] = [
  {
    id: "1",
    partnerName: "John Education Services",
    partnerType: "organization",
    email: "john@edu.com",
    phone: "+91 9876543210",
    city: "Mumbai",
    commissionRate: "10",
    status: "active",
    joinedDate: "2024-01-15",
  },
  {
    id: "2",
    partnerName: "Sarah Learning Hub",
    partnerType: "individual",
    email: "sarah@learning.com",
    phone: "+91 9876543211",
    city: "Delhi",
    commissionRate: "8",
    status: "active",
    joinedDate: "2024-02-20",
  },
  {
    id: "3",
    partnerName: "Tech Institute",
    partnerType: "institution",
    email: "contact@techinstitute.com",
    phone: "+91 9876543212",
    city: "Bangalore",
    commissionRate: "12",
    status: "inactive",
    joinedDate: "2024-03-10",
  },
];

const AllPartners = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [partners] = useState<Partner[]>(samplePartners);

  const handleDelete = (id: string) => {
    toast({
      title: "Partner Deleted",
      description: "The partner has been removed successfully.",
    });
  };

  const columns = [
    {
      key: "partnerName" as keyof Partner,
      header: "Partner Name",
      cell: (item: Partner) => (
        <div className="font-medium">{item.partnerName}</div>
      ),
    },
    {
      key: "partnerType" as keyof Partner,
      header: "Type",
      cell: (item: Partner) => (
        <span className="capitalize">{item.partnerType}</span>
      ),
    },
    {
      key: "email" as keyof Partner,
      header: "Email",
    },
    {
      key: "phone" as keyof Partner,
      header: "Phone",
    },
    {
      key: "city" as keyof Partner,
      header: "City",
    },
    {
      key: "commissionRate" as keyof Partner,
      header: "Commission",
      cell: (item: Partner) => `${item.commissionRate}%`,
    },
    {
      key: "status" as keyof Partner,
      header: "Status",
      cell: (item: Partner) => (
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
      cell: (item: Partner) => (
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
              <Link to={`/partners/view/${item.id}`} className="flex items-center cursor-pointer">
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`/partners/edit/${item.id}`} className="flex items-center cursor-pointer">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`/partners/transactions/${item.id}`} className="flex items-center cursor-pointer">
                <DollarSign className="mr-2 h-4 w-4" />
                View Transactions
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

  const filteredPartners = partners.filter((partner) =>
    partner.partnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.phone.includes(searchTerm)
  );

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <PageHeader
          title="All Partners"
          description="Manage and view all registered partners"
          breadcrumbs={[
            { label: "Partners", href: "/partners/all" },
            { label: "All Partners" },
          ]}
          actions={
            <Button asChild>
              <Link to="/partners/add">
                <Plus className="mr-2 h-4 w-4" />
                Add New Partner
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
              placeholder="Search partners by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={filteredPartners}
          searchable={false}
        />
        </div>
        </div>
    </AppLayout>
  );
};

export default AllPartners;
