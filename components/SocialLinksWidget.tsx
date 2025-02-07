"use client"

import React, { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Linkedin, Twitter, Mail, Users } from "lucide-react"

// Social links data for easy maintenance
const socialLinks = [
  {
    icon: <Github className="w-6 h-6" />,
    href: "https://github.com/GloryMighty",
    label: "GitHub",
    color: "hover:text-gray-300",
  },
  {
    icon: <Linkedin className="w-6 h-6" />,
    href: "https://linkedin.com/in/viacheslav-mamatov-61169032b/",
    label: "LinkedIn",
    color: "hover:text-blue-400",
  },
  {
    icon: <Twitter className="w-6 h-6" />,
    href: "https://twitter.com/allhopeisgo",
    label: "Twitter",
    color: "hover:text-blue-300",
  },
  {
    icon: <Mail className="w-6 h-6" />,
    href: "mailto:mamatovviacheslav@gmail.com",
    label: "Email",
    color: "hover:text-red-400",
  },
]

const SocialLinksWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-4 left-4 md:bottom-8 md:left-8 z-50"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute bottom-16 left-0 space-y-3"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { delay: index * 0.1 } 
                }}
                exit={{ 
                  opacity: 0, 
                  x: -20,
                  transition: { delay: (socialLinks.length - index - 1) * 0.1 } 
                }}
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className={`block p-3 bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg ${link.color} transition-colors duration-200`}
              >
                {link.icon}
                <span className="sr-only">{link.label}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleOpen}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-gray-800/90 backdrop-blur-sm text-white p-4 rounded-full shadow-lg hover:bg-gray-700/90 transition-colors duration-200 relative"
      >
        <Users className="w-6 h-6" />
        <span className="sr-only">Connect with me</span>
        
        {/* Subtle pulsing ring effect */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-blue-500/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      </motion.button>
    </motion.div>
  )
}

export default React.memo(SocialLinksWidget)
