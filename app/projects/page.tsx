// app/projects/page.tsx

"use client"

// Framer Motion and React imports
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'

// Import other necessary components and types
import ConstellationBackground from "@/components/ConstellationBackground"
import NavigationButton from '@/components/NavigationButton'
import SocialLinksWidget from "@/components/SocialLinksWidget"
import ChatWidget from "@/components/ChatWidget"
import OfferForm from "@/components/OfferForm"
import { FaArrowRight } from 'react-icons/fa'

// Project data and types
interface Project {
  id: number
  title: string
  description: string
  images: string[]
}

const projects: Project[] = [
  { 
    id: 1, 
    title: "Autoparsinta", 
    description: 'A web application for a car service business, built using modern web technologies. It is developed using React and TypeScript for the frontend, ensuring type safety and component reusability. The user interface is implemented with Shadcn-ui, a collection of accessible and reusable UI components, styled with Tailwind CSS for responsiveness and customization. The application utilizes Vite as a build tool, providing fast development and optimized production builds. It includes multi-language support, offering content in Finnish, English, Arabic, and Swedish, and is configured for deployment on Vercel. The application handles google maps widget, providing interactive maps for location tracking and direction finding and has a review widget as well.',
    images: [
      "/AutoparsintaAfter/Main.png",
      "/AutoparsintaAfter/2.png",
      "/AutoparsintaAfter/3.png",
      "/AutoparsintaBefore/Main.png",
      "/AutoparsintaBefore/1.png"
    ]
  },
  { 
    id: 2, 
    title: "Tinderizzer",
    description: 'An AI-powered dating coach designed to help craft the perfect messages for online dating. Leverages Google Gemini API to analyze messages, provide feedback, and boost user\'s communication skills with a fun "Rizz Score".',
    images: [
      "/ReactScreen/Intro.png",
      "/ReactScreen/SignIn.png",
      "/ReactScreen/Chat1.png",
      "/ReactScreen/Chat2.png",
      "/ReactScreen/Chat3.png",
      "/ReactScreen/Chat4.png",
      "/ReactScreen/Profile.png",
      "/ReactScreen/Description.png",
      "/ReactScreen/Approach.png",
      "/ReactScreen/Upgrade.png", 
    ]
  },
  { 
    id: 3, 
    title: "PVLogix AI Assistant", 
    description: 'An intelligent document analysis assistant powered by Google\'s Gemini AI. Helps analyze and query PDF documents, providing structured answers and insights across multiple files.',
    images: [
      "/StreamlitScreen/Main.png",
      "/StreamlitScreen/Upload.png",
      "/StreamlitScreen/Process.png",
      "/StreamlitScreen/AIResponse.png",
      "/StreamlitScreen/Delete.png"
    ]
  },
  { 
    id: 4, 
    title: "My Introduction", 
    description: 'Just me',
    images: [
      "/MyIntroduction/me.png",
      ]
  },
]

// Define consistent project styles with consistent, descriptive naming
const PROJECT_STYLES = {
  PVLOGIX: {
    bgColor: 'bg-gradient-to-br from-blue-900/50 via-blue-800/50 to-blue-700/50',
    titleColor: 'text-blue-300',
    descColor: 'text-blue-100',
    borderColor: 'border-blue-600',
    hoverEffect: 'hover:skew-y-3 hover:shadow-blue-200/50',
    gridLayout: 'grid grid-cols-1 md:grid-cols-2 gap-6',
    thumbnailLayout: 'flex space-x-4 overflow-x-auto py-4 px-2 scrollbar-thin scrollbar-thumb-blue-500/50 scrollbar-track-blue-900/50'
  },
}

// Matrix-like code animation component
const MatrixCodeBackground = () => {
  // Use a consistent seed for random generation to prevent hydration errors
  const codeLines = Array.from({ length: 50 }, (_, index) => {
    // Use a deterministic method to generate "random" binary strings
    const seed = index * 1.618; // Using golden ratio as a seed
    const randomBinary = Math.abs(Math.sin(seed)).toString(2).slice(2, 12).padStart(10, '0')
    return randomBinary
  })

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {codeLines.map((codeLine, index) => (
        <div 
          key={index} 
          className="absolute text-green-500/30 text-xs font-mono opacity-50 animate-matrix-fall"
          style={{
            left: `${(index * 7.5) % 100}%`, // Deterministic positioning
            animationDelay: `${index * 0.2}s`, // Consistent delay
            animationDuration: `${5 + (index % 3)}s` // Consistent duration
          }}
        >
          {codeLine}
        </div>
      ))}
    </div>
  )
}

