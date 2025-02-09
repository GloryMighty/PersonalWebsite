"use client"

import React from "react"
import { motion } from "framer-motion"
import { FileText } from "lucide-react"

interface OfferFormProps {
  position?: 'fixed' | 'absolute' | 'static';
  className?: string;
}

const OfferForm: React.FC<OfferFormProps> = ({
  position = 'static',
  className = ''
}) => {
  const googleFormUrl = "https://forms.gle/B5GSjnyMojGHasZRA"

  const handleFormClick = () => {
    window.open(googleFormUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <motion.button
      onClick={handleFormClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${className} bg-app-button text-app-button-text px-4 py-2 rounded-lg shadow-lg hover:bg-app-button-hover transition-all flex items-center space-x-2`}
    >
      <span>HIRE ME</span>
      <FileText className="w-5 h-5" />
    </motion.button>
  )
}

export default React.memo(OfferForm)
