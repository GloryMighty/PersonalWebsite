// app/projects/page.tsx

"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import ConstellationBackground from "@/components/ConstellationBackground"
import { useScroll } from "framer-motion"
import { useState, useEffect } from "react"
import SocialLinksWidget from "@/components/SocialLinksWidget"
import ChatWidget from "@/components/ChatWidget"
import OfferForm from "@/components/OfferForm"
import NavigationButton from '@/components/NavigationButton'
import { FaArrowRight } from 'react-icons/fa'

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

// Main component for the Projects page
// Displays a list of projects with images and descriptions
// Special handling for Autoparsinta project with Before/After sections
export default function ProjectsPage() {
  const { scrollYProgress } = useScroll()
  const [selectedImages, setSelectedImages] = useState<{[key: number]: string}>({})

  // Handles mouse hover on thumbnail images
  // Updates the main display image when hovering over a thumbnail
  const handleThumbnailClick = (projectId: number, imageSrc: string) => {
    setSelectedImages(prev => ({
      ...prev,
      [projectId]: imageSrc
    }))
  }

  // Handles click events on images
  // Updates the main display image when clicking on any image
  const handleFirstImage = (projectId: number, imageSrc: string) => {
    setSelectedImages(prev => ({
      ...prev,
      [projectId]: imageSrc
    }))
  }

  // Render the component with widgets and handle the first image
  return (
    <div className="min-h-screen relative">
      <ConstellationBackground scrollYProgress={scrollYProgress} />
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
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="tech-text text-4xl md:text-6xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-white drop-shadow-lg"
          >
            My Projects
          </motion.h1>

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
                {/* Special layout for Autoparsinta project (id: 1) */}
                {project.id === 1 ? (
                  <div className="w-full bg-gray-900 rounded-2xl overflow-hidden shadow-2xl p-8">
                    <h2 className="text-4xl font-bold text-white mb-6">{project.title}</h2>
                    <p className="text-gray-300 mb-8">{project.description}</p>
                    
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

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                              className={`rounded-lg shadow-lg transform transition hover:scale-105 border-2 cursor-pointer 
                                ${selectedImages[project.id] === image ? 'border-green-600' : 'border-green-800 opacity-70'}`}
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
                              className={`rounded-lg shadow-lg transform transition hover:scale-105 border-2 cursor-pointer 
                                ${selectedImages[project.id] === image ? 'border-red-600' : 'border-red-800 opacity-70'}`}
                              onClick={() => handleFirstImage(project.id, image)}
                              onMouseEnter={() => handleThumbnailClick(project.id, image)}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="project-image-container min-h-[600px] flex justify-center items-center">
                      <Image
                        src={selectedImages[project.id] || project.images[0]}
                        alt={project.title}
                        width={2400}
                        height={1350}
                        className="project-image object-contain max-w-full max-h-full"
                        priority={index === 0}
                      />
                    </div>
                    <div className="project-content">
                      <h2 className="project-title">{project.title}</h2>
                      <p className="project-description">{project.description}</p>
                      {project.images.length > 0 && (
                        <div className="project-gallery flex flex-wrap gap-2 justify-center">
                          {project.images.map((image, imgIndex) => (
                            <motion.div
                              onClick={() => handleFirstImage(project.id, image)}
                              onMouseEnter={() => handleThumbnailClick(project.id, image)}
                              onMouseLeave={() => setSelectedImages(prev => ({
                                ...prev,
                                [project.id]: image
                              }))}  
                              key={imgIndex}
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, delay: index * 0.2 }}
                              className={`gallery-thumbnail w-[100px] h-[100px] ${selectedImages[project.id] === image ? 'ring-2 ring-blue-500' : ''}`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Image
                                src={image}
                                alt={`${project.title} screenshot ${imgIndex + 1}`}
                                width={150}
                                height={150}
                                className="thumbnail-image cursor-pointer object-contain w-full h-full rounded-lg"
                              />
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
