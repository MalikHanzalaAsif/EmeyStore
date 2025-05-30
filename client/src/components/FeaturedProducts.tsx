import { useState } from "react";
import "../styles/FeaturedProducts.css";
import Products from "../utils/Products";
import Heading from "./ui/Heading";
import { useNavigate } from "react-router";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import useStore from "../store/store";

const FeaturedProducts = () => {
    const { favourites, addToFavourites, removeFromFavourites } = useStore();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("ALL CATEGORIES");
    const categories = ["ALL CATEGORIES", "TSHIRTS", "TROUSERS", "HOODIES", "SWEATSHIRTS"];

    const filteredProducts = activeTab === "ALL CATEGORIES" ? Products : Products.filter(product => product.category === activeTab);

    return (
        <section id="FeaturedProducts" className="relative">
            <Heading text="Featured Products" />
            <div id="FeaturedProductsTabs" className="flex justify-center flex-wrap m-4">
                {categories.map((item) => (
                    <button type="button" className={`SingleTab m-4 text-sm ${activeTab === item ? "activeTab" : ""} hover:text-[#7038ed] transition-all`} key={item} onClick={() => setActiveTab(item)}>{item}</button>
                ))}
            </div>
            <div id="FeaturedProductsItems" className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
                <div id='FeaturedProductsBgImg' className='absolute h-full w-full' style={{ zIndex: "-10" }}></div>
                {filteredProducts.map((item) => (
                    <div className="relative SingleFeaturedProduct my-8 border border-[#210036] w-48" key={item.id}>
                        {favourites.some((Product) => Product.id === item.id) ? (
                            <FavoriteIcon className="absolute right-0 m-2 cursor-pointer" onClick={() => removeFromFavourites(item)}/>
                        ) : (
                            <FavoriteBorderIcon className="absolute right-0 m-2 cursor-pointer" onClick={() => addToFavourites(item)}/>
                        )}
                        <div className="SingleFeaturedProductImgSection flex justify-center items-center">
                            <img src={item.image} alt={item.title} className="h-40 my-4" />
                        </div>
                        <div className="SingleFeaturedProductDetails flex justify-between border-t border-[#210036] py-1">
                            <p className="ml-2">{item.title}</p>
                            <p className="mr-2 text-gray-500">£{item.price}</p>
                        </div>
                        <button className="SingleFeaturedProuctsButton text-center flex justify-center items-center w-full border-t border-[#210036] bg-[#210036] text-white py-1 hover:bg-[#7038ed] transition-colors duration-300" onClick={() => {
                            navigate(`/product/${item.id}`);
                        }}>
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default FeaturedProducts;