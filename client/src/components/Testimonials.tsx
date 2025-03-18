import ReviewsArray from "../utils/ReviewsArray";
import Marquee from "react-fast-marquee";
import Heading from "./ui/Heading";

const Testimonials = () => {
    return (
        <section id="Testimonials" className="relative">
            <div id='FeaturedProductsBgImg' className='absolute h-full w-full'></div>
            <img src="/img/testimonialGirlLeft.webp" alt="testomonial girl" className="absolute h-44 md:h-72 bottom-0 left-0" style={{zIndex: "2"}}/>
            <img src="/img/testimonialGirlRight.webp" alt="testomonial girl" className="absolute h-60 hidden md:block bottom-0 right-0" style={{zIndex: "2"}}/>
            <Heading text="Testimonials" />
            <Marquee pauseOnHover={true} speed={30} gradient={false} className="flex">
                {ReviewsArray.map((review) => (
                    <div id="SingleReview" key={review.id} className="max-w-72 md:max-w-96 m-6 p-4 shadow-xl rounded-xl bg-white">
                        <div className="flex items-center">
                            <img src="/img/profileIcon.png" alt="profile" className="h-8" />
                            <div className="SingleReviewDetails ml-2">
                                <p className="SingleReviewName text-lg font-semibold">{review.name}</p>
                                <p className="SingleReviewCustomer text-gray-500 text-xs">{review.profession}</p>
                            </div>
                            <img src="/img/coma.png" alt="coma" className="h-8 ml-auto" />
                        </div>
                        <div className="mt-6">
                            <p className="text-sm">{review.review}</p>
                        </div>
                    </div>
                ))}
            </Marquee>
        </section>
    )
}

export default Testimonials