// Parallax Separator Component
const ParallaxSeparator = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  // Create consistent random code lines using a deterministic method
  const codeLines = Array.from({ length: 20 }, (_, index) => {
    // Use a consistent seed based on the index to generate the same "random" binary string
    const seed = index * 1.618; // Golden ratio as a consistent seed
    const randomBinary = Math.abs(Math.sin(seed)).toString(2).slice(2, 12).padStart(10, '0')
    return randomBinary
  })

  // Create parallax transformations
  const translateY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

  return (
    <motion.div 
      className="w-full h-[200px] relative overflow-hidden my-16"
      style={{ 
        translateY, 
        scale, 
        opacity 
      }}
    >
      {/* Gradient background with subtle movement */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 via-purple-900/50 to-green-900/50 blur-2xl animate-slow-pulse"></div>
      
      {/* Floating code-like elements */}
      <div className="absolute inset-0 pointer-events-none">
        {codeLines.map((codeLine, index) => (
          <motion.div
            key={index}
            className="absolute text-green-500/20 font-mono text-xs"
            style={{
              left: `${(index * 7.5) % 100}%`, // Deterministic positioning
              top: `${(index * 5.5) % 100}%`, // Consistent vertical placement
              rotate: `${(index * 18) % 360}deg`, // Consistent rotation
              scale: useTransform(scrollYProgress, [0, 1], [0.5, 1.5])
            }}
          >
            {codeLine}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// Separate component for project image display
const ProjectImageDisplay = ({ 
  project, 
  selectedImages, 
  handleFirstImage, 
  handleThumbnailClick 
}: { 
  project: Project, 
  selectedImages: {[key: number]: string}, 
  handleFirstImage: (projectId: number, imageSrc: string) => void,
  handleThumbnailClick: (projectId: number, imageSrc: string) => void 
}) => {
  // Determine project-specific styles
  const projectStyle = PROJECT_STYLES.PVLOGIX

  // Render Autoparsinta with Before/After layout
  if (project.id === 1) {
    return (
      <div className={`w-full ${projectStyle.bgColor} rounded-2xl overflow-hidden shadow-2xl p-8 relative`}>
        <h2 className={`text-4xl font-bold ${projectStyle.titleColor} mb-6`}>{project.title}</h2>
        <p className={`${projectStyle.descColor} mb-8`}>{project.description}</p>
        
        {/* Main Image Display */}
        <div className="project-image-container min-h-[600px] flex justify-center items-center mb-8">
          <Image
            src={selectedImages[project.id] || project.images[0]}
            alt={project.title}
            width={2400}
            height={1350}
            className="project-image object-contain max-w-full max-h-full rounded-lg shadow-xl"
            priority
          />
        </div>

        <div className={projectStyle.gridLayout}>
          {/* After Section */}
          <div className="flex flex-col">
            <div className="mb-4">
              <h3 className="text-2xl font-semibold text-green-400">After</h3>
              <p className="text-gray-400">Improved Project State</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.slice(0, 3).map((image, imgIndex) => (
                <Image
                  key={imgIndex}
                  src={image}
                  alt={`${project.title} After ${imgIndex + 1}`}
                  width={400}
                  height={300}
                  className={`rounded-lg shadow-lg transform transition cursor-pointer 
                    ${projectStyle.hoverEffect} 
                    ${selectedImages[project.id] === image ? 'border-4 border-green-600' : 'border-2 border-green-800 opacity-70'}`}
                  onClick={() => handleFirstImage(project.id, image)}
                  onMouseEnter={() => handleThumbnailClick(project.id, image)}
                />
              ))}
            </div>
          </div>
          
          {/* Before Section */}
          <div className="flex flex-col">
            <div className="mb-4">
              <h3 className="text-2xl font-semibold text-red-400">Before</h3>
              <p className="text-gray-400">Initial Project State</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.slice(3).map((image, imgIndex) => (
                <Image
                  key={imgIndex}
                  src={image}
                  alt={`${project.title} Before ${imgIndex + 1}`}
                  width={400}
                  height={300}
                  className={`rounded-lg shadow-lg transform transition cursor-pointer 
                    ${projectStyle.hoverEffect} 
                    ${selectedImages[project.id] === image ? 'border-4 border-red-600' : 'border-2 border-red-800 opacity-70'}`}
                  onClick={() => handleFirstImage(project.id, image)}
                  onMouseEnter={() => handleThumbnailClick(project.id, image)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render other projects with standard layout
  return (
    <div className={`w-full ${projectStyle.bgColor} rounded-2xl overflow-hidden shadow-2xl p-8 relative`}>
      {/* Matrix-like code background */}
      <MatrixCodeBackground />
      
      <div className="relative z-10">
        <h2 className={`text-4xl font-bold ${projectStyle.titleColor} mb-6`}>{project.title}</h2>
        <p className={`${projectStyle.descColor} mb-8`}>{project.description}</p>
        
        {/* Main Image Display */}
        <div className="project-image-container min-h-[600px] flex justify-center items-center mb-8">
          <Image
            src={selectedImages[project.id] || project.images[0]}
            alt={project.title}
            width={2400}
            height={1350}
            className="project-image object-contain max-w-full max-h-full rounded-lg shadow-xl"
            priority
          />
        </div>

        {/* Image Gallery */}
        <div className={projectStyle.thumbnailLayout}>
          {project.images.map((image, imgIndex) => (
            <Image
              key={imgIndex}
              src={image}
              alt={`${project.title} screenshot ${imgIndex + 1}`}
              width={200}
              height={150}
              className={`rounded-lg shadow-lg transform transition cursor-pointer flex-shrink-0
                ${projectStyle.hoverEffect} 
                ${selectedImages[project.id] === image 
                  ? `border-4 ${projectStyle.borderColor}` 
                  : `border-2 ${projectStyle.borderColor} opacity-70`}
                w-[200px] h-[150px] object-cover`}
              onClick={() => handleFirstImage(project.id, image)}
              onMouseEnter={() => handleThumbnailClick(project.id, image)}
            />
          ))}
        </div>

        {/* Testimonial Section */}
        {project.id === 2 && (
          <div className="mt-12 flex justify-center">
            <div className="max-w-4xl w-full">
              <h3 className={`text-2xl font-semibold ${projectStyle.titleColor} mb-6 text-center`}>
                Testimonial
              </h3>
              <div className="bg-blue-900/30 rounded-2xl p-6 shadow-lg">
                <Image
                  src="/testimonials/Tinderizzer.png"
                  alt="Tinderizzer Testimonial"
                  width={1200}
                  height={600}
                  className="w-full h-auto rounded-xl shadow-xl object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Main Projects Page Component
export default function ProjectsPage() {
  // Track scroll progress for background animation and parallax
  const { scrollYProgress } = useScroll()
  
  // Manage selected images for each project
  const [selectedImages, setSelectedImages] = useState<{[key: number]: string}>({})

  // Update selected image on hover
  const handleThumbnailClick = (projectId: number, imageSrc: string) => {
    setSelectedImages(prev => ({
      ...prev,
      [projectId]: imageSrc
    }))
  }

  // Update selected image on click
  const handleFirstImage = (projectId: number, imageSrc: string) => {
    setSelectedImages(prev => ({
      ...prev,
      [projectId]: imageSrc
    }))
  }
  
  return (
    <div className="min-h-screen relative">
      <ConstellationBackground scrollYProgress={scrollYProgress} />
      
      {/* Fixed widgets */}
      <div className="fixed top-4 right-4 md:top-8 md:right-8 z-50 flex space-x-4">
        <SocialLinksWidget />
        <ChatWidget />
        <OfferForm />
      </div>
      
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <NavigationButton href="/" label="Main Page" />
        </div>
        
        <main className="relative z-10">
          {/* Page Title */}
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="tech-text text-4xl md:text-6xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-white drop-shadow-lg"
          >
            My Projects
          </motion.h1>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 gap-16 max-w-6xl mx-auto px-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="project-card flex flex-col items-center"
              >
                <ProjectImageDisplay 
                  project={project} 
                  selectedImages={selectedImages}
                  handleFirstImage={handleFirstImage}
                  handleThumbnailClick={handleThumbnailClick}
                />
                
                {/* Add Parallax Separator (except after the last project) */}
                {index < projects.length - 1 && (
                  <ParallaxSeparator scrollYProgress={scrollYProgress} />
                )}
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
