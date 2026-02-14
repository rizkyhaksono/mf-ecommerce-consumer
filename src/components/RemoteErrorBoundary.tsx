import React, { Component, ReactNode } from "react"

interface Props {
  children: ReactNode
  name: string
}

interface State {
  hasError: boolean
  error: Error | null
}

class RemoteErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`[${this.props.name}] Remote module error:`, error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[300px] flex items-center justify-center p-8">
          <div className="max-w-md w-full bg-white border border-zinc-200 rounded-lg overflow-hidden">
            {/* Header */}
            <div className="bg-zinc-900 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">{this.props.name} Unavailable</h3>
                  <p className="text-zinc-400 text-xs">Remote module failed to load</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
              <p className="text-zinc-600 text-sm mb-4">This component could not be loaded. The remote service might be offline.</p>

              {this.state.error && (
                <div className="bg-zinc-50 border border-zinc-200 rounded-md p-3 mb-4">
                  <code className="text-xs text-zinc-600 break-all">{this.state.error.message}</code>
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={this.handleRetry} className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white font-medium py-2.5 px-4 rounded-md transition-colors text-sm">
                  ↻ Retry
                </button>
                <button onClick={() => window.location.reload()} className="flex-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-medium py-2.5 px-4 rounded-md transition-colors text-sm">
                  Reload
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default RemoteErrorBoundary
