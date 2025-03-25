import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProductInterface {
    id: string;
    title: string;
    description: string;
    price: string;
    image: string;
    category: string;
    quantity: string;
    color: string;
    size: string;
}
interface userInterface {
    id: string;
    name: string;
    email: string;
}

interface StoreState {
    cart: ProductInterface[];
    addToCart: (item: ProductInterface) => void;
    removeFromCart: (item: ProductInterface) => void;
    decreaseQuantity: (item: ProductInterface) => void;
    clearCart: () => void;
    favourites: ProductInterface[];
    addToFavourites: (item: ProductInterface) => void;
    removeFromFavourites: (item: ProductInterface) => void;
    user: userInterface | null;
    setUser: (user: userInterface) => void;
    removeUser: () => void;
}

const useStore = create<StoreState>()(
    persist(
        (set) => ({

            // Cart
            cart: [],
            addToCart: (item) =>
                set((state) => {
                    const existingItem = state.cart.find((product) => product.id === item.id && product.color === item.color && product.size === item.size);
                    if (existingItem) {
                        return {
                            cart: state.cart.map((product) => product.id === item.id && product.color === item.color && product.size === item.size ? { ...product, quantity: String(Number(product.quantity) + 1) } : product)
                        }
                    } else {
                        return { cart: [...state.cart, item] }
                    }
                }),
            removeFromCart: (item) =>
                set((state) => ({
                    cart: state.cart.filter((product) => !(product.id === item.id && product.color === item.color && product.size === item.size))
                })),
            decreaseQuantity: (item) =>
                set((state) => {
                    const existingItem = state.cart.find((product) => product.id === item.id && product.color === item.color && product.size === item.size);
                    if (existingItem) {
                        return {
                            cart: state.cart.map((product) => product.id === item.id && product.color === item.color && product.size === item.size ? { ...product, quantity: String(Math.max(Number(product.quantity) - 1, 1)) } : product)
                        }
                    } else {
                        return { cart: [...state.cart] }
                    }
                }),
            clearCart: () => set({ cart: [] }),

            // Favourites
            favourites: [],
            addToFavourites: (item) =>
                set((state) => {
                    const existingItem = state.favourites.find((product) => product.id === item.id && product.color === item.color && product.size === item.size);
                    if (existingItem) {
                        return { favourites: state.favourites }
                    } else {
                        return { favourites: [...state.favourites, item] }
                    }
                }),
            removeFromFavourites: (item) =>
                set((state) => ({
                    favourites: state.favourites.filter((product) => !(product.id === item.id && product.color === item.color && product.size === item.size))
                })),


            // User
            user: null,
            setUser: (item) => set({user: item}),
            removeUser: () => set({user: null})
        }),
        {
            name: "EmeyStore",
            partialize: (state) => ({ cart: state.cart, favourites: state.favourites, user: state.user })
        }
    )
);

export default useStore;