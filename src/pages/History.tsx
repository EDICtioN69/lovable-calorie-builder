import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, BarChart, Calendar } from "lucide-react";
import { useState } from "react";

const History = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  // Mock historical data - will be replaced with real data
  const weeklyData = [
    { date: "Mon", calories: 1850, weight: 70.2, goal: 2000 },
    { date: "Tue", calories: 2100, weight: 70.1, goal: 2000 },
    { date: "Wed", calories: 1950, weight: 70.0, goal: 2000 },
    { date: "Thu", calories: 2250, weight: 69.9, goal: 2000 },
    { date: "Fri", calories: 1800, weight: 69.8, goal: 2000 },
    { date: "Sat", calories: 2300, weight: 69.9, goal: 2000 },
    { date: "Sun", calories: 1900, weight: 69.7, goal: 2000 }
  ];

  const stats = {
    avgCalories: Math.round(weeklyData.reduce((sum, day) => sum + day.calories, 0) / weeklyData.length),
    avgWeight: (weeklyData.reduce((sum, day) => sum + day.weight, 0) / weeklyData.length).toFixed(1),
    weightChange: (weeklyData[weeklyData.length - 1].weight - weeklyData[0].weight).toFixed(1),
    daysOnTarget: weeklyData.filter(day => Math.abs(day.calories - day.goal) <= 100).length
  };

  const weightTrend = parseFloat(stats.weightChange);

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      <div className="flex items-center gap-3">
        <BarChart className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">Progress History</h1>
          <p className="text-muted-foreground">Track your journey over time</p>
        </div>
      </div>

      {/* Period Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Time Period
            </span>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Calories</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.avgCalories}</div>
            <div className="text-xs text-muted-foreground">
              per day this week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weight Change</CardTitle>
            {weightTrend > 0 ? (
              <TrendingUp className="h-4 w-4 text-destructive" />
            ) : (
              <TrendingDown className="h-4 w-4 text-success" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${weightTrend > 0 ? 'text-destructive' : 'text-success'}`}>
              {weightTrend > 0 ? '+' : ''}{stats.weightChange} kg
            </div>
            <div className="text-xs text-muted-foreground">
              this week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Weight</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.avgWeight} kg</div>
            <div className="text-xs text-muted-foreground">
              latest measurement
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days On Target</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.daysOnTarget}/7</div>
            <div className="text-xs text-muted-foreground">
              within calorie goal
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Calories Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center border-2 border-dashed border-muted">
            <div className="text-center">
              <BarChart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Interactive chart will appear here</p>
              <p className="text-sm text-muted-foreground">Coming soon with backend integration</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weight Progress Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Weight Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center border-2 border-dashed border-muted">
            <div className="text-center">
              <TrendingDown className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Weight tracking chart will appear here</p>
              <p className="text-sm text-muted-foreground">Coming soon with backend integration</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {weeklyData.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="font-medium w-12">{day.date}</div>
                  <div>
                    <div className="text-sm font-medium">{day.calories} calories</div>
                    <div className="text-xs text-muted-foreground">Weight: {day.weight} kg</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {Math.abs(day.calories - day.goal) <= 100 ? (
                    <Badge variant="secondary" className="bg-success text-white">On Target</Badge>
                  ) : day.calories > day.goal ? (
                    <Badge variant="secondary" className="bg-warning text-white">Over</Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-blue-500 text-white">Under</Badge>
                  )}
                  <div className="text-sm text-muted-foreground">
                    Goal: {day.goal}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default History;