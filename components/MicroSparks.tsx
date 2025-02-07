/// /components/MicroSparks.tsx

"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface SparkProps {
  isVisible: boolean
  color?: 'blue' | 'yellow' | 'white' | 'green' | 'purple'
}

const MicroSparks: React.FC<SparkProps> = ({ isVisible, color = 'blue' }) => {
  const [sparks, setSparks] = useState<Array<{ x: number; y: number; angle: number; size: number }>>([])

  const colorMap = {
    blue: {
      bg: 'bg-blue-400',
      glow: '0 0 15px 4px rgba(96, 165, 250, 0.8)',
    },
    yellow: {
      bg: 'bg-yellow-300',
      glow: '0 0 15px 4px rgba(253, 224, 71, 0.8)',
    },
    white: {
      bg: 'bg-white',
      glow: '0 0 15px 4px rgba(255, 255, 255, 0.8)',
    },
    green: {
      bg: 'bg-green-400',
      glow: '0 0 15px 4px rgba(74, 222, 128, 0.8)',
    },
    purple: {
      bg: 'bg-purple-400',
      glow: '0 0 15px 4px rgba(192, 132, 252, 0.8)',
    }
  }

  useEffect(() => {
    if (isVisible) {
      const newSparks = Array.from({ length: 30 }, () => ({
        x: (Math.random() * 200 - 100) * (Math.random() < 0.5 ? 0.5 : 1.5),
        y: (Math.random() * 200 - 100) * (Math.random() < 0.5 ? 0.5 : 1.5),
        angle: Math.random() * 360,
        size: Math.random() * 2 + 1, // Random size between 1 and 3
      }))
      setSparks(newSparks)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sparks.map((spark, index) => (
        <motion.div
          key={index}
          className={`absolute ${colorMap[color].bg} rounded-full`}
          initial={{
            opacity: 0,
            scale: 0,
            x: 0,
            y: 0,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, spark.size, 0],
            x: spark.x,
            y: spark.y,
            rotate: spark.angle,
          }}
          transition={{
            duration: 1.5,
            delay: index * 0.03,
            ease: [0.4, 0, 0.2, 1],
            times: [0, 0.4, 1],
          }}
          style={{
            left: "50%",
            top: "50%",
            width: `${spark.size * 2}px`,
            height: `${spark.size * 2}px`,
            boxShadow: colorMap[color].glow,
          }}
        />
      ))}
    </div>
  )
}

export default MicroSparks