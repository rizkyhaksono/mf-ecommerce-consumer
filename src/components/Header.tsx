import { Suspense, lazy, useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"
import RemoteErrorBoundary from "./RemoteErrorBoundary"

const LoginModal = lazy(() => import("authProvider/LoginModal"))
const UserMenu = lazy(() => import("authProvider/UserMenu"))

const Header = () => {
  const { getCartCount } = useCart()
  const { getCount: getWishlistCount } = useWishlist()
  const location = useLocation()
  const cartCount = getCartCount()
  const wishlistCount = getWishlistCount()
  const [showLogin, setShowLogin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return !!localStorage.getItem("mf-ecommerce-auth")
    } catch {
      return false
    }
  })

  // Listen for auth changes from auth provider
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail
      setIsLoggedIn(detail?.isLoggedIn ?? false)
    }
    window.addEventListener("mf:AUTH_CHANGED", handler)
    return () => window.removeEventListener("mf:AUTH_CHANGED", handler)
  }, [])

  const isActive = (path: string) => location.pathname === path

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/orders", label: "Orders" },
    { path: "/about", label: "About" },
  ]

  return (
    <>
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-zinc-900 rounded-lg flex items-center justify-center group-hover:bg-zinc-700 transition-colors">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <span className="text-lg font-semibold text-zinc-900">ShopHub</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(link.path) ? "bg-zinc-100 text-zinc-900" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"}`}>
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Wishlist */}
              <Link to="/wishlist" className={`relative p-2 rounded-md transition-colors ${isActive("/wishlist") ? "bg-zinc-100" : "hover:bg-zinc-50"}`} aria-label="Wishlist">
                <svg className="w-5 h-5 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-zinc-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{wishlistCount}</span>}
              </Link>

              {/* Cart */}
              <Link to="/cart" className={`relative flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive("/cart") ? "bg-zinc-900 text-white" : "text-zinc-600 hover:bg-zinc-50"}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="hidden sm:inline">Cart</span>
                {cartCount > 0 && <span className={`w-5 h-5 text-[11px] font-bold rounded-full flex items-center justify-center ${isActive("/cart") ? "bg-white text-zinc-900" : "bg-zinc-900 text-white"}`}>{cartCount}</span>}
              </Link>

              {/* Auth */}
              <Suspense fallback={null}>
                <RemoteErrorBoundary name="Auth Provider">
                  {isLoggedIn ? (
                    <UserMenu />
                  ) : (
                    <button onClick={() => setShowLogin(true)} className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-medium rounded-md transition-colors">
                      Sign In
                    </button>
                  )}
                </RemoteErrorBoundary>
              </Suspense>
            </div>
          </div>
        </div>
      </header>

      {/* Login Modal */}
      <Suspense fallback={null}>
        <RemoteErrorBoundary name="Auth Provider">{showLogin && <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />}</RemoteErrorBoundary>
      </Suspense>
    </>
  )
}

export default Header
