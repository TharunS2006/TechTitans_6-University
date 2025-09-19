import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import universityLogo from "@/assets/university-logo.png";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Courses", path: "/courses" },
  { name: "Departments", path: "/departments" },
  { name: "Achievements", path: "/achievements" },
  { name: "Facilities", path: "/facilities" },
  { name: "Admission", path: "/admission" },
  { name: "Contact Us", path: "/contact" },
  { name: "Student Portal", path: "/student-portal" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={universityLogo} 
              alt="TechTitans_6 University Logo" 
              className="h-10 w-auto"
            />
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-primary">TechTitans_6</h1>
              <p className="text-xs text-muted-foreground">University</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  size="sm"
                  className="transition-all duration-200 hover:scale-105"
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    className="w-full justify-start"
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}