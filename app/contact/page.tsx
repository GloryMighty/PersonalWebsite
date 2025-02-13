"use client"

import React from 'react';
import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import SocialLinksWidget from '@/components/SocialLinksWidget';

// Custom WhatsApp icon component
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.815 9.815 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.32a8.188 8.188 0 0 1-1.26-4.38c.01-4.54 3.7-8.23 8.25-8.23zM8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.21.88 2.38 1 2.54.12.15 1.75 2.67 4.3 3.66.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.2-.58.2-1.07.14-1.18s-.22-.15-.47-.26-.88-.43-1.1-.48c-.22-.05-.38-.07-.54.06-.16.14-.62.48-.76.58-.14.1-.29.12-.54 0-.25-.14-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.12-.12.25-.33.38-.49.12-.16.16-.28.22-.47.05-.19.03-.36-.02-.47s-.54-1.31-.76-1.8c-.2-.47-.41-.41-.54-.42z" />
  </svg>
)

// Social links data for contact page
const socialLinks = [
  {
    icon: <WhatsAppIcon className="w-6 h-6" />,
    href: "https://wa.me/358451333953",
    label: "WhatsApp",
    color: "hover:text-green-500",
  },
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
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-black py-12 px-4 pt-24">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-12 
          text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Contact me
        </h1>
        
        {/* Horizontal Social Links */}
        <div className="flex justify-center space-x-4 mb-16">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                p-3 
                bg-white dark:bg-gray-800 
                rounded-full 
                shadow-lg 
                ${link.color} 
                transition-all 
                duration-300 
                hover:scale-110
              `}
            >
              {link.icon}
              <span className="sr-only">{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
