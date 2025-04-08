import Button from "../components/ui/Button";
import Testimonials from "../components/Testimonials";

const AboutPage = () => {
  return (
    <div id="AboutPage" className="mt-32 relative bg-[url(/img/white_bubble.webp)] bg-cover bg-center">
      <img src="/img/HomeCat.webp" alt="cat" className="absolute h-40" />
      <h1 id="AboutPageHeading" className="font-[BananaYeti] text-6xl text-[#7038ed] text-center">About Us</h1>
      <p className="text-center mt-8 max-w-[80vw] m-auto bg-[url(/img/SupportBg.webp)]
      bg-center p-4 bg-cover rounded-lg text-white mb-16">Welcome to Emey’s official merch store—where content, culture, and community collide. This isn’t just merch, it’s a way to rep the vibe that Emey brings to every stream, post, and piece of content. Built for the real ones who’ve been part of the journey (and the new ones joining in), every drop is designed with quality, personality, and that signature Emey energy. From exclusive limited-edition fits to everyday staples, we’re here to help you wear the brand, live the vibe, and stay real.
      </p>

      <section id="AboutCollection" className="pb-16 flex justify-start bg-[url(/img/AboutCollectionBg.jpg)] bg-cover">
        <div id="AboutCollectionContent" className="mt-20 flex flex-col justify-center items-center md:items-start md:ml-24 md:max-w-[50vw]">
          <h1 className="text-4xl font-semibold">Re-Zero <span id="CollectionBananaFont" className="text-5xl">Collection</span></h1>
          <p className="mt-4 mb-2 text-xl font-semibold">HOW WE MAKE THE MERCHANDISE</p>
          <p className="mb-4 text-center md:text-start">Every piece of Emey merch is crafted with care from start to finish. From the initial concept—often inspired by Emey’s most iconic moments and inside jokes—to the final product, we work closely with trusted designers and manufacturers to ensure top-tier quality and comfort. Designs are sketched, reviewed, and perfected in collaboration with Emey, making sure each item reflects the brand's personality and energy. We use premium materials, ethical production partners, and run limited drops to keep things exclusive and special for the community. Nothing’s mass-produced—because you deserve merch that feels as unique as the creator you rep.</p>
          <Button text="Explore Shop" route="/shop" />
        </div>
      </section>

      <Testimonials />
    </div>
  )
}

export default AboutPage