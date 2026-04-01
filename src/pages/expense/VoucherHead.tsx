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
import { PlusCircle } from "lucide-react";

const VoucherHead = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    headName: "",
    headCode: "",
    headType: "",
    description: "",
    openingBalance: "",
    balanceType: "debit",
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
    if (!formData.headName || !formData.headCode || !formData.headType) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Voucher head created successfully!",
    });

    // Reset form
    setFormData({
      headName: "",
      headCode: "",
      headType: "",
      description: "",
      openingBalance: "",
      balanceType: "debit",
    });
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <PageHeader
          title="Create Voucher Head"
          description="Create a new voucher head for expense tracking"
          breadcrumbs={[
            { label: "Expense", href: "/expense/voucher-head" },
            { label: "Voucher Head" },
          ]}
        />

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Voucher Head Information</CardTitle>
            <CardDescription>
              Fill in the details below to create a new voucher head
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="headName">Head Name *</Label>
                  <Input
                    id="headName"
                    name="headName"
                    placeholder="Enter head name"
                    value={formData.headName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="headCode">Head Code *</Label>
                  <Input
                    id="headCode"
                    name="headCode"
                    placeholder="Enter head code (e.g., VH-001)"
                    value={formData.headCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="headType">Head Type *</Label>
                  <Select
                    value={formData.headType}
                    onValueChange={(value) => handleSelectChange("headType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select head type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                      <SelectItem value="asset">Asset</SelectItem>
                      <SelectItem value="liability">Liability</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="openingBalance">Opening Balance</Label>
                  <Input
                    id="openingBalance"
                    name="openingBalance"
                    type="number"
                    placeholder="Enter opening balance"
                    value={formData.openingBalance}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="balanceType">Balance Type</Label>
                  <Select
                    value={formData.balanceType}
                    onValueChange={(value) => handleSelectChange("balanceType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select balance type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="debit">Debit</SelectItem>
                      <SelectItem value="credit">Credit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter description for this voucher head"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <Button type="submit" className="w-full md:w-auto">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Voucher Head
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default VoucherHead;
