import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-white mt-0">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-base font-semibold mb-4">ShopHub</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">Your one-stop destination for quality products. Built with modern micro frontend architecture.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { to: "/", label: "Home" },
                { to: "/products", label: "Products" },
                { to: "/cart", label: "Cart" },
                { to: "/orders", label: "Orders" },
                { to: "/wishlist", label: "Wishlist" },
                { to: "/about", label: "About" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-zinc-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li>Contact Us</li>
              <li>Shipping Info</li>
              <li>Returns</li>
              <li>FAQ</li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Connect</h4>
            <div className="flex gap-3">
              {["GitHub", "Twitter", "Email"].map((platform) => (
                <a key={platform} href="#" className="w-9 h-9 bg-zinc-800 hover:bg-zinc-700 rounded-md flex items-center justify-center transition-colors text-xs font-medium text-zinc-400 hover:text-white">
                  {platform[0]}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-10 pt-8 text-center text-sm text-zinc-500">
          <p>&copy; {new Date().getFullYear()} ShopHub. All rights reserved. Built with Module Federation.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
