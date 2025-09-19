import { Layout } from "@/components/Layout";
import { GraduationCap, Users, Award, Calendar, BookOpen, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

const departments = [
	{
		name: "Computer Science & Engineering",
		established: 1998,
		hod: "Dr. Rajesh Kumar Sharma",
		hodQualification: "Ph.D. in Computer Science, IIT Delhi",
		achievements: [
			"NBA Accredited for 6 years",
			"Best Department Award 2023",
			"100% Placement Record",
			"50+ Research Publications",
		],
		specializations: [
			"AI/ML",
			"Cybersecurity",
			"Data Science",
			"Cloud Computing",
		],
		labs: 12,
		faculty: 28,
		students: 480,
		recentNews:
			"Department launches new AI Research Center with industry partnership",
	},
	{
		name: "Electronics & Communication",
		established: 1999,
		hod: "Dr. Priya Patel",
		hodQualification: "Ph.D. in Electronics Engineering, IISc Bangalore",
		achievements: [
			"Excellence in Research Award",
			"VLSI Design Center of Excellence",
			"Industry Collaboration Projects",
			"Patent Filing Champion",
		],
		specializations: [
			"VLSI Design",
			"Embedded Systems",
			"IoT",
			"Signal Processing",
		],
		labs: 10,
		faculty: 24,
		students: 360,
		recentNews: "Students win National Level Project Competition in IoT",
	},
	{
		name: "Mechanical Engineering",
		established: 2000,
		hod: "Dr. Arjun Singh",
		hodQualification: "Ph.D. in Mechanical Engineering, IIT Bombay",
		achievements: [
			"Robotics Excellence Award",
			"Industry Ready Curriculum",
			"CAD/CAM Center of Excellence",
			"Innovation in Manufacturing",
		],
		specializations: [
			"Robotics",
			"Automotive",
			"Manufacturing",
			"Thermal Engineering",
		],
		labs: 8,
		faculty: 22,
		students: 320,
		recentNews:
			"Department establishes Advanced Manufacturing Lab with Industry 4.0",
	},
	{
		name: "Civil Engineering",
		established: 1998,
		hod: "Dr. Sunita Verma",
		hodQualification: "Ph.D. in Structural Engineering, IIT Madras",
		achievements: [
			"Sustainable Construction Award",
			"Smart Cities Project Partner",
			"Green Building Certification",
			"Infrastructure Innovation",
		],
		specializations: [
			"Smart Cities",
			"Sustainable Design",
			"Structural Analysis",
			"Transportation",
		],
		labs: 6,
		faculty: 20,
		students: 280,
		recentNews:
			"Department partners with Municipal Corporation for Smart City Initiative",
	},
	{
		name: "Electrical Engineering",
		established: 2001,
		hod: "Dr. Amit Kumar",
		hodQualification: "Ph.D. in Power Systems, IIT Kharagpur",
		achievements: [
			"Renewable Energy Champion",
			"Power Grid Excellence",
			"Energy Efficiency Award",
			"Innovation in Automation",
		],
		specializations: [
			"Renewable Energy",
			"Power Systems",
			"Control Systems",
			"Electric Vehicles",
		],
		labs: 7,
		faculty: 18,
		students: 240,
		recentNews: "Solar Power Research Project receives government funding",
	},
	{
		name: "Medical Sciences",
		established: 2005,
		hod: "Dr. Kavita Reddy",
		hodQualification: "M.D. in Internal Medicine, AIIMS Delhi",
		achievements: [
			"Medical Education Excellence",
			"Research in Public Health",
			"Community Service Award",
			"Clinical Training Excellence",
		],
		specializations: [
			"Internal Medicine",
			"Surgery",
			"Pediatrics",
			"Community Medicine",
		],
		labs: 15,
		faculty: 35,
		students: 200,
		recentNews:
			"Medical college receives accreditation for new specialization programs",
	},
];

const Departments = () => {
	const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
	return (
		<Layout>
			<div className="min-h-screen py-20">
				{/* Hero Section */}
				<section className="bg-gradient-to-r from-primary/10 to-primary-light/10 py-16 mb-12">
					<div className="container mx-auto px-4 text-center">
						<h1 className="text-4xl md:text-5xl font-bold mb-6">
							Our{" "}
							<span className="text-gradient">Departments</span>
						</h1>
						<p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
							Leading academic departments with distinguished faculty and
							world-class research facilities
						</p>

						<div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
							<div className="bg-background rounded-lg p-4 shadow-sm">
								<div className="text-2xl font-bold text-primary">
									{departments.length}
								</div>
								<div className="text-sm text-muted-foreground">
									Departments
								</div>
							</div>
							<div className="bg-background rounded-lg p-4 shadow-sm">
								<div className="text-2xl font-bold text-primary">
									{departments.reduce((acc, dept) => acc + dept.faculty, 0)}
								</div>
								<div className="text-sm text-muted-foreground">
									Faculty Members
								</div>
							</div>
							<div className="bg-background rounded-lg p-4 shadow-sm">
								<div className="text-2xl font-bold text-primary">
									{departments.reduce((acc, dept) => acc + dept.students, 0)}
								</div>
								<div className="text-sm text-muted-foreground">
									Students
								</div>
							</div>
							<div className="bg-background rounded-lg p-4 shadow-sm">
								<div className="text-2xl font-bold text-primary">
									{departments.reduce((acc, dept) => acc + dept.labs, 0)}
								</div>
								<div className="text-sm text-muted-foreground">
									Research Labs
								</div>
							</div>
						</div>
					</div>
				</section>

				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{departments.map((dept, index) => (
							<div key={index} className="card-university">
								{/* Department Header */}
								<div className="flex items-start justify-between mb-6">
									<div className="flex items-center space-x-3">
										<div className="p-3 bg-primary/10 rounded-lg">
											<GraduationCap className="h-6 w-6 text-primary" />
										</div>
										<div>
											<h3 className="text-xl font-semibold text-primary">
												{dept.name}
											</h3>
											<div className="flex items-center space-x-2 text-sm text-muted-foreground">
												<Calendar className="h-4 w-4" />
												<span>Established {dept.established}</span>
											</div>
										</div>
									</div>
								</div>

								{/* Head of Department */}
								<div className="mb-6 p-4 bg-accent/30 rounded-lg">
									<div className="flex items-center space-x-3 mb-2">
										<Users className="h-5 w-5 text-primary" />
										<h4 className="font-semibold">Head of Department</h4>
									</div>
									<p className="font-medium text-foreground">{dept.hod}</p>
									<p className="text-sm text-muted-foreground">
										{dept.hodQualification}
									</p>
								</div>

								{/* Department Stats */}
								<div className="grid grid-cols-3 gap-4 mb-6">
									<div className="text-center">
										<div className="text-lg font-bold text-primary">
											{dept.faculty}
										</div>
										<div className="text-xs text-muted-foreground">
											Faculty
										</div>
									</div>
									<div className="text-center">
										<div className="text-lg font-bold text-primary">
											{dept.students}
										</div>
										<div className="text-xs text-muted-foreground">
											Students
										</div>
									</div>
									<div className="text-center">
										<div className="text-lg font-bold text-primary">
											{dept.labs}
										</div>
										<div className="text-xs text-muted-foreground">
											Labs
										</div>
									</div>
								</div>

								{/* Specializations */}
								<div className="mb-6">
									<h4 className="font-semibold mb-3 flex items-center">
										<BookOpen className="h-4 w-4 mr-2 text-primary" />
										Specializations
									</h4>
									<div className="flex flex-wrap gap-2">
										{dept.specializations.map((spec, specIndex) => (
											<span
												key={specIndex}
												className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
											>
												{spec}
											</span>
										))}
									</div>
								</div>

								{/* Achievements */}
								<div className="mb-6">
									<h4 className="font-semibold mb-3 flex items-center">
										<Award className="h-4 w-4 mr-2 text-primary" />
										Key Achievements
									</h4>
									<div className="space-y-2">
										{dept.achievements
											.slice(0, 3)
											.map((achievement, achIndex) => (
												<div
													key={achIndex}
													className="flex items-center space-x-2"
												>
													<Star className="h-3 w-3 text-primary" />
													<span className="text-sm text-muted-foreground">
														{achievement}
													</span>
												</div>
											))}
									</div>
								</div>

								{/* Recent News */}
								<div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
									<h4 className="font-semibold mb-2 text-green-800 dark:text-green-400">
										Recent News
									</h4>
									<p className="text-sm text-green-700 dark:text-green-300">
										{dept.recentNews}
									</p>
								</div>

								{/* Action Buttons */}
								<div className="flex gap-3">
									<Button
										variant="outline"
										size="sm"
										className="flex-1"
										onClick={() =>
											setExpandedIndex(
												expandedIndex === index ? null : index
											)
										}
									>
										{expandedIndex === index
											? "Hide Details"
											: "View Details"}
									</Button>
									<Link to="/contact" className="flex-1">
										<Button size="sm" className="btn-university w-full">
											Contact Department
										</Button>
									</Link>
								</div>

								{/* Expanded Details Panel */}
								{expandedIndex === index && (
									<div className="mt-4 p-4 bg-accent/10 border border-border rounded-lg">
										<h4 className="font-semibold mb-2">
											About {dept.name}
										</h4>
										<p className="text-sm text-muted-foreground mb-3">
											{dept.recentNews}
										</p>

										<div className="grid grid-cols-3 gap-4 mb-3">
											<div className="text-center">
												<div className="font-semibold text-primary">
													{dept.faculty}
												</div>
												<div className="text-xs text-muted-foreground">
													Faculty
												</div>
											</div>
											<div className="text-center">
												<div className="font-semibold text-primary">
													{dept.students}
												</div>
												<div className="text-xs text-muted-foreground">
													Students
												</div>
											</div>
											<div className="text-center">
												<div className="font-semibold text-primary">
													{dept.labs}
												</div>
												<div className="text-xs text-muted-foreground">
													Labs
												</div>
											</div>
										</div>

										<div className="mb-3">
											<h5 className="font-medium mb-2">HOD</h5>
											<div className="text-sm font-medium">
												{dept.hod}
											</div>
											<div className="text-xs text-muted-foreground">
												{dept.hodQualification}
											</div>
										</div>

										<div className="mb-3">
											<h5 className="font-medium mb-2">
												Full Achievements
											</h5>
											<ul className="list-disc pl-5 text-sm text-muted-foreground">
												{dept.achievements.map((a, i) => (
													<li key={i}>{a}</li>
												))}
											</ul>
										</div>

										<div className="flex gap-2">
											<Link to="/admission">
												<Button size="sm" className="btn-university">
													Apply Now
												</Button>
											</Link>
											<Button variant="outline" size="sm">
												Request Info
											</Button>
										</div>
									</div>
								)}
							</div>
						))}
					</div>

					{/* Call to Action */}
					<div className="mt-16 text-center">
						<div className="bg-gradient-to-r from-primary/10 to-primary-light/10 rounded-2xl p-8 md:p-12">
							<h3 className="text-2xl md:text-3xl font-bold mb-4">
								Interested in Joining Our Faculty?
							</h3>
							<p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
								We're always looking for distinguished academics and researchers
								to join our team.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Button size="lg" className="btn-university">
									Faculty Positions
								</Button>
								<Button
									variant="outline"
									size="lg"
									className="btn-university-outline"
								>
									Research Opportunities
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Departments;