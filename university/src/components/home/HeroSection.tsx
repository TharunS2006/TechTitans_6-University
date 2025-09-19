import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Users, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import heroEngineer from "@/assets/hero-engineer.jpg";
import heroDoctor from "@/assets/hero-doctor.jpg";
import heroAdvocate from "@/assets/hero-advocate.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 hero-gradient opacity-5"></div>
      
      {/* Content Container */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-primary">
                <Award className="h-5 w-5" />
                <span className="text-sm font-medium">NAAC A++ | NBA Accredited</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Welcome to{" "}
                <span className="text-gradient">TechTitans_6</span>{" "}
                University
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Shaping tomorrow's leaders through excellence in education, innovation, and research. 
                Join thousands of successful graduates who are making a difference worldwide.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-accent/50">
                <div className="text-2xl font-bold text-primary">25+</div>
                <div className="text-sm text-muted-foreground">Years of Excellence</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-accent/50">
                <div className="text-2xl font-bold text-primary">50k+</div>
                <div className="text-sm text-muted-foreground">Alumni Worldwide</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-accent/50">
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Placement Rate</div>
              </div>
            </div>

            {/* -- NEW: Badges / Trust row (keeps visual weight) */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-sm font-medium">
                <Award className="h-4 w-4 mr-2 text-primary" /> NAAC A++
              </div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-sm font-medium">
                <Users className="h-4 w-4 mr-2 text-primary" /> 50k+ Alumni
              </div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-sm font-medium">
                <BookOpen className="h-4 w-4 mr-2 text-primary" /> 500+ Recruiters
              </div>
            </div>

            {/* -- NEW: Testimonials strip */}
            <div className="mt-8 bg-background/60 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Student Voices</div>
                <div className="text-xs text-muted-foreground">What our students say</div>
              </div>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-accent/10">
                  <div className="font-semibold">"Excellent faculty"</div>
                  <div className="text-xs text-muted-foreground">— Arjun, CSE</div>
                </div>
                <div className="p-3 rounded-lg bg-accent/10">
                  <div className="font-semibold">"Great placements"</div>
                  <div className="text-xs text-muted-foreground">— Priya, ECE</div>
                </div>
                <div className="p-3 rounded-lg bg-accent/10">
                  <div className="font-semibold">"Vibrant campus life"</div>
                  <div className="text-xs text-muted-foreground">— Rohit, ME</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Link
                to="/admission"
                onClick={() => window.scrollTo({ top: 0, left: 0 })}
              >
                <Button size="lg" className="btn-university group w-full sm:w-auto">
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link
                to="/courses"
                onClick={() => window.scrollTo({ top: 0, left: 0 })}
              >
                <Button variant="outline" size="lg" className="btn-university-outline w-full sm:w-auto">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Explore Courses
                </Button>
              </Link>
              {/* Virtual Tour button — script in index.html will open the panorama. 
                  Place your equirectangular 360 JPG at src/assets/campus-360.jpg */}
              <button
                type="button"
                data-virtual-tour="true"
                data-img="/src/assets/campus-360.jpg"
                className="hidden sm:inline-flex items-center justify-center btn-university-outline px-5 py-3 rounded-lg text-sm"
              >
                Virtual Tour
              </button>
            </div>
          </div>

          {/* Right Side - Professional Figures */}
          <div className="relative h-auto lg:h-[600px] flex flex-col lg:flex-row items-center lg:items-end justify-center lg:justify-center space-y-6 lg:space-y-0 lg:space-x-6">
            {/* Center - Engineer */}
            <div className="relative z-30 animate-scale-in" style={{ animationDelay: "0.2s" }}>
              <img
                src={heroEngineer}
                alt="Professional Engineer"
                className="univ-img w-auto shadow-hero mx-auto"
              />
              {/* overlay caption on lg+, small-screen caption below */}
              <div className="hidden lg:block absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-background/95 backdrop-blur-sm border border-border rounded-lg px-4 py-2">
                <p className="text-sm font-semibold text-primary">Engineering Excellence</p>
              </div>
              <div className="mt-2 text-center lg:hidden">
                <p className="text-sm font-semibold text-primary">Engineering Excellence</p>
              </div>
            </div>

            {/* Right - Doctor */}
            <div className="relative z-20 animate-scale-in" style={{ animationDelay: "0.4s" }}>
              <img
                src={heroDoctor}
                alt="Professional Doctor"
                className="univ-img w-auto shadow-lg opacity-90 hover:opacity-100 transition-opacity mx-auto"
              />
              <div className="hidden lg:block absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-background/95 backdrop-blur-sm border border-border rounded-lg px-4 py-2">
                <p className="text-sm font-semibold text-primary">Medical Innovation</p>
              </div>
              <div className="mt-2 text-center lg:hidden">
                <p className="text-sm font-semibold text-primary">Medical Innovation</p>
              </div>
            </div>

            {/* Left - Advocate */}
            <div className="relative z-20 animate-scale-in" style={{ animationDelay: "0.6s" }}>
              <img
                src={heroAdvocate}
                alt="Professional Advocate"
                className="univ-img w-auto shadow-lg opacity-90 hover:opacity-100 transition-opacity mx-auto"
              />
              <div className="hidden lg:block absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-background/95 backdrop-blur-sm border border-border rounded-lg px-4 py-2">
                <p className="text-sm font-semibold text-primary">Legal Excellence</p>
              </div>
              <div className="mt-2 text-center lg:hidden">
                <p className="text-sm font-semibold text-primary">Legal Excellence</p>
              </div>
            </div>

            {/* Floating Elements - only visible on lg to avoid overlap on small screens */}
            <div className="hidden lg:block absolute top-10 left-10 animate-bounce">
              <div className="bg-primary/10 p-3 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="hidden lg:block absolute top-20 right-10 animate-bounce" style={{ animationDelay: "1s" }}>
              <div className="bg-primary/10 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
            </div>

            {/* -- RESTORED: additional floating decorative bubbles (large, semi-transparent) */}
            <div className="hidden lg:block absolute -left-8 top-12 animate-float-slow">
              <div className="hero-bubble bg-primary/8 w-24 h-24 rounded-full flex items-center justify-center">
                <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="5"/></svg>
              </div>
            </div>
            <div className="hidden lg:block absolute right-6 bottom-28 animate-float">
              <div className="hero-bubble bg-primary/8 w-16 h-16 rounded-full flex items-center justify-center">
                <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="6" y="6" width="12" height="12" rx="3"/></svg>
              </div>
            </div>
          </div>
         </div>
       </div>
     </section>
   );
 }