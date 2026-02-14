import { Link } from "react-router-dom"

const About = () => {
  const techStack = [
    { name: "React 18", description: "UI library for building interfaces" },
    { name: "Module Federation", description: "Micro-frontend architecture" },
    { name: "Rsbuild", description: "Build tool and dev server" },
    { name: "TypeScript", description: "Type-safe development" },
    { name: "Tailwind CSS", description: "Utility-first CSS framework" },
    { name: "React Router", description: "Client-side routing" },
  ]

  const architecture = [
    { name: "Consumer", port: "3000", desc: "Main application shell — routing, layout, cart" },
    { name: "Product Provider", port: "3002", desc: "Product catalog components and data" },
    { name: "Payment Provider", port: "3001", desc: "Shopping cart, checkout form, payments" },
    { name: "Auth Provider", port: "3003", desc: "Authentication — login, register, user menu" },
  ]

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-zinc-900 mb-4">About ShopHub</h1>
          <p className="text-zinc-500 max-w-2xl mx-auto">A modern e-commerce application built with micro-frontend architecture, demonstrating how independently deployed frontends can compose into a unified experience.</p>
        </div>

        {/* Architecture */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-zinc-900 mb-6 text-center">Architecture</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {architecture.map((item) => (
              <div key={item.name} className="bg-white border border-zinc-200 rounded-lg p-5 hover:border-zinc-300 transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-zinc-900 text-white rounded-md flex items-center justify-center text-xs font-bold">{item.port}</div>
                  <h3 className="font-semibold text-zinc-900">{item.name}</h3>
                </div>
                <p className="text-sm text-zinc-500 ml-11">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-zinc-900 mb-6 text-center">Tech Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
            {techStack.map((tech) => (
              <div key={tech.name} className="bg-white border border-zinc-200 rounded-lg p-4 text-center hover:border-zinc-300 transition-all">
                <h3 className="font-semibold text-zinc-900 text-sm mb-1">{tech.name}</h3>
                <p className="text-xs text-zinc-500">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-zinc-900 mb-6 text-center">Key Features</h2>
          <div className="max-w-2xl mx-auto bg-white border border-zinc-200 rounded-lg divide-y divide-zinc-100">
            {[
              "Cross-MF Event Bus for decoupled communication",
              "Centralized authentication with remote login modal",
              "Toast notifications replacing native alerts",
              "Error boundaries with retry for offline providers",
              "Wishlist with localStorage persistence",
              "Order history with expandable details",
              "Shared React singletons across all micro-frontends",
            ].map((feature, i) => (
              <div key={i} className="px-5 py-3 flex items-center gap-3">
                <svg className="w-4 h-4 text-zinc-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-zinc-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/products" className="inline-block bg-zinc-900 hover:bg-zinc-800 text-white font-medium px-8 py-3 rounded-md transition-colors text-sm">
            Start Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default About
