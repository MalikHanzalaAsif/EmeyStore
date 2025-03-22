import useStore from "../store/store";
import Heading from "../components/ui/Heading";
import Button from "../components/ui/Button";
import { Link, useNavigate } from "react-router";

const Favourites = () => {
    const navigate = useNavigate();
    const { favourites, removeFromFavourites } = useStore();
    return favourites.length > 0 ? (
        <section id="Favourites" className="mt-32">
            <Heading text='Favourites' />
            <div id="FavouritesItemsDiv">
                {favourites.map((product) => (
                    <div className="FavouriteItem flex flex-col sm:flex-row justify-between border-b-2 mb-8 items-center">
                        <img src={product.image} alt={product.title} className="h-40 ml-8 mb-8" />
                        <div className="flex mb-8 sm:mb-0">
                            <p className="sm:mr-12 md:mr-24 lg:mr-44 text-gray-500">{product.title}</p>
                            <p className="ml-8 md:mr-4 lg:mr-8 font-semibold">${product.price}</p>
                        </div>
                        <div className="flex">
                            <a className="sm:mr-12 md:mr-24 lg:mr-44 cursor-pointer hover:text-gray-600" onClick={() => navigate(`/product/${product.id}`)}>View Details</a>
                            <p className="ml-8 md:mr-4 lg:mr-8  text-red-600 cursor-pointer hover:text-red-800" onClick={() => removeFromFavourites(product)}>Remove Item</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    ) : (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl mb-8">No Favourite Items Yet</h1>
            <Link to={"/"}>
                <Button text="Go Back Home" />
            </Link>
        </div>
    )
}

export default Favourites