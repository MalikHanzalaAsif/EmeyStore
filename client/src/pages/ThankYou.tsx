import { Link } from 'react-router'

const ThankYou = () => {
    return (
        <div id="thankYou" className='h-screen flex flex-col items-center justify-center'>
            <iframe src="https://lottie.host/embed/e337e916-bc6b-4ea8-84ef-51cff11b9c2a/pMhzPOqsmJ.lottie" height="200px"></iframe>
            <h1 className='text-4xl p-3 rounded-lg text-white mb-8' id='thankHeading'>Your Order Has been Placed!</h1>
            <p className='text-xl max-w-[80%] text-center font-semibold' >Thank you for your Purchase! Your order is on its way. If you have any queries feel free to reach us! Check your email for more details.</p>
            <Link to="/orders">
                <button className='bg-red-800 text-white p-2 rounded-md mt-4 border-2 border-red-800 hover:bg-red-500 transition-colors duration-300'>See Order</button>
            </Link>
        </div>
    )
}

export default ThankYou