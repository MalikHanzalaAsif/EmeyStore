import UpperNav from './UpperNav';
import Navbar from './Navbar';
import Home from './Home';

const Content = () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <UpperNav />
        <Navbar />
        <div className="flex-1 min-h-0">
          <Home />
        </div>
      </div>
    </>
  )
}

export default Content