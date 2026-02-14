import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <div className="relative bg-zinc-950 text-white overflow-hidden">
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-zinc-300">New products added weekly</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Welcome to ShopHub</h1>
          <p className="text-lg md:text-xl mb-8 text-zinc-400 max-w-2xl mx-auto">Discover amazing products at unbeatable prices. Your perfect shopping experience starts here.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/products" className="bg-white text-zinc-900 font-medium px-8 py-3 rounded-md hover:bg-zinc-100 transition-colors text-sm">
              Shop Now
            </Link>
            <Link to="/about" className="border border-zinc-700 text-zinc-300 font-medium px-8 py-3 rounded-md hover:bg-white/5 transition-colors text-sm">
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:24px_24px]"></div>
    </div>
  )
}

export default Hero
