import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'hwa-cart-v1'
const CartContext = createContext(null)

function readStoredCart() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Storage can be unavailable (private mode); the cart still works in memory.
    }
  }, [items])

  const value = useMemo(
    () => ({
      items,
      count: items.reduce((total, item) => total + item.quantity, 0),
      addItem: (product, quantity = 1) =>
        setItems((current) => {
          const found = current.find((item) => item.id === product.id)
          if (found) {
            return current.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            )
          }
          return [...current, { ...product, quantity }]
        }),
      updateQuantity: (id, quantity) =>
        setItems((current) =>
          quantity <= 0
            ? current.filter((item) => item.id !== id)
            : current.map((item) =>
                item.id === id ? { ...item, quantity } : item,
              ),
        ),
      removeItem: (id) =>
        setItems((current) => current.filter((item) => item.id !== id)),
      clearCart: () => setItems([]),
    }),
    [items],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}
