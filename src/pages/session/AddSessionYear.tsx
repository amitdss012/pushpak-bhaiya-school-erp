import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Save } from "lucide-react";

const AddSessionYear = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    sessionName: "",
    startYear: "",
    endYear: "",
    startDate: "",
    endDate: "",
    status: "active",
    description: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Auto-generate session name based on years
  const handleYearChange = (field: string, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      
      // Auto-generate session name if both years are filled
      if (updated.startYear && updated.endYear) {
        updated.sessionName = `Session ${updated.startYear}-${updated.endYear}`;
      }
      
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.sessionName || !formData.startYear || !formData.endYear || 
        !formData.startDate || !formData.endDate) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    // Validate that end year is greater than start year
    if (parseInt(formData.endYear) <= parseInt(formData.startYear)) {
      toast({
        title: "Validation Error",
        description: "End year must be greater than start year",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Session year created successfully!",
    });

    // Reset form
    setFormData({
      sessionName: "",
      startYear: "",
      endYear: "",
      startDate: "",
      endDate: "",
      status: "active",
      description: "",
    });
  };

  // Generate year options
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <PageHeader
          title="Add Session Year"
          description="Create a new academic/session year"
          breadcrumbs={[
            { label: "Session Year", href: "/session/add" },
            { label: "Add Session Year" },
          ]}
        />

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Session Year Information
            </CardTitle>
            <CardDescription>
              Fill in the details below to create a new session year
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Session Name */}
              <div className="space-y-2">
                <Label htmlFor="sessionName">Session Name *</Label>
                <Input
                  id="sessionName"
                  name="sessionName"
                  placeholder="e.g., Session 2024-2025"
                  value={formData.sessionName}
                  onChange={handleInputChange}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  This will be displayed throughout the system
                </p>
              </div>

              {/* Year Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startYear">Start Year *</Label>
                  <Select
                    value={formData.startYear}
                    onValueChange={(value) => handleYearChange("startYear", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select start year" />
                    </SelectTrigger>
                    <SelectContent>
                      {yearOptions.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endYear">End Year *</Label>
                  <Select
                    value={formData.endYear}
                    onValueChange={(value) => handleYearChange("endYear", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select end year" />
                    </SelectTrigger>
                    <SelectContent>
                      {yearOptions.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date *</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Only one session can be active at a time
                </p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter any additional notes about this session year"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full md:w-auto">
                <Save className="mr-2 h-4 w-4" />
                Create Session Year
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Important Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• The session year typically spans across two calendar years (e.g., 2024-2025)</p>
            <p>• Start date is usually when the academic year begins</p>
            <p>• End date marks the completion of the academic year</p>
            <p>• Only one session can be marked as "Active" at any time</p>
            <p>• All student admissions, exams, and fees will be linked to this session</p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default AddSessionYear;
