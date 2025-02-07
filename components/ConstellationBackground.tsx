"use client"

import { useEffect, useRef, useState } from "react"
import { useTransform } from "framer-motion"
import { motion } from "framer-motion"

interface Point {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  targetAlpha: number
}

interface Connection {
  start: Point
  end: Point
  alpha: number
}


// Constants for computer graphics
const POINT_COUNT = 20 // Number of stars
const CONNECTION_DISTANCE = 170  // Nonnection distance
const MOUSE_INFLUENCE_DISTANCE = 250 // Mouse influence
const MOUSE_REPEL_STRENGTH = 0.8 // Movement speed of mouse affect
const POINT_SPEED = 0.5 // Speed of movement
const BASE_ALPHA = 0.8 // Base opacity for better content visibility
const CONNECTION_ALPHA = 0.9 // Connection line opacity

// Constants for mobile devices
const MOBILE_POINT_COUNT = 10 // Number of stars on mobile
const MOBILE_CONNECTION_DISTANCE = 100 // Nonnection distance on mobile
const MOBILE_MOUSE_INFLUENCE_DISTANCE = 150 // Mouse influence on mobile
const MOBILE_MOUSE_REPEL_STRENGTH = 0.6 // Movement speed of mouse affect on mobile
const MOBILE_POINT_SPEED = 0.3 // Speed of movement on mobile
const MOBILE_BASE_ALPHA = 0.6 // Base opacity for better content visibility on mobile
const MOBILE_CONNECTION_ALPHA = 0.7 // Connection line opacity on mobile

// Initialize less constants for mobile devices
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
const mobilePointCount = isMobile ? MOBILE_POINT_COUNT : POINT_COUNT
const mobileConnectionDistance = isMobile ? MOBILE_CONNECTION_DISTANCE : CONNECTION_DISTANCE
const mobileMouseInfluenceDistance = isMobile ? MOBILE_MOUSE_INFLUENCE_DISTANCE : MOUSE_INFLUENCE_DISTANCE
const mobileMouseRepelStrength = isMobile ? MOBILE_MOUSE_REPEL_STRENGTH : MOUSE_REPEL_STRENGTH
const mobilePointSpeed = isMobile ? MOBILE_POINT_SPEED : POINT_SPEED
const mobileBaseAlpha = isMobile ? MOBILE_BASE_ALPHA : BASE_ALPHA
const mobileConnectionAlpha = isMobile ? MOBILE_CONNECTION_ALPHA : CONNECTION_ALPHA

const ConstellationBackground: React.FC<{ scrollYProgress: any }> = ({ scrollYProgress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointsRef = useRef<Point[]>([])
  const connectionsRef = useRef<Connection[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const animationFrameRef = useRef<number>()

  // Parallax effect using useTransform
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']) // Adjust '-20%' to control parallax strength

  // Initialize points with random positions. For mobile devices use less points and smaller sizes
  const initializePoints = (width: number, height: number) => {
    return Array.from({ length: mobilePointCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * mobilePointSpeed,
      vy: (Math.random() - 0.5) * mobilePointSpeed,
      radius: Math.random() * 3 + 1, // Increased star size
      alpha: Math.random() * 0.3 + BASE_ALPHA,
      targetAlpha: Math.random() * 0.3 + BASE_ALPHA,
    }))
  }

  // Update point positions and handle mouse interaction
  const updatePoints = (width: number, height: number, points: Point[]) => {
    points.forEach((point) => {
      // Update position
      point.x += point.vx
      point.y += point.vy

      // Mouse repulsion
      const dx = point.x - mouseRef.current.x
      const dy = point.y - mouseRef.current.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < mobileMouseInfluenceDistance) {
        const force = (mobileMouseInfluenceDistance - distance) * mobileMouseRepelStrength
        point.vx += (dx / distance) * force * 0.01
        point.vy += (dy / distance) * force * 0.01
      }

      // Boundary checking
      if (point.x < 0 || point.x > width) point.vx *= -1
      if (point.y < 0 || point.y > height) point.vy *= -1

      // Speed limiting
      const speed = Math.sqrt(point.vx * point.vx + point.vy * point.vy)
      if (speed > mobilePointSpeed) {
        point.vx = (point.vx / speed) * mobilePointSpeed
        point.vy = (point.vy / speed) * mobilePointSpeed
      }

      // Twinkling effect
      point.alpha += (point.targetAlpha - point.alpha) * 0.02
      if (Math.random() < 0.002) {
        point.targetAlpha = Math.random() * 0.3 + mobileBaseAlpha
      }
    })
  }

  // Updated updateConnections function
  const updateConnections = (points: Point[]) => {
    const newConnections: Connection[] = []

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x
        const dy = points[i].y - points[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mobileConnectionDistance) {
          const alpha = (1 - distance / mobileConnectionDistance) * mobileConnectionAlpha
          newConnections.push({
            start: points[i],
            end: points[j],
            alpha,
          })
        }
      }
    }

    return newConnections
  }

  // Updated draw function with adjusted colors and effects
  const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height)
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, '#0f172a')
    gradient.addColorStop(1, '#1e293b')
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)
    
    // Draw connections with subtle glow
    ctx.shadowBlur = 3
    ctx.shadowColor = "rgba(255, 255, 255, 0.1)"
    
    connectionsRef.current.forEach((connection) => {
      ctx.beginPath()
      ctx.moveTo(connection.start.x, connection.start.y)
      ctx.lineTo(connection.end.x, connection.end.y)
      ctx.strokeStyle = `rgba(255, 255, 255, ${connection.alpha})`
      ctx.lineWidth = 0.5
      ctx.stroke()
    })

    // Draw points with subtle glow
    pointsRef.current.forEach((point) => {
      ctx.beginPath()
      ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${point.alpha})`
      ctx.shadowBlur = 8
      ctx.shadowColor = "rgba(255, 255, 255, 0.3)"
      ctx.fill()
    })

    // Reset shadow for performance
    ctx.shadowBlur = 0
  }

  // Animation loop
  const animate = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")

    if (canvas && ctx) {
      updatePoints(canvas.width, canvas.height, pointsRef.current)
      connectionsRef.current = updateConnections(pointsRef.current)
      draw(ctx, canvas.width, canvas.height)
    }

    animationFrameRef.current = requestAnimationFrame(animate)
  }

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const { clientWidth, clientHeight } = document.documentElement
        setDimensions({ width: clientWidth, height: clientHeight })
        canvasRef.current.width = clientWidth
        canvasRef.current.height = clientHeight
        pointsRef.current = initializePoints(clientWidth, clientHeight)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Start animation
  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      pointsRef.current = initializePoints(dimensions.width, dimensions.height)
      animate()
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [dimensions])

  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <motion.canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          mixBlendMode: 'lighten',
          y: y,
        }}
      />
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50"
        style={{ mixBlendMode: 'multiply' }}
      />
    </div>
  )
}

export default ConstellationBackground 