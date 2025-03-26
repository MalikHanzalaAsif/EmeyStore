import ScrollOnTop from '../utils/ScrollOnTop';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Content from '../components/Content';
import AboutPage from '../pages/AboutPage';
import ShopPage from '../pages/ShopPage';
import ContactPage from '../pages/ContactPage';
import Cart from "../pages/Cart";
import Product from '../pages/Product';
import Favourites from '../pages/Favourites';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import CheckoutForm from '../pages/CheckoutPage';

const WebRoutes = () => {
    return (
        <Router>
            <ScrollOnTop />
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Content />} />
                    <Route path='/about' element={<AboutPage />} />
                    <Route path='/shop' element={<ShopPage />} />
                    <Route path='/contact' element={<ContactPage />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/product/:id' element={<Product />} />
                    <Route path='/favourites' element={<Favourites />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path='/checkout' element={<CheckoutForm /> } />
                </Route>
            </Routes>
        </Router>
    )
}

export default WebRoutes