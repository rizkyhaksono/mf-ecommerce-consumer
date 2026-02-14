import { useToast, Toast } from "../context/ToastContext"

const iconMap: Record<string, string> = {
  success: "✓",
  error: "✕",
  warning: "⚠",
  info: "ℹ",
}

const bgMap: Record<string, string> = {
  success: "bg-white border-zinc-200",
  error: "bg-white border-red-200",
  warning: "bg-white border-amber-200",
  info: "bg-white border-zinc-200",
}

const iconBgMap: Record<string, string> = {
  success: "bg-zinc-900 text-white",
  error: "bg-red-600 text-white",
  warning: "bg-amber-500 text-white",
  info: "bg-zinc-500 text-white",
}

const ToastItem = ({ toast, onRemove }: { toast: Toast; onRemove: () => void }) => {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-md border shadow-lg ${bgMap[toast.type]} animate-slide-in-right`} role="alert">
      <div className={`flex-shrink-0 w-6 h-6 rounded-full ${iconBgMap[toast.type]} flex items-center justify-center text-xs font-bold`}>{iconMap[toast.type]}</div>
      <p className="flex-1 text-sm font-medium text-zinc-900">{toast.message}</p>
      <button onClick={onRemove} className="flex-shrink-0 text-zinc-400 hover:text-zinc-600 transition-colors text-sm" aria-label="Close notification">
        ✕
      </button>
    </div>
  )
}

const ToastContainer = () => {
  const { toasts, removeToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem toast={toast} onRemove={() => removeToast(toast.id)} />
        </div>
      ))}
    </div>
  )
}

export default ToastContainer
