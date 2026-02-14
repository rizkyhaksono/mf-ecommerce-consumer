import { Link } from "react-router-dom"
import { useWishlist } from "../context/WishlistContext"
import { useCart } from "../context/CartContext"
import { Product } from "../types"

const Wishlist = () => {
  const { items, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleMoveToCart = (product: Product) => {
    addToCart(product, 1)
    removeFromWishlist(product.id)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="text-center bg-white border border-zinc-200 rounded-lg p-12 max-w-md">
          <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 mb-2">Your Wishlist is Empty</h2>
          <p className="text-zinc-500 text-sm mb-6">Save your favorite products here for later!</p>
          <Link to="/products" className="inline-block bg-zinc-900 hover:bg-zinc-800 text-white font-medium px-6 py-2.5 rounded-md transition-colors text-sm">
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">My Wishlist</h1>
          <p className="text-zinc-500 text-sm">
            {items.length} {items.length === 1 ? "item" : "items"} saved
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((product) => (
            <div key={product.id} className="bg-white border border-zinc-200 rounded-lg overflow-hidden hover:border-zinc-400 hover:shadow-sm transition-all">
              <div className="relative h-48 overflow-hidden bg-zinc-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                {product.featured && <span className="absolute top-2 left-2 bg-zinc-900 text-white px-2 py-0.5 rounded text-xs font-medium">Featured</span>}
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-zinc-900 mb-1">{product.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-zinc-900">${product.price}</span>
                  <span className="text-xs text-zinc-500">{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleMoveToCart(product)}
                    disabled={product.stock === 0}
                    className="flex-1 bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-200 disabled:text-zinc-400 text-white font-medium py-2 px-3 rounded-md transition-colors text-sm"
                  >
                    Move to Cart
                  </button>
                  <button onClick={() => removeFromWishlist(product.id)} className="bg-zinc-100 hover:bg-red-50 text-zinc-500 hover:text-red-500 font-medium py-2 px-3 rounded-md transition-colors" aria-label="Remove from wishlist">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Wishlist
