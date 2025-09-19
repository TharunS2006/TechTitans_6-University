import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Search, Filter, BookOpen, Users, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const courseCategories = ["All", "Engineering", "Arts & Science", "Medical", "Management"];

const coursesData = [
  // UG Engineering Courses
  {
    id: 1,
    title: "B.Tech Computer Science",
    category: "Engineering",
    type: "UG",
    duration: "4 Years",
    description: "Comprehensive program covering programming, algorithms, and system design",
    enrolled: 240,
    projects: 45,
    features: ["AI/ML Specialization", "Industry Projects", "Placement Support"]
  },
  {
    id: 2,
    title: "B.Tech Electronics & Communication",
    category: "Engineering",
    type: "UG",
    duration: "4 Years",
    description: "Focus on electronics, communication systems, and embedded technologies",
    enrolled: 180,
    projects: 38,
    features: ["VLSI Design", "IoT Projects", "Research Labs"]
  },
  {
    id: 3,
    title: "B.Tech Mechanical Engineering",
    category: "Engineering",
    type: "UG",
    duration: "4 Years",
    description: "Traditional and modern mechanical engineering principles",
    enrolled: 200,
    projects: 42,
    features: ["CAD/CAM Lab", "Robotics", "Industry Internships"]
  },
  {
    id: 4,
    title: "B.Tech Civil Engineering",
    category: "Engineering",
    type: "UG",
    duration: "4 Years",
    description: "Infrastructure development and construction technology",
    enrolled: 160,
    projects: 35,
    features: ["Smart Cities", "Sustainable Design", "Site Visits"]
  },
  {
    id: 5,
    title: "B.Tech Electrical Engineering",
    category: "Engineering",
    type: "UG",
    duration: "4 Years",
    description: "Power systems, control systems, and renewable energy",
    enrolled: 140,
    projects: 32,
    features: ["Power Grid", "Solar Technology", "Automation"]
  },
  
  // UG Arts & Science
  {
    id: 6,
    title: "B.Sc Physics",
    category: "Arts & Science",
    type: "UG",
    duration: "3 Years",
    description: "Fundamental and applied physics with research opportunities",
    enrolled: 80,
    projects: 25,
    features: ["Research Projects", "Lab Work", "Industry Connect"]
  },
  {
    id: 7,
    title: "B.Sc Mathematics",
    category: "Arts & Science",
    type: "UG",
    duration: "3 Years",
    description: "Pure and applied mathematics with computational focus",
    enrolled: 70,
    projects: 22,
    features: ["Data Analytics", "Mathematical Modeling", "Research"]
  },
  {
    id: 8,
    title: "B.Com Finance",
    category: "Arts & Science",
    type: "UG",
    duration: "3 Years",
    description: "Commerce and finance with practical exposure",
    enrolled: 150,
    projects: 30,
    features: ["Banking", "Investment", "Financial Planning"]
  },
  
  // Medical Courses
  {
    id: 9,
    title: "MBBS",
    category: "Medical",
    type: "UG",
    duration: "5.5 Years",
    description: "Bachelor of Medicine and Bachelor of Surgery",
    enrolled: 100,
    projects: 15,
    features: ["Clinical Training", "Hospital Internship", "Research"]
  },
  {
    id: 10,
    title: "B.Sc Nursing",
    category: "Medical",
    type: "UG",
    duration: "4 Years",
    description: "Comprehensive nursing education with clinical practice",
    enrolled: 60,
    projects: 18,
    features: ["Patient Care", "Medical Technology", "Ethics"]
  },
  
  // PG Courses
  {
    id: 11,
    title: "M.Tech Computer Science",
    category: "Engineering",
    type: "PG",
    duration: "2 Years",
    description: "Advanced computing with specialization options",
    enrolled: 80,
    projects: 28,
    features: ["Research Focus", "Industry Projects", "Publications"]
  },
  {
    id: 12,
    title: "MBA",
    category: "Management",
    type: "PG",
    duration: "2 Years",
    description: "Master of Business Administration with specializations",
    enrolled: 120,
    projects: 35,
    features: ["Case Studies", "Industry Exposure", "Leadership"]
  },
  {
    id: 13,
    title: "M.Sc Data Science",
    category: "Arts & Science",
    type: "PG",
    duration: "2 Years",
    description: "Advanced data analytics and machine learning",
    enrolled: 60,
    projects: 25,
    features: ["Big Data", "AI/ML", "Industry Projects"]
  },
  
  // Master's Programs
  {
    id: 14,
    title: "Master of Computer Applications",
    category: "Engineering",
    type: "Master's",
    duration: "3 Years",
    description: "Professional software development program",
    enrolled: 90,
    projects: 40,
    features: ["Full Stack", "Mobile Apps", "Cloud Computing"]
  },
  {
    id: 15,
    title: "Master of Design",
    category: "Arts & Science",
    type: "Master's",
    duration: "2 Years",
    description: "Creative design with technology integration",
    enrolled: 40,
    projects: 20,
    features: ["UI/UX", "Product Design", "Innovation"]
  }
];

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const filteredCourses = coursesData.filter(course => {
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const courseStats = {
    ug: coursesData.filter(c => c.type === "UG").length,
    pg: coursesData.filter(c => c.type === "PG").length,
    masters: coursesData.filter(c => c.type === "Master's").length
  };

  return (
    <Layout>
      <div className="min-h-screen py-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-primary-light/10 py-16 mb-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-gradient">Academic Programs</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Discover world-class education across multiple disciplines with industry-relevant curriculum
            </p>
            
            {/* Course Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-background rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-primary">{courseStats.ug}</div>
                <div className="text-sm text-muted-foreground">UG Courses</div>
              </div>
              <div className="bg-background rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-primary">{courseStats.pg}</div>
                <div className="text-sm text-muted-foreground">PG Courses</div>
              </div>
              <div className="bg-background rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-primary">{courseStats.masters}</div>
                <div className="text-sm text-muted-foreground">Master's Programs</div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4">
          {/* Search and Filter */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {courseCategories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div key={course.id} className="card-university group cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xs bg-accent px-2 py-1 rounded-full">
                    {course.type}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Duration: {course.duration}</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.enrolled} Students</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Award className="h-4 w-4" />
                      <span>{course.projects} Projects</span>
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {course.features.slice(0, 2).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedCourse(course)}
                  >
                    View Details
                  </Button>
                  <Button size="sm" className="btn-university">
                    Enroll Now
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No courses found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Courses;