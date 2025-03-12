import { Outlet } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';
// import { ToastContainer } from 'react-toastify';

const Layout = () => {
    return (
        <div id="app" style={{ height: "100%", overflow: "hidden" }}>
            {/* <ToastContainer /> */}
            <Navbar />
            <main id='content'>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout;