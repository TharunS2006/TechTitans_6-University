import { Layout } from "@/components/Layout";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <Layout>
      <div className="min-h-screen py-20">
        <section className="bg-gradient-to-r from-primary/10 to-primary-light/10 py-16 mb-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">Contact</span> Us
            </h1>
            <p className="text-xl text-muted-foreground">Get in touch with us for any queries or assistance</p>
          </div>
        </section>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="card-university">
                <div className="flex items-center space-x-4 mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">Address</h3>
                </div>
                <p className="text-muted-foreground">
                  TechTitans_6 University<br />
                  123 University Lane, Tech City<br />
                  State - 560001, India
                </p>
              </div>

              <div className="card-university">
                <div className="flex items-center space-x-4 mb-4">
                  <Phone className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">Phone</h3>
                </div>
                <p className="text-muted-foreground">
                  Main Office: +91 80 1234 5678<br />
                  Admissions: +91 80 1234 5679
                </p>
              </div>

              <div className="card-university">
                <div className="flex items-center space-x-4 mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">Email</h3>
                </div>
                <p className="text-muted-foreground">
                  General: info@techtitans6.edu<br />
                  Admissions: admissions@techtitans6.edu
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card-university">
              <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Your Name" />
                  <Input placeholder="Your Email" />
                </div>
                <Input placeholder="Subject" />
                <Textarea placeholder="Your Message" rows={6} />
                <Button className="w-full btn-university">Send Message</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;