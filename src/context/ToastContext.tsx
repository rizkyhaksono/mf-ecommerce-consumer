import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react"
import { eventBus, ToastType } from "../lib/eventBus"

export interface Toast {
  id: string
  message: string
  type: ToastType
  duration: number
}

interface ToastContextType {
  toasts: Toast[]
  showToast: (message: string, type?: ToastType, duration?: number) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback(
    (message: string, type: ToastType = "info", duration = 3000) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
      const toast: Toast = { id, message, type, duration }
      setToasts((prev) => [...prev.slice(-4), toast]) // keep max 5

      setTimeout(() => removeToast(id), duration)
    },
    [removeToast],
  )

  // Listen for cross-MF toast events
  useEffect(() => {
    return eventBus.on("TOAST", ({ message, type, duration }) => {
      showToast(message, type, duration)
    })
  }, [showToast])

  return <ToastContext.Provider value={{ toasts, showToast, removeToast }}>{children}</ToastContext.Provider>
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
