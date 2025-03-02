// app/page.tsx

"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import SocialLinksWidget from "../components/SocialLinksWidget"
import ConstellationBackground from "../components/ConstellationBackground"
import MicroSparks from "../components/MicroSparks"
import ChatWidget from "../components/ChatWidget"
import Shevrons from '@/components/Shevrons';
import Image from 'next/image';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Types

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
  const titles = ["Web Development", "AI Automations", "Tech Enthusiast", "Entrepreneurial Soul"]
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        (prevIndex + 1) % titles.length
      );
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentIndex, titles.length]);

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

const revenueData = [
  { month: 'Before', revenue: 5000 },
  { month: 'Hiring', revenue: 7000 },
  { month: 'Me', revenue: 5000 },
  { month: 'And', revenue: 8000 },
  { month: 'After', revenue: 8000 },
  { month: '=>', revenue: 500000 },
];

// Main Page Component
export default function Home(): JSX.Element {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

// Handle resize for mobile devices and adjust styling accordingly, making titles and headline smaller
const handleResize = () => {
  if (window.innerWidth < 768) {
    // For mobile, make titles and headline smaller
    document.documentElement.style.setProperty('--title-size', '4rem');
    document.documentElement.style.setProperty('--headline-size', '2.5rem');
  } else {
    // For desktop, reset sizes
    document.documentElement.style.setProperty('--title-size', '6rem');
    document.documentElement.style.setProperty('--headline-size', '4rem');
  }
}
// Add event listener for resize
useEffect(() => {
  handleResize(); // Call it once on mount
  window.addEventListener('resize', handleResize); // Call it on resize
  return () => window.removeEventListener('resize', handleResize); // Cleanup
}, []);

const redirectToProjects = () => {
  window.location.href = "/projects"
}

return (
    <div className="min-h-screen relative">
      <ConstellationBackground scrollYProgress={scrollYProgress} />
      <ChatWidget />
      <SocialLinksWidget />
      <div className="relative">
        <header className="relative h-screen flex flex-col justify-start items-center text-center overflow-hidden pt-32">
          <div className="z-10 text-center px-4 py-4">
            <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              VIACHESLAV MAMATOV
            </h1>
            <AnimatedTitle />
            <div className="bg-gray-900/30 rounded-xl p-6 mx-auto flex flex-col items-center">
              <Image 
                src="/Me.png" 
                alt="Viacheslav Mamatov" 
                width={240} 
                height={240} 
                className="rounded-full mb-4 border-4 border-gray-700"
              />
            </div>
          </div>
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
            <Shevrons 
              direction="down" 
              variant="triple"
              onClick={() => {
                // Scroll to the next section
                document.getElementById('my-journey')?.scrollIntoView({ behavior: 'smooth' })
              }} 
              className="text-blue-500 hover:text-blue-600"
              size={32}  // Slightly larger size for better visibility
            />
          </div>
        </header>

        <main className="container mx-auto px-4 py-12 space-y-24">
          <section id="my-journey" className="container mx-auto px-4 py-16">
            <div className="content-glass p-8 backdrop-blur-md max-w-4xl mx-auto">
              <h2 className="tech-text text-3xl mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                My Journey
              </h2>
              <div className="space-y-12">
                {bioSections.map((section, index) => (
                  <BioSection key={index} title={section.title} content={section.content} index={index} />
                ))}
              </div>
            </div>
          </section>

          <div className="flex justify-center items-center mb-8">
            <Shevrons 
              direction="down" 
              variant="triple"
              onClick={() => {
                // Scroll to the next section
                document.getElementById('work-section')?.scrollIntoView({ behavior: 'smooth' })
              }} 
              className="text-blue-500 hover:text-blue-600"
              size={32}  // Slightly larger size for better visibility
            />
          </div>

          <motion.div 
            style={{ opacity }} 
            className="text-center content-glass p-8 backdrop-blur-md max-w-3xl mx-auto"
          >
            <h2 className="tech-text text-3xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              OUR PRESENT AND FUTURE
            </h2>
            
            {/* Revenue Growth Graph */}
            <div className="w-full h-[300px] mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={revenueData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke="rgba(255,255,255,0.1)" 
                  />
                  <XAxis 
                    dataKey="month" 
                    stroke="rgba(255,255,255,0.5)" 
                    tick={{ fill: 'white' }} 
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.5)" 
                    tick={{ fill: 'white' }} 
                    tickFormatter={(value) => `$${value}`} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px'
                    }} 
                    labelStyle={{ color: 'lightblue' }}
                  />
                  <Legend 
                    verticalAlign="top" 
                    height={36} 
                    iconType="circle" 
                    color="white" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#8884d8" 
                    strokeWidth={3} 
                    activeDot={{ r: 8 }} 
                    name="Your Revenue" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-blue-200 mb-6">
              Projected revenue growth after website optimization and strategic improvements
            </p>

            <h2 className="tech-text text-3xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Ready to see my work in action?
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                y: [0, -10, 0], // Half bounce effect
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut'
                }
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg hover:shadow-xl tech-text"
              onClick={() => redirectToProjects()}
            >
              Explore My Projects
            </motion.button>
          </motion.div>
        </main>

        <footer className="container mx-auto px-4 py-8 text-center">
          <div className="content-glass p-4 backdrop-blur-md max-w-xl mx-auto">
            <p className="tech-text text-sm text-blue-200">
              2025 Viacheslav Mamatov. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}