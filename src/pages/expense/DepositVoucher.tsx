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
import { DollarSign } from "lucide-react";

const DepositVoucher = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    voucherNumber: "",
    date: new Date().toISOString().split("T")[0],
    headId: "",
    amount: "",
    paymentMethod: "",
    referenceNumber: "",
    bankName: "",
    branchName: "",
    chequeNumber: "",
    depositedBy: "",
    description: "",
    remarks: "",
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
    if (!formData.voucherNumber || !formData.headId || !formData.amount || !formData.paymentMethod) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Deposit voucher created successfully!",
    });

    // Reset form
    setFormData({
      voucherNumber: "",
      date: new Date().toISOString().split("T")[0],
      headId: "",
      amount: "",
      paymentMethod: "",
      referenceNumber: "",
      bankName: "",
      branchName: "",
      chequeNumber: "",
      depositedBy: "",
      description: "",
      remarks: "",
    });
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <PageHeader
          title="Create Deposit Voucher"
          description="Record a deposit transaction"
          breadcrumbs={[
            { label: "Expense", href: "/expense/deposit-voucher" },
            { label: "Deposit Voucher" },
          ]}
        />

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Deposit Voucher Information</CardTitle>
            <CardDescription>
              Fill in the details below to create a deposit voucher
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="voucherNumber">Voucher Number *</Label>
                  <Input
                    id="voucherNumber"
                    name="voucherNumber"
                    placeholder="Enter voucher number (e.g., DV-2024-001)"
                    value={formData.voucherNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="headId">Voucher Head *</Label>
                  <Select
                    value={formData.headId}
                    onValueChange={(value) => handleSelectChange("headId", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select voucher head" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Salary Expense (VH-001)</SelectItem>
                      <SelectItem value="2">Office Rent (VH-002)</SelectItem>
                      <SelectItem value="3">Student Fee Income (VH-003)</SelectItem>
                      <SelectItem value="4">Computer Equipment (VH-004)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount *</Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Payment Method *</Label>
                  <Select
                    value={formData.paymentMethod}
                    onValueChange={(value) => handleSelectChange("paymentMethod", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="cheque">Cheque</SelectItem>
                      <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                      <SelectItem value="upi">UPI</SelectItem>
                      <SelectItem value="online">Online Payment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="referenceNumber">Reference Number</Label>
                  <Input
                    id="referenceNumber"
                    name="referenceNumber"
                    placeholder="Enter reference number"
                    value={formData.referenceNumber}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="depositedBy">Deposited By</Label>
                  <Input
                    id="depositedBy"
                    name="depositedBy"
                    placeholder="Enter person name"
                    value={formData.depositedBy}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Bank Details */}
              {(formData.paymentMethod === "cheque" || formData.paymentMethod === "bank_transfer") && (
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
                      <Label htmlFor="branchName">Branch Name</Label>
                      <Input
                        id="branchName"
                        name="branchName"
                        placeholder="Enter branch name"
                        value={formData.branchName}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="chequeNumber">Cheque Number</Label>
                      <Input
                        id="chequeNumber"
                        name="chequeNumber"
                        placeholder="Enter cheque number"
                        value={formData.chequeNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Description and Remarks */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="remarks">Remarks</Label>
                  <textarea
                    id="remarks"
                    name="remarks"
                    rows={2}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter any additional remarks"
                    value={formData.remarks}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full md:w-auto">
                <DollarSign className="mr-2 h-4 w-4" />
                Create Deposit Voucher
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default DepositVoucher;
