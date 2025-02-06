"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Loader2, XCircle, MessageSquare } from "lucide-react"

interface Message {
  role: string
  content: string
  timestamp: number
}

const ChatWidget: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const [isOpen, setIsOpen] = useState(false) // Manage open/closed state

  // Scroll to the bottom of the messages list whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Function to send a message and handle retries
  const sendMessageWithRetry = async (message: string, retries: number = 3): Promise<string> => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    const abortController = new AbortController()
    abortControllerRef.current = abortController

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [{ role: "user", content: message }] }),
        signal: abortController.signal,
      })

      if (!response.ok) {
        const errorData = await response.json()
        const errorMessage = errorData.error || "An unknown error occurred"
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`)
      }

      const data = await response.json()
      return data.message
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Fetch aborted')
        return ""
      }
      if (retries > 0) {
        console.log(`Retrying... (${retries} retries remaining)`)
        await new Promise(resolve => setTimeout(resolve, 1000))
        return sendMessageWithRetry(message, retries - 1)
      } else {
        throw error
      }
    } finally {
      abortControllerRef.current = null
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return
    setError(null)

    const newMessage: Message = {
      role: "user",
      content: inputMessage.trim(),
      timestamp: Date.now(),
    }

    setMessages(prev => [...prev, newMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const responseText = await sendMessageWithRetry(newMessage.content)

      const assistantMessage: Message = {
        role: "assistant",
        content: responseText,
        timestamp: Date.now(),
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      setError(error instanceof Error ? error.message : "An error occurred")

      const errorMessage: Message = {
        role: "assistant",
        content: "I apologize, but I'm having trouble connecting. Please try again later.",
        timestamp: Date.now(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Initialize with the system prompt on component mount
  useEffect(() => {
    if (isOpen) { // Only show initial message when the chat is open
      const initialMessage: Message = {
        role: "assistant",
        content: "Hello! I am Viacheslav's AI assistant. I am here to help you learn more about him and his work. How can I help you today?",
        timestamp: Date.now(),
      };
      setMessages([initialMessage]);
    } else {
      setMessages([]); // Clear messages when closed
    }
  }, [isOpen]); // Run this effect when isOpen changes

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  // Toggle open/closed state
  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50"
    >
      {/* Conditional rendering based on isOpen */}
      {isOpen ? (
        <div className="bg-gray-800/80 backdrop-blur-md rounded-lg shadow-lg w-80 md:w-96 flex flex-col h-[400px] md:h-[500px]">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">VAI Chat</h2>
            <button
              onClick={toggleOpen} // Use toggleOpen to close
              className="text-gray-400 hover:text-gray-300"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2" style={{ scrollBehavior: "smooth" }}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`${
                    message.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-gray-200"
                  } rounded-lg p-2 max-w-[80%]`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-gray-700">
            {error && (
              <div className="mb-2 text-red-500 text-sm">{error}</div>
            )}
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                placeholder="Type your message..."
                className="flex-1 p-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                  "Send"
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <motion.button
          onClick={toggleOpen} // Use toggleOpen to open
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-gray-700/90 backdrop-blur-md rounded-full p-3 shadow-lg hover:bg-gray-600/90 transition-colors duration-200"
        >
          <MessageSquare className="w-6 h-6 text-white" />
          {/* Add a subtle pulsing effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-500/20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 0, 0.8],
              transition: {
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
              }
            }}
          />
        </motion.button>
      )}
    </motion.div>
  )
}

export default ChatWidget