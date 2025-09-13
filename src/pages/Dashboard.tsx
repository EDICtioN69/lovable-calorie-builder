import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Target, Zap, Activity } from "lucide-react";

const Dashboard = () => {
  // Mock data for demo - will be replaced with real data later
  const todayStats = {
    caloriesConsumed: 1450,
    caloriesTarget: 2000,
    caloriesBurned: 320,
    protein: { consumed: 85, target: 120 },
    carbs: { consumed: 180, target: 250 },
    fats: { consumed: 65, target: 80 }
  };

  const caloriesRemaining = todayStats.caloriesTarget - todayStats.caloriesConsumed + todayStats.caloriesBurned;
  const progressPercentage = (todayStats.caloriesConsumed / todayStats.caloriesTarget) * 100;

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Today's Progress</h1>
          <p className="text-muted-foreground">Track your nutrition goals</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Log Food
        </Button>
      </div>

      {/* Main Calorie Card */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Calories Today</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">{todayStats.caloriesConsumed}</div>
            <div className="text-muted-foreground">/ {todayStats.caloriesTarget} kcal</div>
          </div>
          
          <Progress value={progressPercentage} className="h-3" />
          
          <div className="flex justify-between text-sm">
            <div className="text-center">
              <div className="font-medium text-success">{caloriesRemaining}</div>
              <div className="text-muted-foreground">Remaining</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-warning">{todayStats.caloriesBurned}</div>
              <div className="text-muted-foreground">Burned</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Macronutrients */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Protein</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.protein.consumed}g</div>
            <div className="text-xs text-muted-foreground">
              of {todayStats.protein.target}g goal
            </div>
            <Progress 
              value={(todayStats.protein.consumed / todayStats.protein.target) * 100} 
              className="h-2 mt-2" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carbs</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.carbs.consumed}g</div>
            <div className="text-xs text-muted-foreground">
              of {todayStats.carbs.target}g goal
            </div>
            <Progress 
              value={(todayStats.carbs.consumed / todayStats.carbs.target) * 100} 
              className="h-2 mt-2" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fats</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.fats.consumed}g</div>
            <div className="text-xs text-muted-foreground">
              of {todayStats.fats.target}g goal
            </div>
            <Progress 
              value={(todayStats.fats.consumed / todayStats.fats.target) * 100} 
              className="h-2 mt-2" 
            />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <Plus className="w-6 h-6" />
              <span className="text-sm">Breakfast</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <Plus className="w-6 h-6" />
              <span className="text-sm">Lunch</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <Plus className="w-6 h-6" />
              <span className="text-sm">Dinner</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <Plus className="w-6 h-6" />
              <span className="text-sm">Snack</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Today's Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Meals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <div className="font-medium">Breakfast</div>
                <div className="text-sm text-muted-foreground">2 items</div>
              </div>
              <Badge variant="secondary">420 kcal</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <div className="font-medium">Lunch</div>
                <div className="text-sm text-muted-foreground">3 items</div>
              </div>
              <Badge variant="secondary">680 kcal</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <div className="font-medium">Dinner</div>
                <div className="text-sm text-muted-foreground">2 items</div>
              </div>
              <Badge variant="secondary">350 kcal</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;