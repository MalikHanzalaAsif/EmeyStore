import FeaturedProducts from "../components/FeaturedProducts"

const ShopPage = () => {
  return (
    <div id="ShopPage" className="mt-32 relative">
        <img src="/img/testimonialGirlRight.webp" alt="girl" className="absolute h-40 md:h-60 right-0"/>
       <h1 id="ShopPageHeading" className="font-[BananaYeti] text-7xl text-[#7038ed] text-center">Shop</h1>
       <FeaturedProducts />
    </div>
  )
}

export default ShopPage