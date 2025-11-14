import { Code2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import figmatemplate1 from "@/public/assets//template-1.svg";
import figmatemplate2 from "@/public/assets//template-2.svg";
import figmatemplate3 from "@/public/assets//template-3.svg";

const categories = ["All Templates", "Saas/IT", "Business", "E-commerce", "Dashboard"];

const templates = [
  { src: figmatemplate1, alt: "Template 1" },
  { src: figmatemplate2, alt: "Template 2" },
  { src: figmatemplate3, alt: "Template 3" }
];

export const TemplatesSection = () => {
  return (
    <section className="py-20">
      <div className="text-center w-2/4 mb-12">
        <div className="text-gray-500 text-base flex justify-center rounded-md gap-1 border w-32 mb-3">
          <Code2/>Templates
        </div>
        <h2 className="text-3xl md:text-4xl font-medium text-left text-gray-900 mb-4">
          Ready-to-use Figma templates for building websites faster.
        </h2>
        <p className="text-gray-600 max-w-2xl text-left">
          Choose from a collection of professionally crafted website templates
        </p>
      </div>

      <div className="max-w-7xl pt-5 pb-16 bg-gray-50 mx-auto px-6">
        <div className="flex items-center border-b-1 pb-5 justify-start gap-4 mb-8 flex-wrap">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-6 py-2 rounded-full font-medium text-sm transition ${
                index === 0
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {templates.map((template, index) => (
            <Image 
              key={index} 
              src={template.src} 
              width={100} 
              height={100} 
              alt={template.alt} 
              className="w-full h-full"
            />
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" className="px-8">
            Explore More
          </Button>
          <Button size="lg" className="bg-gray-900 hover:bg-gray-800 ml-4 px-8">
            Browse Templates
          </Button>
        </div>
      </div>
    </section>
  )
};