import { ListItem } from '@mui/material';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Product {
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

interface StoreState {
    cart: Product[];
    addToCart: (item: Product) => void;
    removeFromCart: (item: Product) => void;
    decreaseQuantity: (item: Product) => void;
    clearCart: () => void;
    favourites: Product[];
    addToFavourites: (item: Product) => void;
    removeFromFavourites: (item: Product) => void;
}

const useStore = create<StoreState>()(
    persist(
        (set) => ({
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
                            cart: state.cart.map((product) => product.id === item.id && product.color === item.color && product.size === item.size ? { ...product, quantity: String(Number(product.quantity) - 1) } : product)
                        }
                    } else {
                        return { cart: [...state.cart] }
                    }
                }),
            
            clearCart: () => set({cart: []}),

            favourites: [],

            addToFavourites: (item) => 
                set((state) => {
                    const existingItem = state.favourites.find((product) => product.id === item.id && product.color === item.color && product.size === item.size);
                    if(existingItem) {
                        return {favourites: state.favourites}
                    } else {
                        return {favourites: [...state.favourites, item]}
                    }
                }),
            
            removeFromFavourites: (item) => 
                set((state) => ({
                    favourites: state.favourites.filter((product) => !(product.id === item.id && product.color === item.color && product.size === item.size))
                })),
        }),
        {
            name: "EmeyStore",
            partialize: (state) => ( { cart: state.cart, favourites: state.favourites, })
        }
    )
);

export default useStore;