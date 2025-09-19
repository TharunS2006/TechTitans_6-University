import { Award, Building2, FileCheck, Trophy } from "lucide-react";

const stats = [
  {
    icon: Building2,
    title: "University Location",
    value: "Tech City Campus",
    description: "State-of-the-art facilities spanning 150 acres",
    color: "text-blue-600"
  },
  {
    icon: Award,
    title: "NAAC Grade",
    value: "A++",
    description: "Highest accreditation with outstanding quality",
    color: "text-green-600"
  },
  {
    icon: FileCheck,
    title: "NBA Accreditation",
    value: "Certified",
    description: "All engineering programs NBA accredited",
    color: "text-purple-600"
  },
  {
    icon: Trophy,
    title: "ISO Certification",
    value: "ISO 9001:2015",
    description: "Quality management system certified",
    color: "text-orange-600"
  }
];

export function StatsSection() {
  return (
    <section className="py-20 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Excellence in <span className="text-gradient">Education</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Recognized for our commitment to quality education and innovative research
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="card-feature group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">{stat.title}</h3>
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}