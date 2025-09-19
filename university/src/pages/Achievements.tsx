import { Layout } from "@/components/Layout";
import { Trophy, Award, Star, Users, TrendingUp, Globe, BookOpen, Target } from "lucide-react";

const nationalRankings = [
  {
    rank: "42",
    category: "Overall",
    organization: "NIRF 2024",
    description: "National Institutional Ranking Framework"
  },
  {
    rank: "35",
    category: "Engineering",
    organization: "NIRF 2024", 
    description: "Among top engineering institutions"
  },
  {
    rank: "28",
    category: "Innovation",
    organization: "ARIIA 2024",
    description: "Atal Ranking of Institutions on Innovation"
  },
  {
    rank: "Top 50",
    category: "Research",
    organization: "India Today 2024",
    description: "Best Universities for Research"
  }
];

const accreditations = [
  {
    title: "NAAC A++ Grade",
    score: "3.8/4.0 CGPA",
    description: "Highest grade with excellent quality parameters",
    year: "2023",
    validity: "7 Years"
  },
  {
    title: "NBA Accreditation",
    score: "All Programs",
    description: "National Board of Accreditation for technical programs",
    year: "2024",
    validity: "6 Years"
  },
  {
    title: "ISO 9001:2015",
    score: "Quality Management",
    description: "International standard for quality management systems",
    year: "2023",
    validity: "3 Years"  
  },
  {
    title: "ISO 14001:2015",
    score: "Environmental Management",
    description: "Environmental management system certification",
    year: "2023",
    validity: "3 Years"
  }
];

const achievements = [
  {
    category: "Academic Excellence",
    icon: BookOpen,
    items: [
      "Ranked among top 50 universities in India",
      "100% PhD qualified faculty",
      "95% placement rate consistently",
      "50+ international collaborations"
    ]
  },
  {
    category: "Research & Innovation",
    icon: Star,
    items: [
      "500+ research publications annually",
      "50+ patents filed",
      "₹25 Crores research funding",
      "20+ industry collaborations"
    ]
  },
  {
    category: "Student Success",
    icon: Users,
    items: [
      "50,000+ successful alumni worldwide",
      "Average package of 50 LPA",
      "Students in Fortune 500 companies",
      "Entrepreneurship success stories"
    ]
  },
  {
    category: "Infrastructure",
    icon: Target,
    items: [
      "150 acres green campus",
      "State-of-the-art laboratories",
      "Modern library with 2 lakh books",
      "Sports complex with international standards"
    ]
  }
];

const awards = [
  {
    title: "Best University Award",
    organization: "Education Excellence Awards 2024",
    category: "Overall Excellence",
    year: "2024"
  },
  {
    title: "Innovation Leadership Award",
    organization: "CII Education Summit 2023",
    category: "Technology Integration",
    year: "2023"
  },
  {
    title: "Green Campus Award",
    organization: "Ministry of Environment 2023",
    category: "Sustainability",
    year: "2023"
  },
  {
    title: "Excellence in Placement",
    organization: "ASSOCHAM Awards 2024",
    category: "Career Development",
    year: "2024"
  },
  {
    title: "Research Excellence Award",
    organization: "National Science Foundation",
    category: "Scientific Research",
    year: "2023"
  },
  {
    title: "Digital Innovation Award",
    organization: "Digital India Awards 2024",
    category: "Educational Technology",
    year: "2024"
  }
];

const Achievements = () => {
  return (
    <Layout>
      <div className="min-h-screen py-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-primary-light/10 py-16 mb-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-gradient">Achievements</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Celebrating excellence, recognition, and milestones that define our journey toward educational leadership
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4">
          {/* National Rankings */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                National <span className="text-gradient">Rankings</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Recognized excellence by premier ranking organizations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {nationalRankings.map((ranking, index) => (
                <div key={index} className="card-feature text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-primary/10 rounded-full">
                      <TrendingUp className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">#{ranking.rank}</div>
                  <h3 className="font-semibold mb-1">{ranking.category}</h3>
                  <p className="text-sm font-medium text-muted-foreground mb-2">{ranking.organization}</p>
                  <p className="text-xs text-muted-foreground">{ranking.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Accreditations */}
          <section className="mb-20 bg-accent/20 rounded-2xl p-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Accreditations & <span className="text-gradient">Certifications</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Quality assurance through recognized accreditation bodies
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {accreditations.map((accred, index) => (
                <div key={index} className="bg-background rounded-xl p-6 shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{accred.title}</h3>
                        <p className="text-primary font-medium">{accred.score}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{accred.year}</div>
                      <div className="text-xs text-muted-foreground">Valid: {accred.validity}</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{accred.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Key Achievements */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Key <span className="text-gradient">Achievements</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Milestones that showcase our commitment to excellence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="card-university">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <achievement.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{achievement.category}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {achievement.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Awards & Recognition */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Awards & <span className="text-gradient">Recognition</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Prestigious awards that acknowledge our contributions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {awards.map((award, index) => (
                <div key={index} className="card-feature">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Trophy className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {award.year}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2">{award.title}</h3>
                  <p className="text-primary font-medium mb-2">{award.organization}</p>
                  <p className="text-sm text-muted-foreground">{award.category}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Global Recognition */}
          <section className="bg-gradient-to-r from-primary/10 to-primary-light/10 rounded-2xl p-8 md:p-12">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Globe className="h-12 w-12 text-primary" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Global <span className="text-gradient">Recognition</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                Our achievements extend beyond national borders, earning recognition from international 
                organizations and establishing partnerships with leading global institutions.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-background rounded-lg p-6 shadow-sm">
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">International Partnerships</div>
                </div>
                <div className="bg-background rounded-lg p-6 shadow-sm">
                  <div className="text-2xl font-bold text-primary">25</div>
                  <div className="text-sm text-muted-foreground">Countries Represented</div>
                </div>
                <div className="bg-background rounded-lg p-6 shadow-sm">
                  <div className="text-2xl font-bold text-primary">100+</div>
                  <div className="text-sm text-muted-foreground">International Faculty Exchange</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Achievements;