import "../styles/Home.css";
import Button from "./ui/Button";

const Home = () => {
  return (
    <section id="Home" className="h-full flex-1">
      <div id="HomeContent" className="relative h-full flex justify-center md:justify-start items-center">
        <img id="HomeCat" src="/img/HomeCat.webp" alt="cat picture" className="absolute h-40 md:h-60 md:-bottom-20 bottom-0 right-0 md:left-72"/>
        <div id="HomeText" className="ml-0 md:ml-32">
          <h1 className="HomeMainText">Join The</h1>
          <h1 className="HomeMainText">Emilia Camp</h1>
          <p className="mb-8">Step into the world of ReZero</p>
          <Button text="Explore Shop" />
        </div>
        <div id="HomeIcons" className="absolute m-8 flex md:flex-col bottom-6 md:right-0 md:bottom-auto">
          <img src="/img/facebook_white_icon.png" alt="facebook icon" className="h-8 m-2 cursor-pointer hover:opacity-80"/>
          <img src="/img/linkedin_white_icon.png" alt="linkedin icon" className="h-8 m-2 cursor-pointer hover:opacity-80"/>
          <img src="/img/instagram_white_icon.png" alt="instagram icon" className="h-8 m-2 cursor-pointer hover:opacity-80"/>
          <img src="/img/x_white_icon.png" alt="x icon" className="h-8 m-2 cursor-pointer hover:opacity-80"/>
        </div>
      </div>
    </section>
  )
}

export default Home