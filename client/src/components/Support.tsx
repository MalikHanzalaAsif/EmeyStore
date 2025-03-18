import "../styles/Support.css";
import { Truck, ShoppingBag, Receipt, Headset } from 'lucide-react';

const Support = () => {
  return (
    <div id="Support" className="flex justify-around p-8 text-white flex-wrap">
        <div className="flex justify-center items-center m-4">
            <div className="mr-2"><Truck size={42} strokeWidth={1}/></div>
            <div>
                <p className="text-sm">Free Shipping</p>
                <p className="text-xs">From orders totalling $gg</p>
            </div>
        </div>
        <div className="flex justify-center items-center m-4">
            <div className="mr-2"><ShoppingBag size={42} strokeWidth={1}/></div>
            <div>
                <p className="text-sm">Variety Products</p>
                <p className="text-xs">select from +200 items</p>
            </div>
        </div>
        <div className="flex justify-center items-center m-4">
            <div className="mr-2"><Receipt size={42} strokeWidth={1}/></div>
            <div>
                <p className="text-sm">Return & Refund</p>
                <p className="text-xs">Money Back Guarantee</p>
            </div>
        </div>
        <div className="flex justify-center items-center m-4">
            <div className="mr-2"><Headset size={42} strokeWidth={1}/></div>
            <div>
                <p className="text-sm">Suport 24/7</p>
                <p className="text-xs">Always Online Feedback</p>
            </div>
        </div>
    </div>
  )
}

export default Support;