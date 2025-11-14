import { Code2 } from "lucide-react"
import Image from "next/image"
import { CtaButtons } from "./cta-buttons"
import featurespreview from "@/public/assets//features-banner.svg"
import layout from "@/public/assets//layout.svg"
import fig from "@/public/assets//fig.svg"
import theme from "@/public/assets//theme.svg"
import stylecustomization from "@/public/assets//style-customization-banner.svg"

interface FeatureItem {
  icon: any
  description: string
}

interface FeatureSectionProps {
  title: string
  description?: string
  features: FeatureItem[]
  imageSrc: any
  imageAlt: string
  reverse?: boolean
}

const FeatureSection = ({ 
  title, 
  description, 
  features,
  imageSrc, 
  imageAlt, 
  reverse }: FeatureSectionProps) => {
  return (
    <div className="grid grid-cols-1 bg-[#F3F4F6] md:grid-cols-2 gap-12 items-center pl-12 pr-5 mb-20">
      <div className={reverse ? 'order-2 md:order-2' : ''}>
        <h3 className="text-4xl font-medium text-gray-900 mb-6">{title}</h3>
        {description && <p className="text-gray-600 max-w-xl mb-6">{description}</p>}
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="w-10 h-10 p-1.5 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                <Image src={feature.icon} width={100} height={100} alt="Feature icon"/>
              </div>
              <div>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        <CtaButtons btnText="Buy now - One time" pText="Preview -" spanText="Figma" className="mt-8" />
      </div>
      <div className={`py-5 ${reverse ? 'order-1 md:order-1' : ''}`}>
        <div className={reverse ? '' : 'bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl aspect-square flex items-center justify-center'}>
          <div className={reverse ? 'rounded-2xl p-8 aspect-square flex items-center justify-center' : ''}>
            <Image src={imageSrc} width={100} height={100} alt={imageAlt} className="h-full w-full"/>
          </div>
        </div>
      </div>
    </div>
  )
};

export const FeaturesSection = () => {
  const figmaFeatures = [
    {
      icon: fig,
      description: "Built with Figma's latest and coolest features to make your workflow smarter and faster."
    },
    {
      icon: layout,
      description: "Fully compatible with Auto Layout 5.0 across all pages, components, and UI kits."
    },
    {
      icon: theme,
      description: "Switch between Light and Dark modes effortlessly with Figma’s variables for every UI component and block, all in one click."
    }
  ]

  const styleFeatures = [
    {
      icon: layout,
      description: "A precise, versatile, and fully scalable typography system—easily adjustable with a single click from variables panel."
    },
    {
      icon: layout,
      description: "Vibrant color palette with 253+ prebuilt colors, extensive shades, and variables fully compatible with Tailwind CSS."
    },
    {
      icon: layout,
      description: "Seamless shadow and blur styles designed to ensure consistency across all your designs."
    }
  ]

  return (
    <section className="py-20 max-w-7xl border-t-1 mx-auto px-6">
      <div className="mb-12">
        <div className="text-gray-500 text-base flex justify-center rounded-md gap-1 border w-42 mb-3">
          <Code2/>Why Choose us?
        </div>
        <h2 className="text-3xl md:text-4xl max-w-xl font-bold text-gray-900 mb-4">
          Smart, Collaborative & Built for Modern Designers
        </h2>
        <p className="text-gray-600 max-w-xl">
          From smart components to real-time updates, everything works together to keep your team in sync.
        </p>
      </div>

      <FeatureSection
        title="Built with Figma's latest features"
        features={figmaFeatures}
        imageSrc={featurespreview}
        imageAlt="Feature Preview"
      />

      <FeatureSection
        title="Style customization made simple"
        features={styleFeatures}
        imageSrc={stylecustomization}
        imageAlt="Style Customization Preview"
        reverse={true}
      />
    </section>
  )
};