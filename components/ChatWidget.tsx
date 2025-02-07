"use client"

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { motion } from "framer-motion"
import { Loader2, XCircle, MessageSquare } from "lucide-react"

interface Message {
  id: string
  role: string
  content: string
  timestamp: number
}

const MessageItem = React.memo<{ message: Message }>(({ message }) => (
  <div
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
));

const ChatWidget: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const sendMessageWithRetry = useCallback(async (message: string, retries: number = 3): Promise<string> => {
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
  }, [])

  const handleSendMessage = useCallback(async () => {
    if (!inputMessage.trim() || isLoading) return
    setError(null)

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
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
        id: `msg-${Date.now()}`,
        role: "assistant",
        content: responseText,
        timestamp: Date.now(),
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      setError(error instanceof Error ? error.message : "An error occurred")

      const errorMessage: Message = {
        id: `msg-${Date.now()}`,
        role: "assistant",
        content: "I apologize, but I'm having trouble connecting. Please try again later.",
        timestamp: Date.now(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }, [inputMessage, isLoading, sendMessageWithRetry])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }, [handleSendMessage])

  const toggleOpen = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  useEffect(() => {
    if (isOpen) {
      const initialMessage: Message = {
        id: `msg-${Date.now()}`,
        role: "assistant",
        content: "Hello there! I am here to help you learn more about me and my work. How can I help you today? By the way, we can chat in any language :)",
        timestamp: Date.now(),
      };
      setMessages([initialMessage]);
    } else {
      setMessages([]);
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  const memoizedMessages = useMemo(() => 
    messages.map(message => (
      <MessageItem key={message.id} message={message} />
    )), 
    [messages]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50"
    >
      {isOpen ? (
        <div className="bg-gray-800/80 backdrop-blur-md rounded-lg shadow-lg w-80 md:w-96 flex flex-col h-[400px] md:h-[500px]">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">VAI Chat</h2>
            <button
              onClick={toggleOpen}
              className="text-gray-400 hover:text-gray-300"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2" style={{ scrollBehavior: "smooth" }}>
            {memoizedMessages}
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
                onKeyDown={handleKeyDown}
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
                {isLoading ? <Loader2 className="animate-spin" /> : "Send"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <motion.button
          onClick={toggleOpen}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <MessageSquare />
        </motion.button>
      )}
    </motion.div>
  )
}

export default React.memo(ChatWidget);