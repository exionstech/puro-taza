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

interface WishlistStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  isItemInWishlist: (id: string) => boolean;
}

const useWishlist = create(
  persist<WishlistStore>(
    (set, get) => ({
      items: [],
      
      addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          toast.info("Item already in wishlist");
          return;
        }

        set({ items: [...currentItems, data] });
        toast.success("Item added to wishlist");
      },

      removeItem: (id: string) => {
        const updatedItems = get().items.filter((item) => item.id !== id);
        set({ items: updatedItems });
        toast.success("Item removed from wishlist");
      },

      removeAll: () => {
        set({ items: [] });
        toast.success("Wishlist cleared");
      },

      isItemInWishlist: (id: string) => {
        return get().items.some((item) => item.id === id);
      },
    }),
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useWishlist;