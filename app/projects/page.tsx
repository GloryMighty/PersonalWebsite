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

// Project data and types
interface Project {
  id: number
  title: string
  description: string
  images: string[]
  testimonialImage?: string  // Optional testimonial image
}

const projects: Project[] = [
  { 
    id: 1, 
    title: "Autoparsinta", 
    description: 'A web application for a car service business, built using modern web technologies. -React and Typescript for frontend, ensuring type safety and component reusability. The user interface is implemented with Shadcn-ui, styled with Tailwind CSS for responsiveness and customization. The application utilizes Vite as a build tool, providing fast development and optimized production builds. It includes multi-language support, offering content in Finnish, English, Arabic, and Swedish, and is configured for deployment on hosting platforms. The application handles google maps widget, providing interactive maps for location tracking and direction finding and has a review widget as well.',
    images: [
      "/AutoparsintaAfter/Main.png",
      "/AutoparsintaAfter/2.png",
      "/AutoparsintaAfter/3.png",
      "/AutoparsintaBefore/Main.png",
      "/AutoparsintaBefore/1.png"
    ],
    testimonialImage: "/testimonials/Autoparsinta.png"
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
    ],
    testimonialImage: "/testimonials/Tinderizzer.png"
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
    ],
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
    bgColor: 'bg-gray-900/50',
    titleColor: 'text-gray-200',
    descColor: 'text-gray-300',
    borderColor: 'border-gray-600',
    hoverEffect: 'hover:skew-y-3 hover:shadow-gray-200/50',
    gridLayout: 'grid grid-cols-1 md:grid-cols-2 gap-6',
    thumbnailLayout: 'flex space-x-4 overflow-x-auto py-4 px-2 scrollbar-thin scrollbar-thumb-gray-500/50 scrollbar-track-gray-900/50'
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
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 via-gray-800/50 to-gray-700/50 blur-2xl animate-slow-pulse"></div>
      
      {/* Floating code-like elements */}
      <div className="absolute inset-0 pointer-events-none">
        {codeLines.map((codeLine, index) => (
          <motion.div
            key={index}
            className="absolute text-gray-500/20 font-mono text-xs"
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

  // Track current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Function to navigate images
  const navigateImage = (direction: 'prev' | 'next') => {
    const images = project.images
    const newIndex = direction === 'prev' 
      ? (currentImageIndex - 1 + images.length) % images.length
      : (currentImageIndex + 1) % images.length
    
    setCurrentImageIndex(newIndex)
    handleFirstImage(project.id, images[newIndex])
  }

  // Render Autoparsinta with Before/After layout
  if (project.id === 1) {
    console.log(`Rendering project ${project.title}`)
    console.log(`Testimonial image path: ${project.testimonialImage}`)
    
    return (
      <div className={`w-full ${projectStyle.bgColor} rounded-2xl overflow-hidden shadow-2xl p-8 relative`}>
        {/* Testimonial Section */}
        {project.testimonialImage && (
          <div className="absolute top-48 right-0 transform w-60 bg-gray-900/30 rounded-xl p-2 shadow-lg z-10">
            <Image
              src={project.testimonialImage}
              alt={`${project.title} Testimonial`}
              width={375}
              height={188}
              className="w-full h-auto rounded-lg shadow-md object-contain"
              unoptimized  // Add this to bypass Next.js image optimization for debugging
            />
          </div>
        )}
        
        <div className="pt-16 flex">
          <div className="w-3/5 pr-8">
            <h2 className={`text-4xl font-bold ${projectStyle.titleColor} mb-6`}>{project.title}</h2>
            <p className={`${projectStyle.descColor} mb-8 text-lg leading-relaxed`}>{project.description}</p>
          </div>
          <div className="w-2/5">
            {/* Placeholder for future content or additional information */}
          </div>
        </div>

        {/* Main Image Display with Navigation */}
        <div className="project-image-container min-h-[600px] flex justify-center items-center mb-8 relative group">
          <div className="absolute inset-0 bg-gray-800/20 rounded-3xl -z-10 blur-sm group-hover:blur-0 transition-all duration-300"></div>
          <div className="border-8 border-gray-700/50 rounded-3xl p-4 shadow-2xl shadow-gray-900/50 group-hover:shadow-gray-700/50 transition-all duration-300">
            <button 
              onClick={() => navigateImage('prev')} 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 
                bg-black/20 text-white/80 p-2 rounded-full 
                opacity-0 group-hover:opacity-100 
                transition-all duration-300 ease-in-out 
                hover:bg-black/50"
            >
              ←
            </button>
            <Image
              src={selectedImages[project.id] || project.images[currentImageIndex]}
              alt={project.title}
              width={2400}
              height={1350}
              className="project-image object-contain max-w-full max-h-full rounded-xl shadow-xl group"
              priority
            />
            <button 
              onClick={() => navigateImage('next')} 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 
                bg-black/20 text-white/80 p-2 rounded-full 
                opacity-0 group-hover:opacity-100 
                transition-all duration-300 ease-in-out 
                hover:bg-black/50"
            >
              →
            </button>
          </div>
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
  if (project.id === 2) {
    return (
      <div className={`w-full ${projectStyle.bgColor} rounded-2xl overflow-hidden shadow-2xl p-8 relative`}>
        {/* Matrix-like code background */}
        <MatrixCodeBackground />
        
        <div className="relative z-10">
          {/* Testimonial Section */}
          {project.testimonialImage && (
            <div className="absolute top-48 right-0 transform -translate-x-1/2 -translate-y-1/2 w-60 bg-gray-900/30 rounded-xl p-2 shadow-lg z-10">
              <Image
                src={project.testimonialImage}
                alt={`${project.title} Testimonial`}
                width={375}
                height={188}
                className="w-full h-auto rounded-lg shadow-md object-contain"
              />
            </div>
          )}

          <div className="pt-16 flex">
            <div className="w-3/5 pr-8">
              <h2 className={`text-4xl font-bold ${projectStyle.titleColor} mb-6`}>{project.title}</h2>
              <p className={`${projectStyle.descColor} mb-8 text-lg leading-relaxed`}>{project.description}</p>
            </div>
            <div className="w-2/5">
              {/* Placeholder for future content or additional information */}
            </div>
          </div>

          {/* Main Image Display with Navigation */}
          <div className="project-image-container min-h-[600px] flex justify-center items-center mb-8 relative group">
            <div className="absolute inset-0 bg-gray-800/20 rounded-3xl -z-10 blur-sm group-hover:blur-0 transition-all duration-300"></div>
            <div className="border-8 border-gray-700/50 rounded-3xl p-4 shadow-2xl shadow-gray-900/50 group-hover:shadow-gray-700/50 transition-all duration-300">
              <button 
                onClick={() => navigateImage('prev')} 
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 
                  bg-black/20 text-white/80 p-2 rounded-full 
                  opacity-80 group-hover:opacity-100 
                  transition-all duration-300 ease-in-out 
                  hover:bg-black/50"
              >
                ←
              </button>
              <Image
                src={selectedImages[project.id] || project.images[currentImageIndex]}
                alt={project.title}
                width={2400}
                height={1350}
                className="project-image object-contain max-w-full max-h-full rounded-xl shadow-xl group"
                priority
              />
              <button 
                onClick={() => navigateImage('next')} 
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 
                  bg-black/20 text-white/80 p-2 rounded-full 
                  opacity-80 group-hover:opacity-100 
                  transition-all duration-300 ease-in-out 
                  hover:bg-black/50"
              >
                →
              </button>
            </div>
          </div>

          {/* Image Gallery with Smooth Collision Effect */}
          <div className={`${projectStyle.thumbnailLayout} space-x-4 py-4 px-2 
            scroll-smooth snap-x snap-mandatory overflow-x-auto 
            hover:scrollbar-thumb-gray-600/50 scrollbar-thin scrollbar-track-transparent`}>
            {project.images.map((image, imgIndex) => (
              <motion.div
                key={imgIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.3, 
                  type: "spring", 
                  stiffness: 100 
                }}
                viewport={{ once: true, amount: 0.5 }}
                className={`flex-shrink-0 snap-center 
                  ${selectedImages[project.id] === image 
                    ? `border-4 ${projectStyle.borderColor}` 
                    : `border-2 ${projectStyle.borderColor} opacity-70`}
                  rounded-lg shadow-lg transform transition 
                  ${projectStyle.hoverEffect} 
                  w-[200px] h-[150px] overflow-hidden`}
              >
                <Image
                  src={image}
                  alt={`${project.title} screenshot ${imgIndex + 1}`}
                  width={200}
                  height={150}
                  className="w-full h-full object-cover"
                  onClick={() => handleFirstImage(project.id, image)}
                  onMouseEnter={() => handleThumbnailClick(project.id, image)}
                />
              </motion.div>
            ))}
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
        {/* Testimonial Section */}
        {project.testimonialImage && (
          <div className="absolute top-48 right-0 transform -translate-x-1/2 -translate-y-1/2 w-60 bg-gray-900/30 rounded-xl p-2 shadow-lg z-10">
            <Image
              src={project.testimonialImage}
              alt={`${project.title} Testimonial`}
              width={500}
              height={288}
              className="w-full h-auto rounded-lg shadow-md object-contain"
            />
          </div>
        )}

        <div className="pt-16 flex">
          <div className="w-3/5 pr-8">
            <h2 className={`text-4xl font-bold ${projectStyle.titleColor} mb-6`}>{project.title}</h2>
            <p className={`${projectStyle.descColor} mb-8 text-lg leading-relaxed`}>{project.description}</p>
          </div>
          <div className="w-2/5">
            {/* Placeholder for future content or additional information */}
          </div>
        </div>

        {/* Main Image Display with Navigation */}
        <div className="project-image-container min-h-[600px] flex justify-center items-center mb-8 relative group">
          <div className="absolute inset-0 bg-gray-800/20 rounded-3xl -z-10 blur-sm group-hover:blur-0 transition-all duration-300"></div>
          <div className="border-8 border-gray-700/50 rounded-3xl p-4 shadow-2xl shadow-gray-900/50 group-hover:shadow-gray-700/50 transition-all duration-300">
            <button 
              onClick={() => navigateImage('prev')} 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 
                bg-black/20 text-white/80 p-2 rounded-full 
                opacity-80 group-hover:opacity-100 
                transition-all duration-300 ease-in-out 
                hover:bg-black/50"
            >
              ←
            </button>
            <Image
              src={selectedImages[project.id] || project.images[currentImageIndex]}
              alt={project.title}
              width={2400}
              height={1350}
              className="project-image object-contain max-w-full max-h-full rounded-xl shadow-xl group"
              priority
            />
            <button 
              onClick={() => navigateImage('next')} 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 
                bg-black/20 text-white/80 p-2 rounded-full 
                opacity-80 group-hover:opacity-100 
                transition-all duration-300 ease-in-out 
                hover:bg-black/50"
            >
              →
            </button>
          </div>
        </div>

        {/* Image Gallery with Smooth Collision Effect */}
        <div className={`${projectStyle.thumbnailLayout} space-x-4 py-4 px-2 
          scroll-smooth snap-x snap-mandatory overflow-x-auto 
          hover:scrollbar-thumb-gray-600/50 scrollbar-thin scrollbar-track-transparent`}>
          {project.images.map((image, imgIndex) => (
            <motion.div
              key={imgIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.3, 
                type: "spring", 
                stiffness: 100 
              }}
              viewport={{ once: true, amount: 0.5 }}
              className={`flex-shrink-0 snap-center 
                ${selectedImages[project.id] === image 
                  ? `border-4 ${projectStyle.borderColor}` 
                  : `border-2 ${projectStyle.borderColor} opacity-70`}
                rounded-lg shadow-lg transform transition 
                ${projectStyle.hoverEffect} 
                w-[200px] h-[150px] overflow-hidden`}
            >
              <Image
                src={image}
                alt={`${project.title} screenshot ${imgIndex + 1}`}
                width={200}
                height={150}
                className="w-full h-full object-cover"
                onClick={() => handleFirstImage(project.id, image)}
                onMouseEnter={() => handleThumbnailClick(project.id, image)}
              />
            </motion.div>
          ))}
        </div>
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
            className="tech-text text-4xl md:text-6xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-white drop-shadow-lg"
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
