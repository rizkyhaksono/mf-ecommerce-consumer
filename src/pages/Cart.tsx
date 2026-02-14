import { Suspense, lazy } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import Loading from "../components/Loading"
import RemoteErrorBoundary from "../components/RemoteErrorBoundary"

const ShoppingCart = lazy(() => import("paymentProvider/ShoppingCart"))

const Cart = () => {
  const { items, updateQuantity, removeItem } = useCart()
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (items.length > 0) {
      navigate("/checkout")
    }
  }

  const cartItems = items.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    image: item.image,
    quantity: item.quantity,
    stock: item.stock,
  }))

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">Your Shopping Cart</h1>
          <p className="text-zinc-500 text-sm">Review your items and proceed to checkout</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <RemoteErrorBoundary name="Payment Provider">
            <Suspense fallback={<Loading />}>
              <ShoppingCart items={cartItems} onUpdateQuantity={updateQuantity} onRemoveItem={removeItem} onCheckout={handleCheckout} />
            </Suspense>
          </RemoteErrorBoundary>
        </div>
      </div>
    </div>
  )
}

export default Cart
