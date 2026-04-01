import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { UserPlus } from "lucide-react";

const AddPartner = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    partnerName: "",
    partnerType: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    commissionRate: "",
    gstNumber: "",
    panNumber: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    branchName: "",
    contactPerson: "",
    designation: "",
    notes: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.partnerName || !formData.email || !formData.phone) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Partner added successfully!",
    });

    // Reset form
    setFormData({
      partnerName: "",
      partnerType: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      commissionRate: "",
      gstNumber: "",
      panNumber: "",
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      branchName: "",
      contactPerson: "",
      designation: "",
      notes: "",
    });
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <PageHeader
          title="Add New Partner"
          description="Register a new partner in the system"
          breadcrumbs={[
            { label: "Partners", href: "/partners/all" },
            { label: "Add Partner" },
          ]}
        />

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Partner Information</CardTitle>
          <CardDescription>
            Fill in the details below to add a new partner
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="partnerName">Partner Name *</Label>
                <Input
                  id="partnerName"
                  name="partnerName"
                  placeholder="Enter partner name"
                  value={formData.partnerName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="partnerType">Partner Type</Label>
                <Select
                  value={formData.partnerType}
                  onValueChange={(value) => handleSelectChange("partnerType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select partner type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="organization">Organization</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                    <SelectItem value="institution">Institution</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person</Label>
                <Input
                  id="contactPerson"
                  name="contactPerson"
                  placeholder="Enter contact person name"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  name="designation"
                  placeholder="Enter designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Address Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Enter address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    placeholder="Enter state"
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    name="pincode"
                    placeholder="Enter pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Commission & Tax Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Commission & Tax Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="commissionRate">Commission Rate (%)</Label>
                  <Input
                    id="commissionRate"
                    name="commissionRate"
                    type="number"
                    placeholder="Enter commission rate"
                    value={formData.commissionRate}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gstNumber">GST Number</Label>
                  <Input
                    id="gstNumber"
                    name="gstNumber"
                    placeholder="Enter GST number"
                    value={formData.gstNumber}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="panNumber">PAN Number</Label>
                  <Input
                    id="panNumber"
                    name="panNumber"
                    placeholder="Enter PAN number"
                    value={formData.panNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Bank Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Bank Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input
                    id="bankName"
                    name="bankName"
                    placeholder="Enter bank name"
                    value={formData.bankName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    name="accountNumber"
                    placeholder="Enter account number"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ifscCode">IFSC Code</Label>
                  <Input
                    id="ifscCode"
                    name="ifscCode"
                    placeholder="Enter IFSC code"
                    value={formData.ifscCode}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="branchName">Branch Name</Label>
                  <Input
                    id="branchName"
                    name="branchName"
                    placeholder="Enter branch name"
                    value={formData.branchName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter any additional notes"
                value={formData.notes}
                onChange={handleInputChange}
              />
            </div>

            <Button type="submit" className="w-full md:w-auto">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Partner
            </Button>
          </form>
        </CardContent>
      </Card>
      </div>
    </AppLayout>
  );
};

export default AddPartner;
