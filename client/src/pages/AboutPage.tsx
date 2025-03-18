import Collection from "../components/Collection";
import Testimonials from "../components/Testimonials";

const AboutPage = () => {
  return (
    <div id="AboutPage" className="mt-32 relative">
      <img src="/img/HomeCat.webp" alt="cat" className="absolute h-40"/>
      <h1 id="AboutPageHeading" className="font-[BananaYeti] text-6xl text-[#7038ed] text-center">About Us</h1>
      <p className="text-center mt-8 max-w-[80vw] m-auto bg-[url(/img/SupportBg.webp)]
      bg-center p-4 bg-cover rounded-lg text-white mb-16">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem dolorum architecto labore atque maiores hic et aperiam similique, quasi repellendus, error quidem enim. Aspernatur iure dolorem at ducimus ipsam fugiat
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi enim velit illo officiis consequuntur! Ea expedita molestias sit illum, cumque a sequi officiis, ut laborum dignissimos cum, perferendis dolore aliquam.
      </p>
      <Collection />
      <Testimonials />
    </div>
  )
}

export default AboutPage