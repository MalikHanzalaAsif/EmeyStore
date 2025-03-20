import LatestProductsArray from "../utils/LatestProductsArray";
import "../styles/LatestProducts.css";
import Heading from "./ui/Heading";

const LatestProducts = () => {
    return (
        <section id="LatestProducts" className="relative">
            <div id='FeaturedProductsBgImg' className='absolute h-full w-full' style={{zIndex: "-10"}}></div>
            <img src="/img/LatestProductsCat.webp" alt="cat" className="absolute h-44 top-0 left-0" />
            <img src="/img/HomeCat.webp" alt="cat" className="absolute h-28 bottom-0 right-0" />
            <Heading text="Latest Products" />
            <div id="LatestProductsItems" className="flex justify-center items-center flex-wrap">
                {LatestProductsArray.map((item) => (
                    <div className="SingleFeaturedProduct my-8 border border-[#210036] w-48 m-4" key={item.id}>
                        <div className="SingleFeaturedProductImgSection flex justify-center items-center">
                            <img src={item.image} alt={item.title} className="h-40 my-4" />
                        </div>
                        <div className="SingleFeaturedProductDetails flex justify-between border-t border-[#210036] py-1">
                            <p className="ml-2">{item.title}</p>
                            <p className="mr-2 text-gray-500">${item.price}</p>
                        </div>
                        <button className="SingleFeaturedProuctsButton text-center flex justify-center items-center w-full border-t border-[#210036] bg-[#210036] text-white py-1 hover:bg-[#7038ed] transition-colors duration-300">
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default LatestProducts