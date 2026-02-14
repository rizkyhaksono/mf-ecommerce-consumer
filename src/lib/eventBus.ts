// Cross-MF Event Bus using CustomEvents on window
// This allows decoupled communication between micro-frontends

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface EventMap {
  CART_UPDATED: { itemCount: number };
  TOAST: { message: string; type: ToastType; duration?: number };
  AUTH_CHANGED: { isLoggedIn: boolean; user?: { name: string; email: string } };
  WISHLIST_UPDATED: { productId: string; action: 'add' | 'remove' };
  ORDER_COMPLETED: { orderId: string; total: number };
}

type EventKey = keyof EventMap;

class EventBus {
  emit<K extends EventKey>(event: K, data: EventMap[K]) {
    window.dispatchEvent(
      new CustomEvent(`mf:${event}`, { detail: data })
    );
  }

  on<K extends EventKey>(event: K, callback: (data: EventMap[K]) => void): () => void {
    const handler = (e: Event) => {
      callback((e as CustomEvent).detail);
    };
    window.addEventListener(`mf:${event}`, handler);
    return () => window.removeEventListener(`mf:${event}`, handler);
  }

  off<K extends EventKey>(event: K, callback: (data: EventMap[K]) => void) {
    window.removeEventListener(`mf:${event}`, callback as unknown as EventListener);
  }
}

export const eventBus = new EventBus();
export default eventBus;
