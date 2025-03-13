import UpperNav from './UpperNav';
import Navbar from './Navbar';
import Home from './Home';

const Content = () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <UpperNav />
        <Navbar />
        <Home />
      </div>
    </>
  )
}

export default Content;