import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react"
import { CartItem, ShippingInfo, PaymentInfo } from "../types"

export interface Order {
  id: string
  items: CartItem[]
  shipping: ShippingInfo
  paymentLast4: string
  subtotal: number
  shippingCost: number
  tax: number
  total: number
  date: string
  status: "confirmed" | "processing" | "shipped" | "delivered"
}

interface OrderContextType {
  orders: Order[]
  addOrder: (items: CartItem[], shipping: ShippingInfo, payment: PaymentInfo) => Order
  getOrderById: (id: string) => Order | undefined
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

const STORAGE_KEY = "mf-ecommerce-orders"

const loadFromStorage = (): Order[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>(loadFromStorage)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
  }, [orders])

  const addOrder = useCallback((items: CartItem[], shipping: ShippingInfo, payment: PaymentInfo): Order => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shippingCost = subtotal > 50 ? 0 : 10
    const tax = subtotal * 0.1
    const total = subtotal + shippingCost + tax

    const order: Order = {
      id: `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      items,
      shipping,
      paymentLast4: payment.cardNumber.slice(-4),
      subtotal,
      shippingCost,
      tax,
      total,
      date: new Date().toISOString(),
      status: "confirmed",
    }

    setOrders((prev) => [order, ...prev])
    return order
  }, [])

  const getOrderById = useCallback((id: string) => orders.find((o) => o.id === id), [orders])

  return <OrderContext.Provider value={{ orders, addOrder, getOrderById }}>{children}</OrderContext.Provider>
}

export const useOrders = () => {
  const context = useContext(OrderContext)
  if (!context) throw new Error("useOrders must be used within an OrderProvider")
  return context
}
