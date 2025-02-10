// app/projects/page.tsx

"use client"

// Framer Motion and React imports
import React, { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValue, MotionValue } from 'framer-motion'
import Image from 'next/image'

// Import other necessary components and types
import ConstellationBackground from "@/components/ConstellationBackground"
import SocialLinksWidget from "@/components/SocialLinksWidget"
import ChatWidget from "@/components/ChatWidget"
import Shevrons from "@/components/Shevrons"

// Project data and types
interface Project {
  id: number
  title: string
  description: string
  images: string[]
  stack?: { name: string, icon: string }[]
  testimonial?: {
    text: string
    author: string
    role?: string
    image: string
  }
}

const projects: Project[] = [
  { 
    id: 1, 
    title: "AUTOPARSINTA", 
    description: 'A web application for a car service business, built using modern web technologies. It includes multi-language support, offering content in Finnish, English, Arabic, and Swedish, and is hosted online within 2 days. The application handles google maps widget, providing interactive maps for location tracking and direction finding and has a review widget as well.',
    images: [
      "/AutoparsintaAfter/Main.png",
      "/AutoparsintaAfter/2.png",
      "/AutoparsintaAfter/3.png",
    ],
    stack: [
      { name: 'React', icon: '⚛️' },
      { name: 'Next.js', icon: '🔺' },
      { name: 'Tailwind CSS', icon: '🌬️' },
      { name: 'Vite', icon: '⚡' }
    ],
    testimonial: {
      text: "Bringing my garage's website to this millenia was super easy and fast. The quality and the functionality of the website is exactly what I wanted! ",
      author: "MARKUS KETONEN",
      role: "Owner, Autoparsinta",
      image: "/Testimonials/Autoparsinta.jpg"
    }
  },
  { 
    id: 2, 
    title: "TINDERIZZER",
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
      "/ReactScreen/Upgrade.png"
    ],
    stack: [
      { name: 'React', icon: '⚛️' },
      { name: 'Google Gemini', icon: '🤖' },
      { name: 'TypeScript', icon: '📘' },
      { name: 'Supabase', icon: '🟢' }
    ],
    testimonial: {
      text: "Smoothly executed with an unique idea, Tinderizzer completely changed my approach to online dating. The AI feedback is incredibly insightful and has boosted my confidence.",
      author: "BATUHAN",
      role: "User, Tinderizzer",
      image: "/Testimonials/Tinderizzer.png"
    }
  },
  { 
    id: 3, 
    title: "COMPLEX PDF AI", 
    description: 'An intelligent document analysis assistant powered by Google\'s Gemini AI. Helps analyze and query PDF documents, providing structured answers and insights across multiple files.',
    images: [
      "/StreamlitScreen/Main.png",
      "/StreamlitScreen/Upload.png",
      "/StreamlitScreen/Process.png",
      "/StreamlitScreen/AIResponse.png",
      "/StreamlitScreen/Delete.png"
    ],
    stack: [
      { name: 'Streamlit', icon: '🌊' },
      { name: 'Python', icon: '🐍' },
      { name: 'Google Gemini', icon: '🤖' },
      { name: 'PDF.js', icon: '📄' }
    ],
    testimonial: {
      text: "Complex PDF AI has revolutionized my document analysis workflow. The ability to query multiple PDFs and get concise insights is a game-changer for my research.",
      author: "Moe",
      role: "User",
      image: "/Testimonials/PDF.png"
    }
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

// Spark and Chevron Visual Component
const ProjectSeparator = () => {
  // Generate random spark positions and intensities
  const sparks = Array.from({ length: 10 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${Math.random() * 10 + 2}px`,
    delay: `${Math.random() * 2}s`,
    duration: `${Math.random() * 3 + 1}s`,
    color: ['cyan', 'blue', 'purple'][Math.floor(Math.random() * 3)]
  }))

  return (
    <div className="relative w-full h-24 overflow-hidden">
      {/* Sparks */}
      {sparks.map((spark, index) => (
        <div 
          key={index} 
          className={`
            absolute 
            rounded-full 
            bg-${spark.color}-500 
            opacity-50 
            animate-pulse 
            blur-sm
          `}
          style={{
            left: spark.left,
            top: spark.top,
            width: spark.size,
            height: spark.size,
            animationDelay: spark.delay,
            animationDuration: spark.duration
          }}
        />
      ))}
      
      {/* Chevron */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center items-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          className="w-12 h-12 text-cyan-500 opacity-50 animate-bounce"
        >
          <path 
            fill="currentColor" 
            d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
          />
        </svg>
      </div>
    </div>
  )
}

// Modernized Stack Component
const TechStack = ({ stack }: { stack?: { name: string, icon: string }[] }) => {
  if (!stack || stack.length === 0) return null;

  return (
    <div className="mt-4 p-4 bg-gray-900/50 rounded-xl border border-cyan-500/30 shadow-lg">
      <h3 className="text-lg font-semibold text-cyan-300 mb-3 text-center">
        Technology Stack
      </h3>
      <div className="flex flex-wrap justify-center gap-4">
        {stack.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              rotate: index % 2 === 0 ? [0, -5, 5, 0] : [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 300
            }}
            whileHover={{ 
              scale: 1.1,
              rotate: 0,
              transition: { duration: 0.2 }
            }}
            className="
              flex flex-col items-center justify-center 
              p-3 rounded-lg 
              bg-gray-800/70 
              border border-cyan-500/30
              hover:border-cyan-500/70
              hover:bg-gray-800/90
              transition-all duration-300
              cursor-pointer
              group
            "
          >
            <span className="text-3xl mb-2 group-hover:text-cyan-300 transition-colors">
              {tech.icon}
            </span>
            <span className="text-sm text-gray-300 group-hover:text-cyan-200 transition-colors">
              {tech.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Separate component for project image display
const ProjectImageDisplay = ({ 
  project, 
  selectedImages, 
  handleFirstImage, 
  handleThumbnailClick,
  isLastProject 
}: { 
  project: Project, 
  selectedImages: {[key: number]: string}, 
  handleFirstImage: (projectId: number, imageSrc: string) => void,
  handleThumbnailClick: (projectId: number, imageSrc: string) => void,
  isLastProject?: boolean 
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

  return (
    <div className="flex flex-col space-y-8">
      {/* Content Section */}
      <div className="flex mb-8">
        {/* Left Column: Text and Stack */}
        <div className="w-1/2 pr-8 space-y-4 relative group pl-4">
          <h2 className={`
            text-4xl font-bold tracking-tight 
            bg-clip-text text-transparent 
            bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 
            animate-text-shimmer
            mb-6 
            transition-all duration-300 
            group-hover:scale-[1.02] 
            group-hover:brightness-110
            -ml-4 
            pl-4 
            border-l-4 border-cyan-500
          `}>{project.title}</h2>
          <p className={`
            ${projectStyle.descColor} 
            text-lg leading-relaxed 
            bg-opacity-50 
            backdrop-blur-sm 
            border-l-6 border-cyan-500 
            pl-6 
            -ml-4 
            transition-all duration-300 
            hover:border-opacity-100 
            hover:shadow-lg 
            hover:bg-gray-800/70
          `}>{project.description}</p>
          
          {project.stack && (
            <TechStack stack={project.stack} />
          )}
        </div>

        {/* Right Column: Testimonial */}
        <div className="w-1/2 pl-8 flex flex-col justify-center">
          {project.testimonial && (
            <div className="bg-blue-1000/30 rounded-xl p-6 ml-4 flex flex-col items-center">
              <Image 
                src={project.testimonial.image} 
                alt={project.testimonial.author} 
                width={120} 
                height={120} 
                className="rounded-full mb-4 border-4 border-blue-700"
              />
              <div className="text-center">
                <p className="italic text-gray-300 mb-2">"{project.testimonial.text}"</p>
                <div>
                  <span className="font-semibold text-gray-200">{project.testimonial.author}</span>
                  {project.testimonial.role && (
                    <p className="text-sm text-gray-400">{project.testimonial.role}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Full-Width Image Carousel */}
      <div className="w-full mb-8">
        <div className="project-image-container min-h-[600px] flex justify-center items-center relative group">
          <div className="absolute inset-0 bg-gray-800/20 rounded-3xl -z-10 blur-sm group-hover:blur-0 transition-all duration-300"></div>
          <div className="w-full border-8 border-gray-700/50 rounded-3xl p-4 shadow-2xl shadow-gray-900/50 group-hover:shadow-gray-700/50 transition-all duration-300">
            <button 
              onClick={() => navigateImage('prev')} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 
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
              className="project-image object-contain w-full max-h-[700px] rounded-xl shadow-xl"
              priority
            />
            <button 
              onClick={() => navigateImage('next')} 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 
                bg-black/20 text-white/80 p-2 rounded-full 
                opacity-80 group-hover:opacity-100 
                transition-all duration-300 ease-in-out 
                hover:bg-black/50"
            >
              →
            </button>
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex justify-center space-x-2 mt-4">
          {project.images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(project.id, image)}
              className={`w-16 h-16 rounded-md overflow-hidden transition-all duration-300 
                ${selectedImages[project.id] === image || 
                  (currentImageIndex === index && !selectedImages[project.id]) 
                  ? 'border-4 border-blue-500 opacity-100' 
                  : 'opacity-60 hover:opacity-80'}`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                width={100}
                height={100}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      </div>
      {/* Only add separator if it's not the last project */}
      {!isLastProject && <ProjectSeparator />}
    </div>
  )
}

// Main Projects Page Component
export default function ProjectsPage() {
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
    <div className="pt-24 min-h-screen flex flex-col items-center justify-start">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200"
      >
        GALLERY
      </motion.h1>

      {projects.map((project, index) => (
        <React.Fragment key={project.id}>
          <ProjectImageDisplay 
            project={project} 
            selectedImages={selectedImages}
            handleFirstImage={handleFirstImage}
            handleThumbnailClick={handleThumbnailClick}
            isLastProject={index === projects.length - 1}
          />
          {project.title === "My Introduction" && (
            <div className="flex flex-col items-center justify-center mt-8 space-y-4">
              <p className="text-xl text-cyan-300 font-medium text-center animate-pulse">
                Have more questions about me? Don&apos;t hesitate to ask VAI
              </p>
              <div className="animate-slow-bounce">
                <Shevrons 
                  direction="right" 
                  variant="triple" 
                  size={48} 
                  className="text-cyan-500 opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>
          )}
        </React.Fragment>
      ))}

      {/* Fixed widgets */}
      <div className="fixed top-4 right-4 md:top-8 md:right-8 z-50 flex space-x-4">
        <SocialLinksWidget />
        <ChatWidget />
      </div>

      {/* Background */}
      <ConstellationBackground scrollYProgress={useMotionValue(0)} />
    </div>
  )
}
