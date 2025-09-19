import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import universityLogo from "@/assets/university-logo.png";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* University Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src={universityLogo} alt="TechTitans_6" className="h-8 w-auto" />
              <div>
                <h3 className="text-lg font-bold">TechTitans_6</h3>
                <p className="text-sm opacity-90">University</p>
              </div>
            </div>
            <p className="text-sm opacity-90">
              Leading the future through excellence in education, research, and innovation.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-primary-foreground hover:opacity-80 transition-opacity">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground hover:opacity-80 transition-opacity">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground hover:opacity-80 transition-opacity">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground hover:opacity-80 transition-opacity">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/about" className="block text-sm hover:opacity-80 transition-opacity">About Us</Link>
              <Link to="/courses" className="block text-sm hover:opacity-80 transition-opacity">Courses</Link>
              <Link to="/admission" className="block text-sm hover:opacity-80 transition-opacity">Admission</Link>
              <Link to="/achievements" className="block text-sm hover:opacity-80 transition-opacity">Achievements</Link>
            </div>
          </div>

          {/* Academics */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Academics</h3>
            <div className="space-y-2">
              <Link to="/departments" className="block text-sm hover:opacity-80 transition-opacity">Departments</Link>
              <Link to="/facilities" className="block text-sm hover:opacity-80 transition-opacity">Facilities</Link>
              <Link to="/student-portal" className="block text-sm hover:opacity-80 transition-opacity">Student Portal</Link>
              <a href="#" className="block text-sm hover:opacity-80 transition-opacity">Faculty</a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>123 University Lane, Tech City, TC 12345</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4" />
                <span>info@techtitans6.edu</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm opacity-90">
              © 2024 TechTitans_6 University. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-xs">
              <span className="flex items-center space-x-2">
                <span className="font-semibold">NAAC A++</span>
              </span>
              <span className="flex items-center space-x-2">
                <span className="font-semibold">NBA Accredited</span>
              </span>
              <span className="flex items-center space-x-2">
                <span className="font-semibold">ISO Certified</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}