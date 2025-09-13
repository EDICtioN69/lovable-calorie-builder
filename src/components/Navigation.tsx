import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  User, 
  Utensils, 
  BarChart, 
  Settings, 
  Menu,
  Target,
  TrendingUp
} from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { to: "/", icon: Home, label: "Dashboard", color: "text-primary" },
    { to: "/profile", icon: User, label: "Profile", color: "text-success" },
    { to: "/food-log", icon: Utensils, label: "Food Log", color: "text-warning" },
    { to: "/history", icon: BarChart, label: "History", color: "text-purple-500" },
    { to: "/settings", icon: Settings, label: "Settings", color: "text-muted-foreground" }
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const NavItems = ({ mobile = false }) => (
    <nav className={`space-y-2 ${mobile ? 'pt-6' : ''}`}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.to);
        
        return (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => mobile && setIsOpen(false)}
            className={`
              flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
              ${active 
                ? 'bg-primary/10 text-primary font-medium border border-primary/20' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }
            `}
          >
            <Icon className={`w-5 h-5 ${active ? 'text-primary' : item.color}`} />
            <span>{item.label}</span>
            {active && (
              <Badge variant="secondary" className="ml-auto bg-primary/20 text-primary">
                Active
              </Badge>
            )}
          </NavLink>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" />
            <h1 className="font-bold text-lg">CalorieTracker</h1>
          </div>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex items-center gap-2 mb-6">
                <Target className="w-6 h-6 text-primary" />
                <h2 className="font-bold text-lg">Menu</h2>
              </div>
              <NavItems mobile={true} />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-card border-r min-h-screen">
        <div className="flex items-center gap-2 p-6 border-b">
          <Target className="w-8 h-8 text-primary" />
          <div>
            <h1 className="font-bold text-xl">CalorieTracker</h1>
            <p className="text-sm text-muted-foreground">Your Health Journey</p>
          </div>
        </div>
        
        <div className="flex-1 p-4">
          <NavItems />
        </div>

        {/* Quick Stats in Sidebar */}
        <div className="p-4 border-t">
          <div className="bg-primary/5 rounded-lg p-3 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-muted-foreground">Today's Progress</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Calories</span>
              <span className="font-medium text-primary">1,450 / 2,000</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '72.5%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;