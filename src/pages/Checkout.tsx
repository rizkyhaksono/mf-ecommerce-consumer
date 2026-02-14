import { Suspense, lazy } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useOrders } from "../context/OrderContext"
import { useToast } from "../context/ToastContext"
import { ShippingInfo, PaymentInfo } from "../types"
import Loading from "../components/Loading"
import RemoteErrorBoundary from "../components/RemoteErrorBoundary"

const CheckoutForm = lazy(() => import("paymentProvider/CheckoutForm"))

const Checkout = () => {
  const { items, clearCart } = useCart()
  const { addOrder } = useOrders()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const handleCompleteOrder = (shippingInfo: ShippingInfo, paymentInfo: PaymentInfo) => {
    const order = addOrder(items, shippingInfo, paymentInfo)
    console.log("Order completed:", order)

    clearCart()
    showToast(`Order ${order.id} placed successfully!`, "success", 4000)
    navigate("/order-success")
  }

  const handleBack = () => {
    navigate("/cart")
  }

  const cartItems = items.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    image: item.image,
    quantity: item.quantity,
    stock: item.stock,
  }))

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="text-center bg-white border border-zinc-200 rounded-lg p-12">
          <svg className="w-16 h-16 mx-auto text-zinc-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-zinc-900 mb-3">Your cart is empty</h2>
          <p className="text-zinc-500 mb-6 text-sm">Add some products before checking out</p>
          <button onClick={() => navigate("/products")} className="bg-zinc-900 hover:bg-zinc-800 text-white font-medium px-6 py-2.5 rounded-md transition-colors text-sm">
            Browse Products
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">Checkout</h1>
          <p className="text-zinc-500 text-sm">Complete your order in a few simple steps</p>
        </div>

        <RemoteErrorBoundary name="Payment Provider">
          <Suspense fallback={<Loading />}>
            <CheckoutForm items={cartItems} onComplete={handleCompleteOrder} onBack={handleBack} />
          </Suspense>
        </RemoteErrorBoundary>
      </div>
    </div>
  )
}

export default Checkout
