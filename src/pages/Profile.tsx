import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { User, Target, Activity, Scale } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    age: "25",
    weight: "70",
    height: "175",
    gender: "male",
    activityLevel: "moderate",
    goal: "maintain",
    targetWeight: "70"
  });

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully!",
    });
  };

  const calculateBMI = () => {
    const weightKg = parseFloat(profileData.weight);
    const heightM = parseFloat(profileData.height) / 100;
    const bmi = weightKg / (heightM * heightM);
    return bmi.toFixed(1);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "Underweight", color: "bg-blue-500" };
    if (bmi < 25) return { category: "Normal", color: "bg-success" };
    if (bmi < 30) return { category: "Overweight", color: "bg-warning" };
    return { category: "Obese", color: "bg-destructive" };
  };

  const bmi = parseFloat(calculateBMI());
  const bmiCategory = getBMICategory(bmi);

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      <div className="flex items-center gap-3">
        <User className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile Setup</h1>
          <p className="text-muted-foreground">Personalize your fitness journey</p>
        </div>
      </div>

      {/* BMI Card */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="w-5 h-5" />
            Your BMI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-primary">{calculateBMI()}</div>
              <div className="text-sm text-muted-foreground">Body Mass Index</div>
            </div>
            <Badge variant="secondary" className={`${bmiCategory.color} text-white`}>
              {bmiCategory.category}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={profileData.age}
                onChange={(e) => setProfileData({...profileData, age: e.target.value})}
                placeholder="Enter your age"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={profileData.gender} onValueChange={(value) => setProfileData({...profileData, gender: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Current Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={profileData.weight}
                onChange={(e) => setProfileData({...profileData, weight: e.target.value})}
                placeholder="Enter your weight"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                value={profileData.height}
                onChange={(e) => setProfileData({...profileData, height: e.target.value})}
                placeholder="Enter your height"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity & Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Activity Level & Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Activity Level</Label>
            <Select value={profileData.activityLevel} onValueChange={(value) => setProfileData({...profileData, activityLevel: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select activity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
                <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                <SelectItem value="very-active">Very Active (2x/day, intense)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Fitness Goal</Label>
            <Select value={profileData.goal} onValueChange={(value) => setProfileData({...profileData, goal: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select your goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lose">Lose Weight</SelectItem>
                <SelectItem value="maintain">Maintain Weight</SelectItem>
                <SelectItem value="gain">Gain Weight</SelectItem>
                <SelectItem value="muscle">Build Muscle</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetWeight">Target Weight (kg)</Label>
            <Input
              id="targetWeight"
              type="number"
              value={profileData.targetWeight}
              onChange={(e) => setProfileData({...profileData, targetWeight: e.target.value})}
              placeholder="Enter target weight"
            />
          </div>
        </CardContent>
      </Card>

      {/* Calculated Daily Needs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Your Daily Targets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">2,000</div>
              <div className="text-sm text-muted-foreground">Calories</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">120g</div>
              <div className="text-sm text-muted-foreground">Protein</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">250g</div>
              <div className="text-sm text-muted-foreground">Carbs</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">80g</div>
              <div className="text-sm text-muted-foreground">Fats</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full" size="lg">
        Save Profile
      </Button>
    </div>
  );
};

export default Profile;