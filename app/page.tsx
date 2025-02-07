"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import SocialLinksWidget from "@/components/SocialLinksWidget"
import ProjectCarousel from "@/components/ProjectCarousel"
import ConstellationBackground from "../components/ConstellationBackground"
import MicroSparks from "../components/MicroSparks"
import ChatWidget from "../components/ChatWidget"
  
// Types
interface Project {
  id: number
  title: string
  images: string[]
}

interface BioSection {
  title: string
  content: string
}

interface BioSectionProps {
  title: string
  content: string
  index: number
}

const BioSection: React.FC<BioSectionProps> = ({ title, content, index }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'center center']
  })

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      if (latest > 0.5) setIsVisible(true)
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  // Enhanced custom animations for each section
  const getCustomAnimation = () => {
    switch (title) {
      case "The Spark":
        return {
          initial: { opacity: 0, scale: 0.8, rotateX: -15 },
          animate: isVisible ? { 
            opacity: 1, 
            scale: 1, 
            rotateX: 0,
          } : {},
          whileHover: { 
            scale: 1.02,
            boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
          },
          transition: { 
            duration: 0.8, 
            ease: [0.4, 0, 0.2, 1],
          }
        }
      case "The Journey":
        return {
          initial: { opacity: 0, x: -100, rotateY: -20 },
          animate: isVisible ? { 
            opacity: 1, 
            x: 0, 
            rotateY: 0,
          } : {},
          whileHover: { 
            scale: 1.02,
            x: 10,
            boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
          },
          transition: { 
            duration: 0.8, 
            ease: [0.4, 0, 0.2, 1],
          }
        }
      case "The Toolkit":
        return {
          initial: { opacity: 0, rotateY: 45, z: -100 },
          animate: isVisible ? { 
            opacity: 1, 
            rotateY: 0, 
            z: 0,
          } : {},
          whileHover: { 
            scale: 1.02,
            rotateY: 5,
            boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
          },
          transition: { 
            duration: 0.9, 
            ease: [0.4, 0, 0.2, 1],
          }
        }
      case "The Communication":
        return {
          initial: { opacity: 0, y: 50, scale: 0.9, rotateX: 20 },
          animate: isVisible ? { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            rotateX: 0,
          } : {},
          whileHover: { 
            scale: 1.02,
            y: -5,
            boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
          },
          transition: { 
            duration: 0.7, 
            ease: [0.4, 0, 0.2, 1],
          }
        }
      default:
        return {
          initial: { opacity: 0, y: 50, scale: 0.95 },
          animate: isVisible ? { 
            opacity: 1, 
            y: 0, 
            scale: 1,
          } : {},
          whileHover: { 
            scale: 1.02,
            boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
          },
          transition: { 
            duration: 0.6, 
            ease: [0.4, 0, 0.2, 1],
          }
        }
    }
  }

  const animation = getCustomAnimation()

  return (
    <div className="relative perspective-1000" ref={ref}>
      {/* Interconnecting line */}
      {index > 0 && (
        <motion.div
          className="absolute left-1/2 -top-12 w-0.5 h-12"
          style={{
            background: `linear-gradient(to bottom, 
              ${title === "The Journey" ? "#3B82F6" : 
                title === "The Toolkit" ? "#10B981" : 
                title === "The Communication" ? "#8B5CF6" : "#60A5FA"}
            , transparent)`,
            opacity: scrollYProgress
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isVisible ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      )}
      
      {/* Spark effects */}
      {(title === "The Spark" || isHovered) && (
        <MicroSparks 
          isVisible={isVisible || isHovered} 
          color={title === "The Spark" ? "yellow" :
                title === "The Journey" ? "blue" :
                title === "The Toolkit" ? "green" : "purple"}
        />
      )}
      
      {/* Main content */}
      <motion.div
        {...animation}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="bg-gray-800/80 backdrop-blur p-6 rounded-lg shadow-lg relative z-10 transform-gpu"
        style={{
          borderLeft: `3px solid ${title === "The Spark" ? "#EAB308" :
                                  title === "The Journey" ? "#3B82F6" :
                                  title === "The Toolkit" ? "#10B981" :
                                  title === "The Communication" ? "#8B5CF6" : "#60A5FA"}`
        }}
      >
        <h3 className="tech-text text-2xl mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
          {title}
        </h3>
        <p className="text-gray-300">{content}</p>
      </motion.div>
    </div>
  )
}

// Add this new component for the animated title
const AnimatedTitle: React.FC = () => {
  const titles = ["Website Developer", "AI Automations", "Technological Enthusiast"]
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % titles.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-8 overflow-hidden"> {/* Added overflow-hidden */}
      <AnimatePresence mode="wait">
        <motion.p
          key={titles[currentIndex]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1],
            }
          }}
          exit={{ 
            opacity: 0, 
            y: -20,
            transition: {
              duration: 0.3,
              ease: [0.4, 0, 1, 1],
            }
          }}
          className="text-2xl text-blue-100 tracking-wider uppercase absolute w-full"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-100 via-white to-blue-100">
            {titles[currentIndex]}
          </span>
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

