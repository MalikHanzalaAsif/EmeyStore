import UpperNav from './UpperNav';
import Navbar from './Navbar';
import Home from './Home';
import FeaturedProductsSection from './FeaturedProductsSection';

const Content = () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <UpperNav />
        <Navbar />
        <Home />
      </div>
      <FeaturedProductsSection />
    </>
  )
}

export default Content;