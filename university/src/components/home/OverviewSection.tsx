import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Users, Award, Building2, GraduationCap, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const overviewCards = [
  {
    icon: BookOpen,
    title: "Academic Programs",
    description: "45+ undergraduate and postgraduate programs across various disciplines",
    link: "/courses",
    color: "text-blue-600"
  },
  {
    icon: Users,
    title: "Faculty Excellence",
    description: "Distinguished faculty with PhD qualifications and industry experience",
    link: "/departments",
    color: "text-green-600"
  },
  {
    icon: Award,
    title: "Achievements",
    description: "Recognized for outstanding contributions in education and research",
    link: "/achievements",
    color: "text-purple-600"
  },
  {
    icon: Building2,
    title: "World-Class Facilities",
    description: "Modern infrastructure with cutting-edge technology and resources",
    link: "/facilities",
    color: "text-orange-600"
  },
  {
    icon: GraduationCap,
    title: "Student Life",
    description: "Vibrant campus life with clubs, sports, and cultural activities",
    link: "/about",
    color: "text-pink-600"
  },
  {
    icon: Phone,
    title: "Get in Touch",
    description: "Connect with us for admissions, queries, and campus visits",
    link: "/contact",
    color: "text-indigo-600"
  }
];

export function OverviewSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Discover More About <span className="text-gradient">TechTitans_6</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the various aspects that make our university a premier destination for higher education
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {overviewCards.map((card, index) => (
            <Link key={index} to={card.link} className="group">
              <div className="card-university h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <card.icon className={`h-6 w-6 ${card.color}`} />
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors group-hover:translate-x-1 transform duration-300" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  
                  <p className="text-muted-foreground">
                    {card.description}
                  </p>
                </div>
                
                <div className="mt-6">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-0 h-auto font-medium text-primary hover:text-primary-dark"
                  >
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-primary-light/10 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Join TechTitans_6 University?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Take the first step towards your bright future. Apply now and become part of our legacy of excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/admission">
                <Button size="lg" className="btn-university">
                  Start Your Application
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="btn-university-outline">
                  Schedule Campus Visit
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}