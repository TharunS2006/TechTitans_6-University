import { Layout } from "@/components/Layout";
import { Calendar, FileText, DollarSign, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Admission = () => {
  const admissionSteps = [
    { step: 1, title: "Online Application", description: "Fill out the comprehensive application form" },
    { step: 2, title: "Document Submission", description: "Upload required academic documents" },
    { step: 3, title: "Entrance Exam", description: "Appear for university entrance examination" },
    { step: 4, title: "Interview", description: "Personal interview with admission committee" },
    { step: 5, title: "Fee Payment", description: "Pay admission fees upon selection" }
  ];

  return (
    <Layout>
      <div className="min-h-screen py-20">
        <section className="bg-gradient-to-r from-primary/10 to-primary-light/10 py-16 mb-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">Admission</span> Process
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Join TechTitans_6 University and become part of our legacy of excellence
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4">
          {/* Admission Steps */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Application Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {admissionSteps.map((step, index) => (
                <div key={index} className="card-feature text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    {step.step}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Application Form */}
          <section className="bg-accent/20 rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Apply Now</h2>
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Full Name" />
                <Input placeholder="Email Address" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Phone Number" />
                <Input placeholder="Date of Birth" type="date" />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="btech-cs">B.Tech Computer Science</SelectItem>
                  <SelectItem value="btech-ec">B.Tech Electronics</SelectItem>
                  <SelectItem value="mbbs">MBBS</SelectItem>
                </SelectContent>
              </Select>
              <Textarea placeholder="Why do you want to join TechTitans_6?" rows={4} />
              <Button className="w-full btn-university">Submit Application</Button>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Admission;