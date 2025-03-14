import FeaturedProducts from "./FeaturedProducts";
import Button from "./ui/Button";

const FeaturedProductsSection = () => {
    return (
        <div id="FeaturedProductsSection" className="relative pb-20">
            <img id="FeaturedProductsCat" src="/img/FeaturedProductsCat.webp" alt="cat sitting" className="absolute h-44 bottom-0 right-0"/>
            <FeaturedProducts />
            <div className="flex justify-center items-center">
                <Button text="Explore Shop" />
            </div>
        </div>
    )
}

export default FeaturedProductsSection