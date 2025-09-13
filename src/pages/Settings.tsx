import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Settings as SettingsIcon, User, Bell, Globe, Shield, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    units: "metric",
    notifications: true,
    weeklyReports: true,
    darkMode: false,
    language: "en"
  });

  const [accountInfo, setAccountInfo] = useState({
    email: "user@example.com",
    name: "John Doe"
  });

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully!",
    });
  };

  const handleSignOut = () => {
    toast({
      title: "Signed Out",
      description: "You have been signed out successfully.",
    });
  };

  const handleResetPassword = () => {
    toast({
      title: "Password Reset",
      description: "Password reset email has been sent to your email address.",
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      <div className="flex items-center gap-3">
        <SettingsIcon className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>
      </div>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Account Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={accountInfo.email}
              onChange={(e) => setAccountInfo({...accountInfo, email: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={accountInfo.name}
              onChange={(e) => setAccountInfo({...accountInfo, name: e.target.value})}
            />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={handleResetPassword}>
              Reset Password
            </Button>
            <Button onClick={handleSaveSettings}>
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Units</Label>
              <div className="text-sm text-muted-foreground">
                Choose your preferred measurement system
              </div>
            </div>
            <Select value={settings.units} onValueChange={(value) => setSettings({...settings, units: value})}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                <SelectItem value="imperial">Imperial (lb, ft)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Language</Label>
              <div className="text-sm text-muted-foreground">
                Select your preferred language
              </div>
            </div>
            <Select value={settings.language} onValueChange={(value) => setSettings({...settings, language: value})}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Dark Mode</Label>
              <div className="text-sm text-muted-foreground">
                Switch between light and dark theme
              </div>
            </div>
            <Switch
              checked={settings.darkMode}
              onCheckedChange={(checked) => setSettings({...settings, darkMode: checked})}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Push Notifications</Label>
              <div className="text-sm text-muted-foreground">
                Receive meal logging reminders
              </div>
            </div>
            <Switch
              checked={settings.notifications}
              onCheckedChange={(checked) => setSettings({...settings, notifications: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Weekly Reports</Label>
              <div className="text-sm text-muted-foreground">
                Get weekly progress summaries via email
              </div>
            </div>
            <Switch
              checked={settings.weeklyReports}
              onCheckedChange={(checked) => setSettings({...settings, weeklyReports: checked})}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Privacy & Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">Data Privacy</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Your data is stored securely and is never shared with third parties. 
              All information is encrypted and protected.
            </p>
            <Badge variant="secondary" className="bg-success text-white">
              🔒 Fully Secure
            </Badge>
          </div>

          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              Download My Data
            </Button>
            <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* App Information */}
      <Card>
        <CardHeader>
          <CardTitle>App Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm">Version</span>
            <Badge variant="secondary">1.0.0</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Last Updated</span>
            <span className="text-sm text-muted-foreground">Today</span>
          </div>
          
          <div className="space-y-2 pt-4">
            <Button variant="outline" className="w-full justify-start">
              Help & Support
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Privacy Policy
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Terms of Service
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sign Out */}
      <Card className="border-destructive/20">
        <CardContent className="pt-6">
          <Button 
            variant="destructive" 
            className="w-full gap-2" 
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;