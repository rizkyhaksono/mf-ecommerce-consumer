import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Suspense, lazy, createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react"
import { CartProvider } from "./context/CartContext"
import { ToastProvider } from "./context/ToastContext"
import { WishlistProvider } from "./context/WishlistContext"
import { OrderProvider } from "./context/OrderContext"
import Header from "./components/Header"
import Footer from "./components/Footer"
import ToastContainer from "./components/ToastContainer"
import Home from "./pages/Home"
import Products from "./pages/Products"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import OrderSuccess from "./pages/OrderSuccess"
import OrderHistory from "./pages/OrderHistory"
import Wishlist from "./pages/Wishlist"
import About from "./pages/About"

// Try to load AuthProvider from remote, with local fallback
const RemoteAuthProvider = lazy(() =>
  import("authProvider/AuthProvider")
    .then((mod) => ({
      default: mod.AuthProvider,
    }))
    .catch(() => ({
      default: ({ children }: { children: ReactNode }) => <LocalAuthProvider>{children}</LocalAuthProvider>,
    })),
)

// Local fallback AuthProvider if remote fails
interface AuthState {
  user: { id: string; name: string; email: string } | null
  isLoggedIn: boolean
  isLoading: boolean
}

const STORAGE_KEY = "mf-ecommerce-auth"

const AuthContext = createContext<
  | (AuthState & {
      login: (email: string, password: string) => Promise<boolean>
      register: (name: string, email: string, password: string) => Promise<boolean>
      logout: () => void
    })
  | undefined
>(undefined)

const LocalAuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      if (data) {
        const parsed = JSON.parse(data)
        return { user: parsed.user, isLoggedIn: true, isLoading: false }
      }
    } catch {
      /* ignore */
    }
    return { user: null, isLoggedIn: false, isLoading: false }
  })

  useEffect(() => {
    if (state.isLoggedIn && state.user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: state.user }))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
    window.dispatchEvent(
      new CustomEvent("mf:AUTH_CHANGED", {
        detail: { isLoggedIn: state.isLoggedIn, user: state.user },
      }),
    )
  }, [state])

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    setState({ user: null, isLoggedIn: false, isLoading: true })
    await new Promise((r) => setTimeout(r, 800))
    const user = {
      id: `usr-${Date.now().toString(36)}`,
      name: email
        .split("@")[0]
        .replace(/[^a-zA-Z]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      email,
    }
    setState({ user, isLoggedIn: true, isLoading: false })
    return true
  }, [])

  const register = useCallback(async (name: string, email: string, _password: string): Promise<boolean> => {
    setState({ user: null, isLoggedIn: false, isLoading: true })
    await new Promise((r) => setTimeout(r, 800))
    const user = { id: `usr-${Date.now().toString(36)}`, name, email }
    setState({ user, isLoggedIn: true, isLoading: false })
    return true
  }, [])

  const logout = useCallback(() => {
    setState({ user: null, isLoggedIn: false, isLoading: false })
  }, [])

  return <AuthContext.Provider value={{ ...state, login, register, logout }}>{children}</AuthContext.Provider>
}

// Export for potential use by other consumer components
export { AuthContext }

const App = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Suspense fallback={<LocalAuthProvider>{null}</LocalAuthProvider>}>
          <RemoteAuthProvider>
            <CartProvider>
              <WishlistProvider>
                <OrderProvider>
                  <div className="flex flex-col min-h-screen bg-white">
                    <Header />
                    <main className="flex-1">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/order-success" element={<OrderSuccess />} />
                        <Route path="/orders" element={<OrderHistory />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                        <Route path="/about" element={<About />} />
                      </Routes>
                    </main>
                    <Footer />
                  </div>
                  <ToastContainer />
                </OrderProvider>
              </WishlistProvider>
            </CartProvider>
          </RemoteAuthProvider>
        </Suspense>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App