// Data
const projects: Project[] = [
  { 
    id: 1, 
    title: "React & Vite App", 
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
    title: "Python Streamlit App", 
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
    images: ["/placeholder.svg?height=315&width=560"]
  },
]

const bioSections: BioSection[] = [
  {
    title: "The Spark",
    content:
      "My journey began with a fascination for technology and an insatiable curiosity to understand how things work. This passion ignited a relentless drive to learn and innovate in the world of software development.",
  },
  {
    title: "The Journey",
    content:
      "Throughout my career, I've embraced diverse environments, each presenting unique challenges that fueled my growth. From startups to enterprise-level projects, I've adapted quickly and thrived in dynamic settings.",
  },
  {
    title: "The Toolkit",
    content:
      "My expertise spans a wide range of technologies, with a focus on Node.js for backend development, React for creating responsive and interactive user interfaces, AI integration for cutting-edge solutions, and robust database management to ensure efficient data handling.",
  },
  {
    title: "The Communication",
    content:
      "Fluent in both English and Russian, I bridge cultural and linguistic gaps, facilitating seamless collaboration in global teams and projects.",
  },
  {
    title: "The Present and Future",
    content:
      "Currently, I'm immersed in exciting projects that push the boundaries of what's possible in web development. I'm always eager to collaborate on innovative solutions that make a real impact in the digital world.",
  },
]

// Main Page Component
export default function Home(): JSX.Element {
  const [activeProject, setActiveProject] = useState(projects[0])
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

// Handle resize for mobile devices and adjust styling accordingly, making titles and headline smaller

return (
    <div className="min-h-screen relative">
      <ConstellationBackground scrollYProgress={scrollYProgress} />
      <ChatWidget />
      <SocialLinksWidget />
      <div className="relative">
        <header className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[50vh]"> 
          <div className="content-glass p-8 rounded-lg backdrop-blur-md text-center max-w-3xl mx-auto">
            <h1 className="tech-text text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-100 via-white to-blue-100 animate-glow">
              Viacheslav Mamatov
            </h1>
            <AnimatedTitle />
          </div>
        </header>

        <main className="container mx-auto px-4 py-12 space-y-24">
          <section className="content-glass p-8 backdrop-blur-md max-w-4xl mx-auto">
            <h2 className="tech-text text-3xl mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              My Journey
            </h2>
            <div className="space-y-12">
              {bioSections.map((section, index) => (
                <BioSection key={index} title={section.title} content={section.content} index={index} />
              ))}
            </div>
          </section>
          <motion.div 
            style={{ opacity }} 
            className="text-center content-glass p-8 backdrop-blur-md max-w-3xl mx-auto"
          >
            <h2 className="tech-text text-3xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Ready to see my work in action?
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg hover:shadow-xl tech-text"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explore My Projects
            </motion.button>
          </motion.div>

          <section id="projects" className="content-glass p-8 backdrop-blur-md max-w-5xl mx-auto">
            <h2 className="tech-text text-3xl mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              My Projects
            </h2>
            <div className="grid grid-cols-1 gap-8">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  className="rounded-lg overflow-hidden transform transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="p-4 bg-gray-800/80 backdrop-blur mb-4">
                    <h3 className="text-2xl font-semibold text-center tech-text bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                      {project.title}
                    </h3>
                  </div>
                  <ProjectCarousel
                    images={project.images}
                    title={project.title}
                  />
                </motion.div>
              ))}
            </div>
          </section>


        </main>

        <footer className="container mx-auto px-4 py-8 text-center">
          <div className="content-glass p-4 backdrop-blur-md max-w-xl mx-auto">
            <p className="tech-text text-sm text-blue-200">
              © 2025 Viacheslav Mamatov. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}