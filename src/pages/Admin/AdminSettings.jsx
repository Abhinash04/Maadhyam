import { Settings, ShieldCheck } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Switch } from "../../components/ui/switch";
import { useToast } from "../../components/ui/use-toast";

const AdminSettings = () => {
  const { toast } = useToast();
  const methods = useForm({
    defaultValues: {
      siteName: "",
      contactEmail: "",
      aboutText: "",
      emailNotificationsEnabled: true,
      pushNotificationsEnabled: false,
      notificationSenderEmail: "",
      notificationFrequency: "daily",
      requestApprovalNotification: true,
      matchNotification: true,
      autoModerationEnabled: true,
      profanityFilterEnabled: false,
      contentReviewThreshold: 3,
      userVerificationProcess: "manual",
      contentApprovalWorkflow: "moderation",
      reportNotificationEnabled: true,
      moderationTeamNotification: true,
    },
  });

  const onSubmit = (data) => {
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings saved successfully",
        description: "Your platform settings have been updated.",
      });
    }, 500);
    console.log("Settings saved:", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Platform Settings</h1>
          <p className="text-muted-foreground mt-1">Configure platform parameters and policies</p>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="moderation">Moderation</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Basic platform configurations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField name="siteName">
                  <FormItem>
                    <FormLabel>Site Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Maadhyam" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
                <FormField name="contactEmail">
                  <FormItem>
                    <FormLabel>Contact Email</FormLabel>
                    <FormControl>
                      <Input placeholder="support@maadhyam.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
                <FormField name="aboutText">
                  <FormItem>
                    <FormLabel>About Text</FormLabel>
                    <FormControl>
                      <Textarea placeholder="About our platform..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <Button type="submit" className="w-full">Save General Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Notification Toggles */}
                {[
                  { name: "emailNotificationsEnabled", label: "Email Notifications" },
                  { name: "pushNotificationsEnabled", label: "Push Notifications" },
                  { name: "requestApprovalNotification", label: "Notify on request approval" },
                  { name: "matchNotification", label: "Notify on successful matches" },
                ].map(({ name, label }) => (
                  <FormField key={name} name={name}>
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Switch id={name} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel htmlFor={name}>{label}</FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  </FormField>
                ))}

                <FormField name="notificationSenderEmail">
                  <FormItem>
                    <FormLabel>Notification Sender Email</FormLabel>
                    <FormControl>
                      <Input placeholder="noreply@maadhyam.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <FormField name="notificationFrequency">
                  <FormItem>
                    <FormLabel>Notification Frequency</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="instant">Instant</SelectItem>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <Button type="submit" className="w-full">Save Notification Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Moderation Settings */}
          <TabsContent value="moderation">
            <Card>
              <CardHeader>
                <CardTitle>Moderation Settings</CardTitle>
                <CardDescription>Control content moderation policies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Moderation Toggles */}
                {[
                  { name: "autoModerationEnabled", label: "Enable Automated Moderation" },
                  { name: "profanityFilterEnabled", label: "Enable Profanity Filter" },
                  { name: "reportNotificationEnabled", label: "Notify on new reports" },
                  { name: "moderationTeamNotification", label: "Notify moderation team on high-priority items" },
                ].map(({ name, label }) => (
                  <FormField key={name} name={name}>
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Switch id={name} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel htmlFor={name}>{label}</FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  </FormField>
                ))}

                <FormField name="contentReviewThreshold">
                  <FormItem>
                    <FormLabel>Content Review Threshold</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="3" />
                    </FormControl>
                    <FormMessage />
                    <CardDescription className="mt-2 text-sm text-muted-foreground">
                      Number of reports needed before content is hidden.
                    </CardDescription>
                  </FormItem>
                </FormField>

                <FormField name="userVerificationProcess">
                  <FormItem>
                    <FormLabel>User Verification Process</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select process" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="automatic">Automatic</SelectItem>
                          <SelectItem value="manual">Manual Review</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <FormField name="contentApprovalWorkflow">
                  <FormItem>
                    <FormLabel>Content Approval Workflow</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select workflow" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="instant">Instant Approval</SelectItem>
                          <SelectItem value="moderation">Moderation Required</SelectItem>
                          <SelectItem value="category-based">Category-based</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <Button type="submit" className="w-full">Save Moderation Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </form>
    </FormProvider>
  );
};

export default AdminSettings;
