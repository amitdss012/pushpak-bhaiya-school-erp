import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, Eye, Edit, Trash2, Calendar, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

interface SessionYear {
  id: string;
  sessionName: string;
  startYear: string;
  endYear: string;
  startDate: string;
  endDate: string;
  status: "active" | "inactive" | "upcoming" | "closed";
  description: string;
  createdDate: string;
}

// Sample data - replace with actual API data
const sampleSessionYears: SessionYear[] = [
  {
    id: "1",
    sessionName: "Session 2024-2025",
    startYear: "2024",
    endYear: "2025",
    startDate: "2024-04-01",
    endDate: "2025-03-31",
    status: "active",
    description: "Current academic session",
    createdDate: "2024-01-15",
  },
  {
    id: "2",
    sessionName: "Session 2023-2024",
    startYear: "2023",
    endYear: "2024",
    startDate: "2023-04-01",
    endDate: "2024-03-31",
    status: "closed",
    description: "Previous academic session",
    createdDate: "2023-01-10",
  },
  {
    id: "3",
    sessionName: "Session 2025-2026",
    startYear: "2025",
    endYear: "2026",
    startDate: "2025-04-01",
    endDate: "2026-03-31",
    status: "upcoming",
    description: "Next academic session",
    createdDate: "2024-02-20",
  },
];

const AllSessionYears = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [sessionYears] = useState<SessionYear[]>(sampleSessionYears);

  const handleDelete = (id: string) => {
    toast({
      title: "Session Deleted",
      description: "The session year has been removed successfully.",
      variant: "destructive",
    });
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "closed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const columns = [
    {
      key: "sessionName" as keyof SessionYear,
      header: "Session Name",
      cell: (item: SessionYear) => (
        <div className="font-medium">{item.sessionName}</div>
      ),
    },
    {
      key: "startYear" as keyof SessionYear,
      header: "Year Range",
      cell: (item: SessionYear) => (
        <span className="font-semibold">{item.startYear} - {item.endYear}</span>
      ),
    },
    {
      key: "startDate" as keyof SessionYear,
      header: "Start Date",
      cell: (item: SessionYear) => format(new Date(item.startDate), "dd MMM yyyy"),
    },
    {
      key: "endDate" as keyof SessionYear,
      header: "End Date",
      cell: (item: SessionYear) => format(new Date(item.endDate), "dd MMM yyyy"),
    },
    {
      key: "status" as keyof SessionYear,
      header: "Status",
      cell: (item: SessionYear) => (
        <Badge className={getStatusBadgeClass(item.status)}>
          {item.status === "active" && <CheckCircle className="mr-1 h-3 w-3" />}
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Badge>
      ),
    },
    {
      key: "description" as keyof SessionYear,
      header: "Description",
      cell: (item: SessionYear) => (
        <span className="text-sm text-muted-foreground max-w-[200px] truncate">
          {item.description || "-"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      cell: (item: SessionYear) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <Eye className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={`/session/view/${item.id}`} className="flex items-center cursor-pointer">
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`/session/edit/${item.id}`} className="flex items-center cursor-pointer">
                <Edit className="mr-2 h-4 w-4" />
                Edit Session
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`/session/make-current/${item.id}`} className="flex items-center cursor-pointer">
                <CheckCircle className="mr-2 h-4 w-4" />
                Make Current
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleDelete(item.id)}
              className="text-red-600 cursor-pointer"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Session
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const filteredSessions = sessionYears.filter((session) =>
    session.sessionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.startYear.includes(searchTerm) ||
    session.endYear.includes(searchTerm)
  );

  // Calculate statistics
  const totalSessions = sessionYears.length;
  const activeSessions = sessionYears.filter(s => s.status === "active").length;
  const upcomingSessions = sessionYears.filter(s => s.status === "upcoming").length;
  const closedSessions = sessionYears.filter(s => s.status === "closed").length;

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <PageHeader
          title="All Session Years"
          description="Manage and view all academic session years"
          breadcrumbs={[
            { label: "Session Year", href: "/session/all" },
            { label: "All Session Years" },
          ]}
          actions={
            <Button asChild>
              <Link to="/session/add">
                <Plus className="mr-2 h-4 w-4" />
                Add New Session
              </Link>
            </Button>
          }
        />

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSessions}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Total session years
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Session</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{activeSessions}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Currently running
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{upcomingSessions}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Future sessions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Closed</CardTitle>
              <Calendar className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{closedSessions}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Completed sessions
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Table */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Filter Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by session name, year, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Showing {filteredSessions.length} of {totalSessions} sessions
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Data Table */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Session Years List</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={filteredSessions}
              searchable={false}
              emptyMessage="No session years found"
            />
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>About Session Years</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Session years define the academic period for all activities</p>
            <p>• Student admissions are linked to specific session years</p>
            <p>• Exams, fees, and attendance are tracked per session</p>
            <p>• Only one session can be active at any given time</p>
            <p>• Closed sessions are archived but remain accessible for reports</p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default AllSessionYears;
