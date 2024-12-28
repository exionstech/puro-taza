import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";

interface Image {
  id: string;
  url: string;
  key: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  discount?: number;
  image: Image[];
  subcategories: any[];
  categoryId: string;
  category: Category;
  discounted_price?: number;
}

interface Category {
  id: string;
  name: string;
  image: Image[];
  product?: Product[];
}

interface CartItem extends Product {
  qty: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (data: Product, qty?: number) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  updateItemQuantity: (id: string, qty: number) => void;
  getItemQuantity: (id: string) => number;
  buyNow: (data: Product, qty?: number) => void;
  removeAllAfterPurchase: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product, qty?: number) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          toast.info("Item already in cart");
          return;
        }

        set({ items: [...currentItems, { ...data, qty: qty || 1 }] });
        toast.success("Item added to cart");
      },
      buyNow: (data: Product, qty?: number) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);
        if (!existingItem) {
          set({ items: [...currentItems, { ...data, qty: qty || 1 }] });
        }
      },
      removeItem: (id: string) => {
        const updatedItems = get().items.filter((item) => item.id !== id);
        set({ items: updatedItems });
        toast.success("Item removed from cart");
      },
      removeAll: () => {
        set({ items: [] });
        toast.success("All items removed from cart");
      },
      removeAllAfterPurchase: () => {
        set({ items: [] });
        toast.success("Order placed successfully");
      },
      updateItemQuantity: (id: string, qty: number) => {
        if (qty < 1) {
          toast.error("Quantity must be at least 1");
          return;
        }

        const updatedItems = get().items.map((item) =>
          item.id === id ? { ...item, qty } : item
        );
        set({ items: updatedItems });
        toast.success("Item quantity updated");
      },
      getItemQuantity: (id: string) => {
        const item = get().items.find((item) => item.id === id);
        return item?.qty || 0;
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;