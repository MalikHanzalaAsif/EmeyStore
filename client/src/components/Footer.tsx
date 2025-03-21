import { Link } from 'react-router-dom';
import "../styles/Footer.css";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    };

    return (
        <footer id="footer">
            <div id="upperFooter" className='relative bg-gradient-to-r from-[#210036] via-[#7038ed] to-[#210036] text-white flex lg:flex-row flex-col justify-between items-center py-16'>
                <div id='upperFooterBgImg' className='absolute h-full w-full'></div>
                <img src="/img/EmeyLogo.webp" alt="Hell Spawn Logo" className='max-h-64 max-w-64 mb-6 lg:mb-0'  style={{zIndex: "1"}}/>
                <ul id="usefullLinks" className='mx-8 mb-6 lg:mb-0' style={{zIndex: "1"}}>
                    <h2 className="text-lg font-semibold mb-8">USEFUL LINKS</h2>
                    <li className="footerLi"><Link to="/">Home</Link></li>
                    <li className="footerLi"><Link to="/about">About</Link></li>
                    <li className="footerLi"><Link to="/shop">Shop</Link></li>
                    <li className="footerLi"><Link to="/shop">Categories</Link></li>
                    <li className="footerLi"><Link to="/contact">Contact</Link></li>
                </ul>
                <ul id="products" style={{zIndex: "1"}}>
                    <h2 className="text-lg font-semibold mb-8">PRODUCTS</h2>
                    <li className="footerLi"><Link to="/shop/tshirts">Tshirts</Link></li>
                    <li className="footerLi"><Link to="/shop/trousers">Trousers</Link></li>
                    <li className="footerLi"><Link to="/shop/hoodies">Hoodies</Link></li>
                    <li className="footerLi"><Link to="/shop/sweatshirts">Sweatshirts</Link></li>
                    <li className="footerLi"><Link to="/shop/caps">Caps</Link></li>
                </ul>
                <ul id="products" className='mt-8 mx-8' style={{zIndex: "1"}}>
                    <li className="footerLi"><Link to="/shop/keychains">Keychains</Link></li>
                    <li className="footerLi"><Link to="/shop/notebooks">NoteBooks</Link></li>
                    <li className="footerLi"><Link to="/shop/mousepads">MousePads</Link></li>
                    <li className="footerLi"><Link to="/shop/mobilecovers">MobileCovers</Link></li>
                    <li className="footerLi"><Link to="/shop/shorts">Shorts</Link></li>
                    <li className="footerLi"><Link to="/shop/mugs">Mugs</Link></li>
                </ul>
                <ul id="resources" style={{zIndex: "1"}}>
                    <h2 className="text-lg font-semibold mb-8">RESOURCES</h2>
                    <li className="footerLi"><a href="https://uniqueadvertisers.io" target='_blank'>Partnerships</a></li>
                    <li className="footerLi"><Link to="/terms-and-conditions">Terms & conditions</Link></li>
                    <li className="footerLi"><Link to="/privacy-policy">Privacy Policy</Link></li>
                </ul>
                <form id="subscribeToOurNewsLetter" className='flex flex-col mr-4' onSubmit={handleSubmit} style={{zIndex: "1"}}>
                    <h2 className="text-lg font-semibold mb-8">SUBSCRIBE TO OUR NEWSLETTER</h2>
                    <input type="email" name="email" id="footerEmail" placeholder='write your email..' className='mb-4 p-1 pl-4 placeholder:text-xs placeholder:text-gray-400' />
                    <button type='submit' id='footerFormSubmitButton' className='mb-4 w-fit px-8 bg-[#7038ed] text-white p-1 hover:opacity-[0.9] text-sm'><Link to="/contact">SUBMIT</Link></button>
                    <div className='text-center text-md '>
                    Call Us Now: <a href="tel:+353876545954" className='text-blue-500 underline'>+353 87 654 5954</a>
                    </div>
                </form>
            </div>
            <div id="lowerFooter" className='flex flex-col justify-center items-center'>
                <p id="lowerFooterRights" className="text-xs my-2">All RIGHTS RESERVED © {currentYear} UNIQUE ADVERTISERS</p>
                <div id="lowerFooterIcons" className='flex my-2'>
                    <a href="#" target='_blank'>
                        <img src="/img/facebook_purple_icon.png" alt="facebook" className='w-8 mx-1 hover:opacity-75 transition' />
                    </a>
                    <a href="#" target='_blank'>
                        <img src="/img/linkedin_purple_icon.png" alt="facebook" className='w-8 mx-1 hover:opacity-75 transition' />
                    </a>
                    <a href="#" target='_blank'>
                        <img src="/img/instagram_purple_icon.png" alt="instagram" className='w-8 mx-1 hover:opacity-75 transition-all duration-300' />
                    </a>
                    <a href="#" target='_blank'>
                        <img src="/img/x_purple_icon.png" alt="x" className='w-8 mx-1 hover:opacity-75 transition' />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;