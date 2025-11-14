import { ChevronRight } from "lucide-react"
import Image from "next/image"
import { CtaButtons } from "./cta-buttons"
import toolkitpreview from "@/public/assets//toolkit-preview.svg"
import trustedcompanies from "@/public/assets//trusted-companies.svg"

export const HeroSection = () => {
  return (
    <section className="px-6 py-20 max-w-7xl mx-auto">
      <div className="bg-cover object-scale-down bg-center pt-24 mb-16 -mx-6 px-6" style={{ backgroundImage: `url('/assets/hero-bg.svg')` }}>
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#FFFFFF] border-1 border-gray-100 font-medium text-gray-600 px-2 rounded-full text-sm font-medium mb-6">
            <Image src="/assets/avatar-group.svg" width={80} height={80} alt="logo" className="w-20 h-10" />
            Used by 65,000+ Designers worldwide <span className="border rounded-xl px-1.5"><ChevronRight className="text-gray-400 w-5"/></span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            The Ultimate UI Library and Design System for Figma
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            A complete toolkit for modern designers — 600+ functional Figma UI components for landing pages, e-commerce, dashboards, and more. Boost your workflow
  and creativity with our product.
          </p>

          <CtaButtons btnText="Buy now - One time" pText="Preview -" spanText="Figma" className="justify-center flex-wrap" />
        </div>
      </div>

      <div className="relative">
        <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl p-8 shadow-xl border border-gray-200">
          <div className="aspect-video bg-white rounded-lg shadow-inner flex items-center justify-center">
            <div className="text-center text-gray-400">
              <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                <Image 
                  src={toolkitpreview} 
                  width={100} 
                  height={100} 
                  alt="Toolkit Preiview" 
                  className="w-full h-full pointer-events-none"/>
              </div>
            </div>
          </div>
        </div>
      </div>

       <div className="mt-16 flex items-center border-t-1 border-b-1 text-center">
        <p className="text-sm text-gray-500 mb-6">Trusted by 5000+ individuals & companies of all sizes</p>
        <div className="flex items-center justify-center gap-8 flex-wrap opacity-60">
          <Image src={trustedcompanies} width={100} height={100} alt="Trusted Companies" className="w-full h-full"/>
        </div>
      </div>
    </section>
  )
};