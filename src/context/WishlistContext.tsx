import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react"
import { Product } from "../types"
import eventBus from "../lib/eventBus"

interface WishlistContextType {
  items: Product[]
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  isWishlisted: (productId: string) => boolean
  toggleWishlist: (product: Product) => void
  getCount: () => number
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

const STORAGE_KEY = "mf-ecommerce-wishlist"

const loadFromStorage = (): Product[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Product[]>(loadFromStorage)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addToWishlist = useCallback((product: Product) => {
    setItems((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev
      return [...prev, product]
    })
    eventBus.emit("WISHLIST_UPDATED", { productId: product.id, action: "add" })
    eventBus.emit("TOAST", { message: `${product.name} added to wishlist ❤️`, type: "success" })
  }, [])

  const removeFromWishlist = useCallback((productId: string) => {
    setItems((prev) => prev.filter((p) => p.id !== productId))
    eventBus.emit("WISHLIST_UPDATED", { productId, action: "remove" })
    eventBus.emit("TOAST", { message: "Removed from wishlist", type: "info" })
  }, [])

  const isWishlisted = useCallback((productId: string) => items.some((p) => p.id === productId), [items])

  const toggleWishlist = useCallback(
    (product: Product) => {
      if (isWishlisted(product.id)) {
        removeFromWishlist(product.id)
      } else {
        addToWishlist(product)
      }
    },
    [isWishlisted, addToWishlist, removeFromWishlist],
  )

  const getCount = useCallback(() => items.length, [items])

  const clearWishlist = useCallback(() => setItems([]), [])

  return <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isWishlisted, toggleWishlist, getCount, clearWishlist }}>{children}</WishlistContext.Provider>
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) throw new Error("useWishlist must be used within a WishlistProvider")
  return context
}
