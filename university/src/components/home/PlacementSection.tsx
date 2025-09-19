import { Button } from "@/components/ui/button";
import statPackage from "@/assets/stat-package.svg";
import statPlacement from "@/assets/stat-placement.svg";
import statRecruiters from "@/assets/stat-recruiters.svg";
import statSuccess from "@/assets/stat-success.svg";
import student1 from "@/assets/student-1.svg";
import student2 from "@/assets/student-2.svg";
import student3 from "@/assets/student-3.svg";

const placementStats = [
	{
		image: statPackage,
		title: "Average Package",
		value: "50 LPA",
		description: "Industry-leading compensation packages",
	},
	{
		image: statPlacement,
		title: "Placement Rate",
		value: "95%",
		description: "Students placed in top companies",
	},
	{
		image: statRecruiters,
		title: "Top Recruiters",
		value: "500+",
		description: "Leading companies partner with us",
	},
	{
		image: statSuccess,
		title: "Success Stories",
		value: "10,000+",
		description: "Alumni excelling globally",
	},
];

const topPlacements = [
	{
		name: "Arjun Sharma",
		rollNo: "TT21CS001",
		department: "Computer Science",
		company: "Google",
		package: "85 LPA",
		image: student1,
	},
	{
		name: "Priya Patel",
		rollNo: "TT21EC002",
		department: "Electronics",
		company: "Microsoft",
		package: "75 LPA",
		image: student2,
	},
	{
		name: "Rohit Kumar",
		rollNo: "TT21ME003",
		department: "Mechanical",
		company: "Tesla",
		package: "80 LPA",
		image: student3,
	},
];

export function PlacementSection() {
	return (
		<section className="py-20">
			<div className="container mx-auto px-4">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Outstanding{" "}
						<span className="text-gradient">Placements</span>
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Our students consistently secure positions at the world's leading
						companies
					</p>
				</div>

				{/* Placement Statistics */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
					{placementStats.map((stat, index) => (
						<div
							key={index}
							className="card-university group cursor-pointer text-center"
							style={{ animationDelay: `${index * 0.1}s` }}
						>
							<div className="flex justify-center mb-4">
								<div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors flex items-center justify-center">
									<img
										src={stat.image}
										alt={stat.title}
										className="h-6 w-6 object-contain"
									/>
								</div>
							</div>
							<div className="text-3xl font-bold text-primary mb-2">
								{stat.value}
							</div>
							<h3 className="font-semibold mb-2">{stat.title}</h3>
							<p className="text-sm text-muted-foreground">
								{stat.description}
							</p>
						</div>
					))}
				</div>

				{/* Top Placements Showcase */}
				<div className="bg-accent/30 rounded-2xl p-8">
					<h3 className="text-2xl font-bold text-center mb-8">
						Recent Success Stories
					</h3>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{topPlacements.map((student, index) => (
							<div
								key={index}
								className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-2"
							>
								<div className="flex items-center space-x-4 mb-4">
									{/* Student image card */}
									<div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-border">
										<img
											src={student.image}
											alt={student.name}
											className="w-full h-full object-cover"
										/>
									</div>
									<div>
										<h4 className="font-semibold text-foreground">
											{student.name}
										</h4>
										<p className="text-sm text-muted-foreground">
											{student.rollNo}
										</p>
									</div>
								</div>

								<div className="space-y-2">
									<div className="flex justify-between">
										<span className="text-sm text-muted-foreground">
											Department:
										</span>
										<span className="text-sm font-medium">
											{student.department}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-sm text-muted-foreground">
											Company:
										</span>
										<span className="text-sm font-medium text-primary">
											{student.company}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-sm text-muted-foreground">
											Package:
										</span>
										<span className="text-sm font-bold text-green-600">
											{student.package}
										</span>
									</div>
								</div>
							</div>
						))}
					</div>

					<div className="text-center mt-8">
						<Button className="btn-university">View All Placements</Button>
					</div>
				</div>
			</div>
		</section>
	);
}