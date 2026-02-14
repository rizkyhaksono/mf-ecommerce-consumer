const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-zinc-200 border-t-zinc-900 rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-zinc-500 text-sm font-medium">Loading...</p>
      </div>
    </div>
  )
}

export default Loading
