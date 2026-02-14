# mf-ecommerce-consumer

The **consumer/host application** for the ShopHub e-commerce platform. Orchestrates all remote micro-frontend modules into a unified user experience.

## Role

This is the main entry point that users visit. It imports components from the three provider micro-frontends via Module Federation:

- **Product Provider** — product catalog, grid, details
- **Payment Provider** — shopping cart, checkout
- **Auth Provider** — login modal, user menu, auth context

## Features

- Page routing (Home, Products, Orders, About)
- Cart management via `CartContext`
- Toast notification system via `ToastContext`
- Error boundaries with retry logic for remote components
- Event bus for cross-MFE communication
- Responsive header with navigation, wishlist, cart, and auth

## Exposed Modules

| Module     | Path                    |
| ---------- | ----------------------- |
| `eventBus` | `./src/lib/eventBus.ts` |

## Development

```bash
bun install
bun run dev        # starts on :3000
bun run build
bun run preview
```

> **Note:** All providers must be running for remote components to load. Use `bun run dev` from the root to start everything.

## Port

`http://localhost:3000`
