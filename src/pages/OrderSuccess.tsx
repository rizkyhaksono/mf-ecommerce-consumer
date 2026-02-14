import { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"

const OrderSuccess = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/")
    }, 5000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white border border-zinc-200 rounded-lg p-10 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-zinc-900 mb-3">Order Successful!</h1>
        <p className="text-zinc-500 mb-6 text-sm">Thank you for your purchase. Your order has been confirmed and will be shipped soon.</p>

        {/* Order Details */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-md p-4 mb-6 space-y-2 text-sm">
          <div className="flex items-center justify-center gap-2 text-zinc-700">
            <svg className="w-4 h-4 text-zinc-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Order Confirmation Email Sent</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-zinc-700">
            <svg className="w-4 h-4 text-zinc-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Estimated Delivery: 3-5 Business Days</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/products" className="bg-zinc-900 hover:bg-zinc-800 text-white font-medium px-6 py-2.5 rounded-md transition-colors text-sm">
            Continue Shopping
          </Link>
          <Link to="/orders" className="bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-medium px-6 py-2.5 rounded-md transition-colors text-sm">
            View Orders
          </Link>
        </div>

        <p className="text-xs text-zinc-400 mt-6">Redirecting to homepage in 5 seconds...</p>
      </div>
    </div>
  )
}

export default OrderSuccess
