import useStore from "../store/store";
import { Link, useNavigate } from "react-router";
import { useMemo } from "react";
import toastEmitter from "../components/ui/toast";
import { signupApi } from "../api/userApi";

const Cart = () => {
    const navigate = useNavigate();
    const { cart, addToCart, removeFromCart, decreaseQuantity, addToFavourites, user } = useStore();

    const addToFavouriteFunc = (item: any) => {
        addToFavourites(item)

        toastEmitter({ title: "item added to favourites", type: "default" })
    }

    const calcTotal = useMemo(() => {
        return cart.reduce((acc, item) => {
            const price = Number(item.price);
            const quantity = Number(item.quantity);
            return acc + price * quantity;
        }, 0);
    }, [cart]);

    const checkOut = () => {
        if(!user) {
            toastEmitter({title: "Please Login to Proceed Checkout", type: "default"});
            navigate("/login");
        } else {
            navigate("/checkout");
        }
    }

    return cart.length > 0 ? (
        <section className="bg-white py-8 antialiased md:py-16 bg-[url(/img/white_bubble.webp)] bg-cover bg-center">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <h2 className=" text-[] text-4xl text-center sm:text-5xl mt-24 sm:mt-16 font-[BananaYeti]">Shopping Cart</h2>

                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                    <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-3xl">
                        <div className="space-y-6">
                            {cart.map((item) => (
                                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                        <a href="#" className="shrink-0 md:order-1">
                                            <img className="h-20" src={item.image} alt="imac image" onClick={() => navigate(`/product/${item.id}`)}/>
                                        </a>

                                        <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
                                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                                            <div className="flex items-center">
                                                <button type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100" onClick={() => decreaseQuantity(item)}>
                                                    <svg className="h-2.5 w-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                                    </svg>
                                                </button>
                                                <input type="text" id="counter-input" data-input-counter className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0" placeholder="" value={item.quantity} required readOnly />
                                                <button type="button" id="increment-button" data-input-counter-increment="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100" onClick={() => addToCart(item)}>
                                                    <svg className="h-2.5 w-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="text-end md:order-4 md:w-32">
                                                <p className="text-base font-bold text-gray-900">${item.price}</p>
                                            </div>
                                        </div>

                                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                            <div>
                                                <a href="#" className="text-base font-medium text-gray-900 hover:underline">{item.title}</a>
                                                <p className="mt-1 text-gray-500">Color: <span className="text-black">{item.color}</span></p>
                                                <p className="mt-1 text-gray-500">Size: <span className="text-black">{item.size}</span></p>
                                            </div>

                                            <div className="flex items-center gap-4" onClick={() => addToFavouriteFunc(item)}>
                                                <button type="button" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline">
                                                    <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                                                    </svg>
                                                    Add to Favorites
                                                </button>

                                                <button type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline" onClick={() => removeFromCart(item)}>
                                                    <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                                    </svg>
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mx-auto mt-6 w-full max-w-md flex-1 space-y-6 lg:mt-0">
                        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                            <p className="text-xl font-semibold text-gray-900">Order summary</p>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-base font-normal text-gray-500">Original price</span>
                                        <span className="text-base font-medium text-gray-900">${calcTotal.toFixed(2)}</span>
                                    </div>

                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-base font-normal text-gray-500">Savings</span>
                                        <span className="text-base font-medium text-green-600">-$0.00</span>
                                    </div>

                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-base font-normal text-gray-500">Store Pickup</span>
                                        <span className="text-base font-medium text-gray-900">$0.00</span>
                                    </div>

                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-base font-normal text-gray-500">Tax</span>
                                        <span className="text-base font-medium text-gray-900">$0.00</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                                    <span className="text-base font-bold text-gray-900">Total</span>
                                    <span className="text-base font-bold text-gray-900">${calcTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <button className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-[#210036] focus:outline-none focus:ring-4 focus:ring-primary-300 bg-[#7038ed] transition-colors" onClick={checkOut}>Proceed to Checkout</button>

                            <div className="flex items-center justify-center gap-2">
                                <span className="text-sm font-normal text-gray-500"> or </span>
                                <Link to="/shop" title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline text-[#7038ed]">
                                    Continue Shopping
                                    <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    ) : (
        <div className="h-screen flex flex-col justify-center items-center">
            <iframe src="https://lottie.host/embed/01d4f06d-9f90-41e8-ad4e-f14011b8a6f2/kR62BN2cBE.lottie" className="h-80"></iframe>
            <div className="text-4xl">Your Cart is Empty</div>
            <button className="mt-4 border-2 p-2 rounded-lg bg-[#7038ed] text-white hover:bg-[#210036] transition-colors" onClick={() => navigate("/shop")}>Go to Shop</button>
        </div>
    )
}

export default Cart