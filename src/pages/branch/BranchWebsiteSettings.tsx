import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, Palette, Layout, Image, Share2, Upload, Save } from "lucide-react";

export default function BranchWebsiteSettings() {
  return (
    <AppLayout>
      <PageHeader
        title="Website Settings"
        description="Configure your branch website appearance and content"
        breadcrumbs={[
          { label: "Branch Management", href: "/branch/view" },
          { label: "Website Settings" },
        ]}
        actions={
          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        }
      />

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full max-w-2xl grid-cols-5">
          <TabsTrigger value="general" className="gap-2">
            <Globe className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="layout" className="gap-2">
            <Layout className="h-4 w-4" />
            Layout
          </TabsTrigger>
          <TabsTrigger value="media" className="gap-2">
            <Image className="h-4 w-4" />
            Media
          </TabsTrigger>
          <TabsTrigger value="social" className="gap-2">
            <Share2 className="h-4 w-4" />
            Social
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Configure your website's basic details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Website Name</Label>
                  <Input id="siteName" defaultValue="ABC School - Main Campus" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input id="tagline" defaultValue="Excellence in Education Since 1990" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Meta Description</Label>
                  <Textarea id="description" rows={3} defaultValue="Leading educational institution providing quality education..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="keywords">Meta Keywords</Label>
                  <Input id="keywords" defaultValue="school, education, learning, courses" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Domain & URL Settings</CardTitle>
                <CardDescription>Configure your website URL settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="domain">Primary Domain</Label>
                  <Input id="domain" defaultValue="https://abcschool.edu" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subdomain">Branch Subdomain</Label>
                  <div className="flex gap-2">
                    <Input id="subdomain" defaultValue="main" />
                    <span className="flex items-center text-muted-foreground">.abcschool.edu</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>SSL Certificate</Label>
                    <p className="text-xs text-muted-foreground">Enable HTTPS for your website</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>WWW Redirect</Label>
                    <p className="text-xs text-muted-foreground">Redirect www to non-www</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Display contact details on your website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Contact Email</Label>
                  <Input id="email" type="email" defaultValue="info@abcschool.edu" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Phone</Label>
                  <Input id="phone" defaultValue="+91 98765 43210" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" rows={2} defaultValue="123 Education Street, Mumbai, Maharashtra 400001" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Website Features</CardTitle>
                <CardDescription>Enable or disable website features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Online Admissions</Label>
                    <p className="text-xs text-muted-foreground">Allow online admission applications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Online Fee Payment</Label>
                    <p className="text-xs text-muted-foreground">Enable online fee collection</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Student Portal</Label>
                    <p className="text-xs text-muted-foreground">Access to student dashboard</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Parent Portal</Label>
                    <p className="text-xs text-muted-foreground">Access to parent dashboard</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="appearance">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Color Theme</CardTitle>
                <CardDescription>Customize your website colors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <div className="flex gap-2">
                      <div className="h-10 w-10 rounded-lg bg-primary border" />
                      <Input defaultValue="#4F46E5" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Secondary Color</Label>
                    <div className="flex gap-2">
                      <div className="h-10 w-10 rounded-lg bg-secondary border" />
                      <Input defaultValue="#F3F4F6" />
                    </div>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Accent Color</Label>
                    <div className="flex gap-2">
                      <div className="h-10 w-10 rounded-lg bg-accent border" />
                      <Input defaultValue="#10B981" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Text Color</Label>
                    <div className="flex gap-2">
                      <div className="h-10 w-10 rounded-lg bg-foreground border" />
                      <Input defaultValue="#111827" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Typography</CardTitle>
                <CardDescription>Set your website fonts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Heading Font</Label>
                  <Select defaultValue="inter">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inter">Inter</SelectItem>
                      <SelectItem value="poppins">Poppins</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="opensans">Open Sans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Body Font</Label>
                  <Select defaultValue="inter">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inter">Inter</SelectItem>
                      <SelectItem value="poppins">Poppins</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="opensans">Open Sans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Base Font Size</Label>
                  <Select defaultValue="16">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="14">14px</SelectItem>
                      <SelectItem value="16">16px</SelectItem>
                      <SelectItem value="18">18px</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="layout">
          <Card>
            <CardHeader>
              <CardTitle>Page Layout</CardTitle>
              <CardDescription>Configure your website layout options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Header Style</Label>
                  <Select defaultValue="sticky">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sticky">Sticky Header</SelectItem>
                      <SelectItem value="static">Static Header</SelectItem>
                      <SelectItem value="transparent">Transparent Header</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Footer Style</Label>
                  <Select defaultValue="standard">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Footer</SelectItem>
                      <SelectItem value="minimal">Minimal Footer</SelectItem>
                      <SelectItem value="expanded">Expanded Footer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Show Breadcrumbs</Label>
                  <p className="text-xs text-muted-foreground">Display navigation breadcrumbs</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Show Sidebar</Label>
                  <p className="text-xs text-muted-foreground">Display sidebar on inner pages</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Logo & Favicon</CardTitle>
                <CardDescription>Upload your brand assets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Website Logo</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">Upload logo (PNG, SVG)</p>
                    <Button variant="outline" size="sm">Choose File</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Favicon</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">Upload favicon (ICO, PNG)</p>
                    <Button variant="outline" size="sm">Choose File</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hero Banner</CardTitle>
                <CardDescription>Configure homepage hero section</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Banner Image</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">Upload banner (1920x600)</p>
                    <Button variant="outline" size="sm">Choose File</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Banner Title</Label>
                  <Input defaultValue="Welcome to ABC School" />
                </div>
                <div className="space-y-2">
                  <Label>Banner Subtitle</Label>
                  <Input defaultValue="Shaping Tomorrow's Leaders Today" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
              <CardDescription>Connect your social media profiles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Facebook</Label>
                  <Input placeholder="https://facebook.com/yourpage" />
                </div>
                <div className="space-y-2">
                  <Label>Twitter / X</Label>
                  <Input placeholder="https://twitter.com/yourhandle" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Instagram</Label>
                  <Input placeholder="https://instagram.com/yourprofile" />
                </div>
                <div className="space-y-2">
                  <Label>LinkedIn</Label>
                  <Input placeholder="https://linkedin.com/company/yourcompany" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>YouTube</Label>
                  <Input placeholder="https://youtube.com/yourchannel" />
                </div>
                <div className="space-y-2">
                  <Label>WhatsApp</Label>
                  <Input placeholder="+91 98765 43210" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}
