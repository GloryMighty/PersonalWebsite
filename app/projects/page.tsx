// app/projects/page.tsx

"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import ConstellationBackground from "@/components/ConstellationBackground"
import { useScroll } from "framer-motion"
import { useState, useEffect } from "react"
import SocialLinksWidget from "@/components/SocialLinksWidget"
import ChatWidget from "@/components/ChatWidget"
import NavigationButton from '@/components/NavigationButton'

interface Project {
  id: number
  title: string
  description: string
  images: string[]
}

const projects: Project[] = [
  { 
    id: 1, 
    title: "Tinderizzer",
    description: 'An AI-powered dating coach designed to help craft the perfect messages for online dating. Leverages Google Gemini API to analyze messages, provide feedback, and boost user\'s communication skills with a fun "Rizz Score".',
    images: [
      "/ReactScreen/Main.png",
      "/ReactScreen/Profile.png",
      "/ReactScreen/Description.png",
      "/ReactScreen/Approach.png",
      "/ReactScreen/Upgrade.png"
    ]
  },
  { 
    id: 2, 
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
    id: 3, 
    title: "My Introduction", 
    description: 'Just me',
    images: [
      "/MyIntroduction/me.png",
      ]
  },
]
// Function to render the components
export default function ProjectsPage() {
  const { scrollYProgress } = useScroll()
  const [selectedImages, setSelectedImages] = useState<{[key: number]: string}>({})

  // Add the function to handle the first image and put the first image in the gallery of images after selectedImages is empty
  const handleThumbnailClick = (projectId: number, imageSrc: string) => {
    setSelectedImages(prev => ({
      ...prev,
      [projectId]: imageSrc
    }))
  }

  // Include the first image in the gallery of images after selectedImages is empty
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
      <SocialLinksWidget />
      <ChatWidget />
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
                className="project-card"
              >
                <div className="project-image-container">
                  <Image
                    src={selectedImages[project.id] || project.images[0]}
                    alt={project.title}
                    width={1600}
                    height={900}
                    className="project-image object-cover w-full h-full md:w-full md:h-[500px] rounded-xl"
                    priority={index === 0}
                  />
                </div>
                <div className="project-content">
                  <h2 className="project-title">{project.title}</h2>
                  <p className="project-description">{project.description}</p>
                  {project.images.length > 0 && (
                    <div className="project-gallery">
                      {project.images.map((image, imgIndex) => (
                        <motion.div
                        // Include the thumbnail in the gallery of images after selectedImages is empty
                        // Also, add a ring to the selected image
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
                          className={`gallery-thumbnail ${selectedImages[project.id] === image ? 'ring-2 ring-blue-500' : ''}`}                        whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Image
                          // This is the gallery of images that includes thumbnail image. 
                          // Also, add a ring to the selected images  
                            src={image}
                            alt={`${project.title} screenshot ${imgIndex + 1}`}
                            width={150}
                            height={150}
                            className="thumbnail-image cursor-pointer object-cover rounded-lg"
                          />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
