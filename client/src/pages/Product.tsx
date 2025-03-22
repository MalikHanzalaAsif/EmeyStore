import Products from "../utils/Products";
import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import useStore from "../store/store";
import toastEmitter from "../components/ui/toast";
import colors from "../utils/colors";
import { Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const sizes = ['SM', 'MD', 'LG', 'XL', 'XXL'];
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

const Product = () => {
    const navigate = useNavigate();
    const { addToCart, addToFavourites } = useStore();

    const { id } = useParams();
    const currProduct = Products.find(product => product.id === id);
    const [currProductState, setCurrProductState] = useState<any>(currProduct);
    const [zoomModalOpen, setZoomModalOpen] = useState(false);

    const changeColor = (newColor: string) => {
        setCurrProductState((prev: any) => ({
            ...prev,
            color: newColor
        }))
        console.log("color changed!")
    }

    const changeSize = (newSize: string) => {
        setCurrProductState((prev: any) => ({
            ...prev,
            size: newSize
        }))
        console.log("size changed!")
    }

    const addToFavouriteFunc = () => {
        addToFavourites(currProductState)

        toastEmitter({ title: "item added to favourites", type: "default" })
    }

    const addToCartFunc = () => {
        addToCart(currProductState);

        toastEmitter({ title: "item added to cart", type: "default", navigate: navigate, redirectRoute: "/cart", redirectButton: "Cart" });
    }

    return currProduct ? (
        <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased mt-32 bg-[url(/img/white_bubble.webp)] bg-cover bg-center" >
            <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
                <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                    <div className="shrink-0 max-w-md lg:max-w-lg mx-auto flex justify-center">
                        <img className="h-80 dark:hidden cursor-pointer" src={currProduct.image} alt={currProduct.title} onClick={() => setZoomModalOpen(true)}/>
                    </div>

                    <div className="mt-6 sm:mt-8 lg:mt-0">
                        <h1
                            className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
                        >
                            {currProduct.title}
                        </h1>
                        <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                            <p
                                className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white"
                            >
                                ${currProduct.price}
                            </p>

                            <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                <div className="flex items-center gap-1">
                                    <svg
                                        className="w-4 h-4 text-yellow-300"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                                        />
                                    </svg>
                                    <svg
                                        className="w-4 h-4 text-yellow-300"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                                        />
                                    </svg>
                                    <svg
                                        className="w-4 h-4 text-yellow-300"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                                        />
                                    </svg>
                                    <svg
                                        className="w-4 h-4 text-yellow-300"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                                        />
                                    </svg>
                                    <svg
                                        className="w-4 h-4 text-yellow-300"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                                        />
                                    </svg>
                                </div>
                                <p
                                    className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400"
                                >
                                    (5.0)
                                </p>
                            </div>
                        </div>
                        <div id="ModalOptions">
                            <div id="ColorSelect" className="mt-8">
                                <h3 className="text-2xl mb-2">Color</h3>
                                <div className="flex space-x-3">
                                    {colors.map((color) => (
                                        <div
                                            key={color.name}
                                            className={`w-6 h-6 rounded-full cursor-pointer 
                                                ${currProductState.color === color.name ? 'ring-2 ring-offset-2 ring-gray-800' : ''}`}
                                            style={{
                                                backgroundColor: color.colorCode,
                                                border: color.border ? '1px solid #ddd' : 'none'
                                            }}
                                            onClick={() => changeColor(color.name)}
                                        ></div>
                                    ))}
                                </div>

                            </div>
                            <div id="SizeSelect" className="mt-8">
                                <h3 className="text-2xl mb-2">Size</h3>
                                <div className="flex space-x-2">
                                    {sizes.map((size) => (
                                        <button
                                            key={size}
                                            className={`px-3 py-1 border rounded-md 
                                                ${currProductState.size === size
                                                    ? 'border-gray-800 bg-gray-800 text-white'
                                                    : 'border-gray-300 hover:bg-gray-100 hover:text-black cursor-pointer'
                                                }`}
                                            onClick={() => changeSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>

                            </div>
                        </div>

                        <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                            <a
                                href="#"
                                title=""
                                className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                role="button"
                                onClick={addToFavouriteFunc}
                            >
                                <svg
                                    className="w-5 h-5 -ms-2 me-2"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                                    />
                                </svg>
                                Add to favorites
                            </a>

                            <a
                                href="#"
                                title=""
                                className="text-white mt-4 sm:mt-0 bg-[#7038ed] hover:bg-[#210036] font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center transition-colors"
                                role="button"
                                onClick={addToCartFunc}
                            >
                                <svg
                                    className="w-5 h-5 -ms-2 me-2"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                                    />
                                </svg>

                                Add to cart
                            </a>
                        </div>

                        <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                        <p className="mb-6 text-gray-500 dark:text-gray-400">
                            {currProduct.description}
                        </p>
                    </div>
                </div>
            </div>


            {/* Zoom Modal */}
            <Modal open={zoomModalOpen} onClose={() => setZoomModalOpen(false)}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        maxHeight: "90vh",
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 2,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "auto",
                    }}
                    className="w-[90vw] md:w-[50vw] backdrop-blur-3xl"
                >
                    <IconButton
                        onClick={() => setZoomModalOpen(false)}
                        sx={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            color: "black",
                            backgroundColor: "rgba(255, 255, 255, 0.7)",
                            "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
                        }}
                    >
                        <CloseIcon fontSize="large" />
                    </IconButton>

                    <img
                        src={currProductState?.image}
                        alt={currProductState?.title}
                        className="h-96"
                    />
                </Box>
            </Modal>
        </section >
    ) : (<h1>Product not found</h1>)



}

export default Product