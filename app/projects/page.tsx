// app/projects/page.tsx

"use client"

// Framer Motion and React imports
import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useMotionValue, MotionValue } from 'framer-motion'
import Image from 'next/image'

// Import other necessary components and types
import ConstellationBackground from "@/components/ConstellationBackground"
import ChatWidget from "@/components/ChatWidget"
import SocialLinksWidget from "@/components/SocialLinksWidget"
import Shevrons from "@/components/Shevrons"
import TechStack from "@/components/TechStack"

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
const ProjectsPage = () => {
  const [selectedImages, setSelectedImages] = useState<{[key: number]: string}>({})
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const projectContainerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Scroll to specific project
  const scrollToProject = (index: number) => {
    const projectElement = document.getElementById(`project-${projects[index].id}`);
    
    if (projectElement) {
      // Add an offset for the first project to prevent it from being too high
      const offset = index === 0 ? 100 : 0; // 100px offset for the first project
      
      window.scrollTo({
        top: projectElement.offsetTop - offset,
        behavior: 'smooth'
      });
      
      setCurrentProjectIndex(index);
    }
  };

  // Handle scroll to update current project index
  useEffect(() => {
    const handleScroll = () => {
      const projectContainer = projectContainerRef.current
      if (projectContainer) {
        const projectElements = projectContainer.querySelectorAll('.project-item')
        const scrollPosition = window.scrollY

        // Find the project currently in view
        for (let i = 0; i < projectElements.length; i++) {
          const element = projectElements[i] as HTMLElement
          const elementTop = element.offsetTop
          const elementHeight = element.offsetHeight

          if (scrollPosition >= elementTop && 
              scrollPosition < elementTop + elementHeight) {
            setCurrentProjectIndex(i)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Function to handle first image selection
  const handleFirstImage = (projectId: number, imageSrc: string) => {
    setSelectedImages(prev => ({
      ...prev,
      [projectId]: imageSrc
    }))
  }

  // Function to handle thumbnail click
  const handleThumbnailClick = (projectId: number, imageSrc: string) => {
    setSelectedImages(prev => ({
      ...prev,
      [projectId]: imageSrc
    }))
  }

  // Get scroll progress
  const { scrollYProgress } = useScroll()

  return (
    <div className="projects-container relative">
      {/* Constellation Background */}
      <ConstellationBackground scrollYProgress={scrollYProgress} />

      {/* Chat and Social Widgets */}
      <ChatWidget />
      <SocialLinksWidget />

      {/* Projects Container */}
      <motion.div 
        ref={projectContainerRef} 
        className="projects-wrapper flex flex-col items-center space-y-16 py-16"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: {
              staggerChildren: 0.3
            }
          }
        }}
      >
        {projects.map((project, index) => (
          <React.Fragment key={project.id}>
            <motion.div
              id={`project-${project.id}`}
              className={`project-item ${index === currentProjectIndex ? 'active' : ''}`}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <ProjectImageDisplay 
                project={project} 
                selectedImages={selectedImages}
                handleFirstImage={handleFirstImage}
                handleThumbnailClick={handleThumbnailClick}
                isLastProject={index === projects.length - 1}
              />
            </motion.div>
            
            {/* Add navigation Shevrons between projects, except for the first project */}
            {index > 0 && index < projects.length && (
              <div className="flex flex-col items-center space-y-4 w-full py-8">
                <div className="flex justify-between w-full px-24">
                  <Shevrons 
                    direction="up" 
                    variant="triple"
                    onClick={() => scrollToProject(index - 1)}
                    className="opacity-50 hover:opacity-100 text-blue-300 hover:text-blue-500 transition-all duration-300 transform hover:-translate-y-2 scale-150"
                    size={48}
                  />
                  <Shevrons 
                    direction="down" 
                    variant="triple"
                    onClick={() => scrollToProject(index)}
                    className="opacity-50 hover:opacity-100 text-blue-300 hover:text-blue-500 transition-all duration-300 transform hover:translate-y-2 scale-150"
                    size={48}
                  />
                </div>
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </motion.div>
      
      {/* VAI Questions Section */}
      <div className="w-full flex flex-col items-center justify-center py-8 space-y-4">
        <p className="text-xl text-blue-300 hover:text-blue-500 transition-colors duration-300 cursor-pointer">
          Have more questions? Ask VAI!
        </p>
        <Shevrons 
          direction="right" 
          variant="triple"
          className="opacity-50 hover:opacity-100 text-blue-300 hover:text-blue-500 transition-all duration-300 transform hover:translate-x-2 scale-150"
          size={48}
        />
      </div>
      <footer className="container mx-auto px-4 py-8 text-center">
        <div className="content-glass p-4 backdrop-blur-md max-w-xl mx-auto">
          <p className="tech-text text-sm text-blue-200">
            2025 Viacheslav Mamatov. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

// Copyright footer
const CopyrightFooter = () => {
  return (
    <footer className="container mx-auto px-4 py-8 text-center">
      <div className="content-glass p-4 backdrop-blur-md max-w-xl mx-auto">
        <p className="tech-text text-sm text-blue-200">
          2025 Viacheslav Mamatov. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default ProjectsPage;
