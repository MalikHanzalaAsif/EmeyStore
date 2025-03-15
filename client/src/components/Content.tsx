import UpperNav from './UpperNav';
import Navbar from './Navbar';
import Home from './Home';
import FeaturedProductsSection from './FeaturedProductsSection';
import Collection from './Collection';

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
    </>
  )
}

export default Content;