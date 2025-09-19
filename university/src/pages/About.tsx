import { Layout } from "@/components/Layout";
import { Award, Users, BookOpen, Trophy, Star, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import campusMain from "@/assets/campus-main.jpg";
import facilityBus from "@/assets/facility-bus.jpg";
import facilityCanteen from "@/assets/facility-canteen.jpg";
import facilityHostelRoom from "@/assets/facility-hostel-room.jpg";
import facilityIndoorSports from "@/assets/facility-indoor-sports.jpg";
import campusLibrary from "@/assets/campus-library.jpg";
import alumniRajesh from "@/assets/alumni-rajesh.jpg";
import alumniPriya from "@/assets/alumni-priya.jpg";
import alumniArjun from "@/assets/alumni-arjun.jpg";

const honors = [
	{
		title: "NIRF Ranking",
		value: "Top 50",
		description: "National Institutional Ranking Framework",
		icon: Trophy,
	},
	{
		title: "NAAC Grade",
		value: "A++",
		description: "Highest accreditation grade with 3.8/4.0 CGPA",
		icon: Award,
	},
	{
		title: "NBA Accreditation",
		value: "All Programs",
		description: "National Board of Accreditation certified",
		icon: Star,
	},
];

const facilities = [
	{
		title: "Bus Facilities",
		description:
			"Comfortable transportation with routes covering major city areas",
		image: facilityBus,
		features: ["AC Buses", "GPS Tracking", "Safe & Secure", "Multiple Routes"],
	},
	{
		title: "AC Canteen",
		description: "Hygienic food service with variety of cuisines",
		image: facilityCanteen,
		features: [
			"Multi-cuisine",
			"Nutritious Meals",
			"Affordable Prices",
			"24/7 Service",
		],
	},
	{
		title: "Hostel Accommodation",
		description: "Comfortable living spaces for outstation students",
		image: facilityHostelRoom,
		features: [
			"AC/Non-AC Options",
			"Wi-Fi Enabled",
			"Security",
			"Recreation Areas",
		],
	},
	{
		title: "Sports Facilities",
		description: "Comprehensive sports infrastructure",
		image: facilityIndoorSports,
		features: ["Indoor Courts", "Outdoor Fields", "Swimming Pool", "Gymnasium"],
	},
	{
		title: "Library Services",
		description: "Modern library with digital resources",
		image: campusLibrary,
		features: [
			"Digital Library",
			"Research Databases",
			"Study Spaces",
			"24/7 Access",
		],
	},
];

const alumni = [
	{
		name: "Dr. Rajesh Kumar",
		achievement: "NASA Scientist",
		quote:
			"TechTitans_6 shaped my scientific thinking and opened doors to infinite possibilities.",
		year: "Batch 2010",
		image: alumniRajesh,
	},
	{
		name: "Priya Sharma",
		achievement: "Google Software Engineer",
		quote:
			"The technical foundation I received here helped me excel in the tech industry.",
		year: "Batch 2015",
		image: alumniPriya,
	},
	{
		name: "Arjun Mehta",
		achievement: "Supreme Court Advocate",
		quote:
			"The legal education and ethics training prepared me for the highest courts.",
		year: "Batch 2012",
		image: alumniArjun,
	},
];

const About = () => {
	return (
		<Layout>
			<div className="min-h-screen">
				{/* Hero Section */}
				<section className="relative py-20 overflow-hidden">
					<div className="absolute inset-0">
						<img
							src={campusMain}
							alt="Campus"
							className="w-full h-full object-cover opacity-20"
						/>
						<div className="absolute inset-0 bg-primary/10"></div>
					</div>

					<div className="container mx-auto px-4 relative z-10">
						<div className="text-center max-w-4xl mx-auto">
							<h1 className="text-4xl md:text-5xl font-bold mb-6">
								About{" "}
								<span className="text-gradient">TechTitans_6</span> University
							</h1>
							<p className="text-xl text-muted-foreground leading-relaxed">
								Established in 1998, TechTitans_6 University has been a beacon of
								excellence in higher education, nurturing over 50,000 graduates who
								are making significant contributions globally.
							</p>
						</div>
					</div>
				</section>

				{/* Honors and Rankings */}
				<section className="py-20 bg-accent/20">
					<div className="container mx-auto px-4">
						<div className="text-center mb-16">
							<h2 className="text-3xl md:text-4xl font-bold mb-4">
								Honors &{" "}
								<span className="text-gradient">Rankings</span>
							</h2>
							<p className="text-lg text-muted-foreground">
								Recognized excellence in education and research
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							{honors.map((honor, index) => (
								<div key={index} className="card-feature text-center">
									<div className="flex justify-center mb-4">
										<div className="p-4 rounded-full bg-primary/10">
											<honor.icon className="h-8 w-8 text-primary" />
										</div>
									</div>
									<div className="text-3xl font-bold text-primary mb-2">
										{honor.value}
									</div>
									<h3 className="text-xl font-semibold mb-2">
										{honor.title}
									</h3>
									<p className="text-muted-foreground">
										{honor.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Facilities */}
				<section className="py-20">
					<div className="container mx-auto px-4">
						<div className="text-center mb-16">
							<h2 className="text-3xl md:text-4xl font-bold mb-4">
								World-Class{" "}
								<span className="text-gradient">Facilities</span>
							</h2>
							<p className="text-lg text-muted-foreground">
								Everything you need for a complete university experience
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{facilities.map((facility, index) => (
								<div key={index} className="card-university">
									{/* facility image (if present) */}
									{facility.image && (
										<div className="mb-4">
											<img
												src={facility.image}
												alt={facility.title}
												className="univ-img w-full rounded-lg shadow-sm"
											/>
										</div>
									)}
									<h3 className="text-xl font-semibold mb-3 text-primary">
										{facility.title}
									</h3>
									<p className="text-muted-foreground mb-4">
										{facility.description}
									</p>
									<div className="space-y-2">
										{facility.features.map((feature, fIndex) => (
											<div
												key={fIndex}
												className="flex items-center space-x-2"
											>
												<div className="w-2 h-2 bg-primary rounded-full"></div>
												<span className="text-sm">{feature}</span>
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Alumni Section */}
				<section className="py-20 bg-accent/20">
					<div className="container mx-auto px-4">
						<div className="text-center mb-16">
							<h2 className="text-3xl md:text-4xl font-bold mb-4">
								Distinguished{" "}
								<span className="text-gradient">Alumni</span>
							</h2>
							<p className="text-lg text-muted-foreground">
								Success stories that inspire future generations
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							{alumni.map((alum, index) => (
								<div key={index} className="card-feature">
									<div className="flex items-center space-x-4 mb-4">
										<div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center">
											{alum.image ? (
												<img
													src={alum.image}
													alt={alum.name}
													className="w-full h-full object-cover"
												/>
											) : (
												<div className="w-full h-full bg-primary/10 flex items-center justify-center">
													<Users className="h-8 w-8 text-primary" />
												</div>
											)}
										</div>
										<div>
											<h3 className="font-semibold text-lg">{alum.name}</h3>
											<p className="text-primary font-medium">
												{alum.achievement}
											</p>
											<p className="text-sm text-muted-foreground">
												{alum.year}
											</p>
										</div>
									</div>
									<blockquote className="text-muted-foreground italic">
										"{alum.quote}"
									</blockquote>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Vision & Mission */}
				<section className="py-20">
					<div className="container mx-auto px-4">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
							<div>
								<h2 className="text-3xl md:text-4xl font-bold mb-6">
									Our{" "}
									<span className="text-gradient">Vision & Mission</span>
								</h2>
								<div className="space-y-6">
									<div className="flex items-start space-x-4">
										<div className="p-2 bg-primary/10 rounded-lg">
											<Target className="h-6 w-6 text-primary" />
										</div>
										<div>
											<h3 className="text-xl font-semibold mb-2">Vision</h3>
											<p className="text-muted-foreground">
												To be a globally recognized university that transforms
												lives through innovative education, cutting-edge
												research, and holistic development.
											</p>
										</div>
									</div>
									<div className="flex items-start space-x-4">
										<div className="p-2 bg-primary/10 rounded-lg">
											<BookOpen className="h-6 w-6 text-primary" />
										</div>
										<div>
											<h3 className="text-xl font-semibold mb-2">Mission</h3>
											<p className="text-muted-foreground">
												To provide quality education, foster innovation, and
												develop ethical leaders who contribute meaningfully to
												society and the global community.
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className="relative">
								<img
									src={campusMain}
									alt="University Vision"
									className="univ-img w-full rounded-2xl shadow-lg"
								/>
							</div>
						</div>
					</div>
				</section>
			</div>
		</Layout>
	);
};

export default About;