import { useState } from "react"
import { Link } from "react-router-dom"
import { useOrders, Order } from "../context/OrderContext"

const statusColors: Record<string, string> = {
  confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  processing: "bg-amber-50 text-amber-700 border-amber-200",
  shipped: "bg-zinc-100 text-zinc-700 border-zinc-200",
  delivered: "bg-green-50 text-green-700 border-green-200",
}

const statusIcons: Record<string, string> = {
  confirmed: "📋",
  processing: "⚙️",
  shipped: "🚚",
  delivered: "✅",
}

const OrderCard = ({ order }: { order: Order }) => {
  const [expanded, setExpanded] = useState(false)
  const date = new Date(order.date)

  return (
    <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden hover:border-zinc-300 transition-all">
      <button onClick={() => setExpanded(!expanded)} className="w-full px-5 py-4 flex items-center justify-between hover:bg-zinc-50 transition-colors text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-zinc-100 rounded-md flex items-center justify-center text-lg">{statusIcons[order.status]}</div>
          <div>
            <div className="font-semibold text-zinc-900 text-sm">{order.id}</div>
            <div className="text-xs text-zinc-500">{date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className={`px-2 py-0.5 rounded border text-xs font-medium capitalize ${statusColors[order.status]}`}>{order.status}</span>
          <span className="text-base font-bold text-zinc-900">${order.total.toFixed(2)}</span>
          <svg className={`w-4 h-4 text-zinc-400 transition-transform ${expanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-zinc-100 px-5 py-5 bg-zinc-50/50">
          <h4 className="font-semibold text-zinc-800 mb-3 text-xs uppercase tracking-wider">Items</h4>
          <div className="space-y-2 mb-5">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 bg-white rounded-md p-3 border border-zinc-100">
                <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-zinc-900 text-sm truncate">{item.name}</div>
                  <div className="text-xs text-zinc-500">Qty: {item.quantity}</div>
                </div>
                <div className="font-semibold text-zinc-900 text-sm">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <h4 className="font-semibold text-zinc-800 mb-2 text-xs uppercase tracking-wider">Shipping To</h4>
          <div className="bg-white rounded-md p-3 border border-zinc-100 mb-5 text-sm text-zinc-600">
            <p className="font-medium text-zinc-900">{order.shipping.fullName}</p>
            <p>{order.shipping.address}</p>
            <p>
              {order.shipping.city}, {order.shipping.postalCode}
            </p>
            <p>{order.shipping.country}</p>
          </div>

          <div className="bg-white rounded-md p-4 border border-zinc-100 space-y-2 text-sm">
            <div className="flex justify-between text-zinc-600">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-zinc-600">
              <span>Shipping</span>
              <span>{order.shippingCost === 0 ? "FREE" : `$${order.shippingCost.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-zinc-600">
              <span>Tax</span>
              <span>${order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-zinc-900 pt-2 border-t border-zinc-200">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
            <div className="text-xs text-zinc-400 pt-1">Payment: •••• {order.paymentLast4}</div>
          </div>
        </div>
      )}
    </div>
  )
}

const OrderHistory = () => {
  const { orders } = useOrders()

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="text-center bg-white border border-zinc-200 rounded-lg p-12 max-w-md">
          <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 mb-2">No Orders Yet</h2>
          <p className="text-zinc-500 text-sm mb-6">Your order history will appear here after your first purchase.</p>
          <Link to="/products" className="inline-block bg-zinc-900 hover:bg-zinc-800 text-white font-medium px-6 py-2.5 rounded-md transition-colors text-sm">
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">Order History</h1>
          <p className="text-zinc-500 text-sm">
            {orders.length} {orders.length === 1 ? "order" : "orders"} placed
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrderHistory
