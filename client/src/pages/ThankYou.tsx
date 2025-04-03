import { Link } from 'react-router'

const ThankYou = () => {
    return (
        <div id="thankYou" className='h-screen flex flex-col items-center justify-center'>
            <iframe src="https://lottie.host/embed/981edebc-9fcb-4e48-8664-97cacc67cfa2/7NKYoYb133.lottie" height={"300px"} className='mt-16'></iframe>
            <h1 className='text-2xl p-3 rounded-lg text-black mb-4 font-semibold text-center' id='thankHeading'>Your Order Has been Placed!</h1>
            <p className='text-xl max-w-[80%] text-center' >Thank you for your Purchase! Your order is on its way. If you have any queries feel free to reach us! Check your email for more details.</p>
            <Link to="/orders">
                <button className='bg-purple-600 text-white p-2 rounded-md mt-4 border-2 border-purple-400 hover:bg-purple-400 transition-colors duration-300'>See Order</button>
            </Link>
        </div>
    )
}

export default ThankYou