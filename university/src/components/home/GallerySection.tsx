import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import campusMain from "@/assets/campus-main.jpg";
import campusEngineering from "@/assets/campus-engineering.jpg";
import campusLibrary from "@/assets/campus-library.jpg";
import campusSports from "@/assets/campus-sports.jpg";
import campusHostel from "@/assets/campus-hostel.jpg";
import campusAuditorium from "@/assets/campus-auditorium.jpg";

const campusImages = [
	{
		id: 1,
		title: "Main Campus Building",
		description:
			"Our iconic main building housing administrative offices and lecture halls",
		image: campusMain,
	},
	{
		id: 2,
		title: "Engineering Block",
		description: "State-of-the-art laboratories and research facilities",
		image: campusEngineering,
	},
	{
		id: 3,
		title: "Library Complex",
		description:
			"Modern library with extensive digital and physical resources",
		image: campusLibrary,
	},
	{
		id: 4,
		title: "Sports Complex",
		description: "World-class sports facilities for student recreation",
		image: campusSports,
	},
	{
		id: 5,
		title: "Hostel Facilities",
		description: "Comfortable accommodation with modern amenities",
		image: campusHostel,
	},
	{
		id: 6,
		title: "Auditorium",
		description: "Grand auditorium for events and convocations",
		image: campusAuditorium,
	},
];

export function GallerySection() {
	const [currentIndex, setCurrentIndex] = useState(0);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === campusImages.length - 1 ? 0 : prevIndex + 1
		);
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? campusImages.length - 1 : prevIndex - 1
		);
	};

	const currentImage = campusImages[currentIndex];

	return (
		<section className="py-20 bg-accent/20">
			<div className="container mx-auto px-4">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Campus{" "}
						<span className="text-gradient">Gallery</span>
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Explore our beautiful campus and world-class facilities
					</p>
				</div>

				<div className="relative max-w-6xl mx-auto">
					{/* Main Gallery Display */}
					<div className="relative rounded-2xl overflow-hidden shadow-lg">
						<img
							src={currentImage.image}
							alt={currentImage.title}
							className="univ-img w-full"
						/>

						{/* Overlay with content */}
						<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
							<div className="p-8 text-white">
								<h3 className="text-2xl font-bold mb-2">
									{currentImage.title}
								</h3>
								<p className="text-lg opacity-90">
									{currentImage.description}
								</p>
							</div>
						</div>

						{/* Navigation Buttons */}
						<Button
							variant="secondary"
							size="icon"
							className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background/90"
							onClick={prevSlide}
						>
							<ChevronLeft className="h-5 w-5" />
						</Button>

						<Button
							variant="secondary"
							size="icon"
							className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background/90"
							onClick={nextSlide}
						>
							<ChevronRight className="h-5 w-5" />
						</Button>
					</div>

					{/* Thumbnail Navigation */}
					<div className="flex justify-center mt-8 space-x-4 overflow-x-auto pb-4">
						{campusImages.map((image, index) => (
							<button
								key={image.id}
								onClick={() => setCurrentIndex(index)}
								className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
									index === currentIndex
										? "border-primary scale-110"
										: "border-transparent opacity-60 hover:opacity-80"
								}`}
							>
								<img
									src={image.image}
									alt={image.title}
									className="w-full h-full object-cover"
								/>
							</button>
						))}
					</div>

					{/* Progress Indicator */}
					<div className="flex justify-center mt-6 space-x-2">
						{campusImages.map((_, index) => (
							<div
								key={index}
								className={`h-2 rounded-full transition-all duration-300 ${
									index === currentIndex
										? "w-8 bg-primary"
										: "w-2 bg-muted-foreground/50"
								}`}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}