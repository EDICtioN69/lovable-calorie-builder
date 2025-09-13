import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Edit, Trash2, Utensils } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  serving: string;
  meal: string;
  time: string;
}

const FoodLog = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMeal, setSelectedMeal] = useState("all");
  
  // Mock food entries - will be replaced with real data
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([
    {
      id: "1",
      name: "Greek Yogurt with Berries",
      calories: 150,
      protein: 15,
      carbs: 20,
      fats: 5,
      serving: "1 cup",
      meal: "breakfast",
      time: "08:30"
    },
    {
      id: "2",
      name: "Grilled Chicken Salad",
      calories: 350,
      protein: 35,
      carbs: 15,
      fats: 18,
      serving: "1 large bowl",
      meal: "lunch",
      time: "12:45"
    },
    {
      id: "3",
      name: "Banana",
      calories: 105,
      protein: 1,
      carbs: 27,
      fats: 0,
      serving: "1 medium",
      meal: "snack",
      time: "15:20"
    }
  ]);

  const handleAddFood = () => {
    toast({
      title: "Add Food",
      description: "Search and add food items to your log",
    });
  };

  const handleDeleteEntry = (id: string) => {
    setFoodEntries(foodEntries.filter(entry => entry.id !== id));
    toast({
      title: "Food Removed",
      description: "Food entry has been deleted from your log",
    });
  };

  const getMealColor = (meal: string) => {
    switch(meal) {
      case "breakfast": return "bg-yellow-500";
      case "lunch": return "bg-blue-500";
      case "dinner": return "bg-purple-500";
      case "snack": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const filteredEntries = foodEntries.filter(entry => {
    const matchesSearch = entry.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMeal = selectedMeal === "all" || entry.meal === selectedMeal;
    return matchesSearch && matchesMeal;
  });

  const totalCalories = filteredEntries.reduce((sum, entry) => sum + entry.calories, 0);

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      <div className="flex items-center gap-3">
        <Utensils className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">Food Log</h1>
          <p className="text-muted-foreground">Track your daily nutrition</p>
        </div>
      </div>

      {/* Add Food & Search */}
      <Card>
        <CardHeader>
          <CardTitle>Add Food</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search foods..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={handleAddFood} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Food
            </Button>
          </div>

          <div className="flex gap-2">
            <Select value={selectedMeal} onValueChange={setSelectedMeal}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by meal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Meals</SelectItem>
                <SelectItem value="breakfast">Breakfast</SelectItem>
                <SelectItem value="lunch">Lunch</SelectItem>
                <SelectItem value="dinner">Dinner</SelectItem>
                <SelectItem value="snack">Snacks</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Today's Summary */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle>Today's Total</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{totalCalories}</div>
              <div className="text-sm text-muted-foreground">Calories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {filteredEntries.reduce((sum, entry) => sum + entry.protein, 0)}g
              </div>
              <div className="text-sm text-muted-foreground">Protein</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {filteredEntries.reduce((sum, entry) => sum + entry.carbs, 0)}g
              </div>
              <div className="text-sm text-muted-foreground">Carbs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {filteredEntries.reduce((sum, entry) => sum + entry.fats, 0)}g
              </div>
              <div className="text-sm text-muted-foreground">Fats</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Food Entries List */}
      <Card>
        <CardHeader>
          <CardTitle>Food Entries ({filteredEntries.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredEntries.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Utensils className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No food entries found</p>
                <p className="text-sm">Start by adding your first meal!</p>
              </div>
            ) : (
              filteredEntries.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-4 flex-1">
                    <Badge variant="secondary" className={`${getMealColor(entry.meal)} text-white`}>
                      {entry.meal.charAt(0).toUpperCase() + entry.meal.slice(1)}
                    </Badge>
                    <div className="flex-1">
                      <div className="font-medium">{entry.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {entry.serving} • {entry.time}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-bold text-primary">{entry.calories} kcal</div>
                      <div className="text-sm text-muted-foreground">
                        P:{entry.protein}g C:{entry.carbs}g F:{entry.fats}g
                      </div>
                    </div>
                    
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Add Popular Foods */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Add</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["Apple", "Banana", "Chicken Breast", "Rice", "Eggs", "Oatmeal", "Salmon", "Broccoli"].map((food) => (
              <Button key={food} variant="outline" className="h-auto p-3 text-center">
                {food}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FoodLog;