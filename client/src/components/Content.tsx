import UpperNav from './UpperNav';
import Navbar from './Navbar';
import Home from './Home';
import FeaturedProductsSection from './FeaturedProductsSection';
import Collection from './Collection';
import LatestProducts from './LatestProducts';
import Testimonials from './Testimonials';

const Content = () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <UpperNav />
        <Navbar />
        <Home />
      </div>
      <FeaturedProductsSection />
      <Collection />
      <LatestProducts />
      <Testimonials />
    </>
  )
}

export default Content;