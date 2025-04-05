import "../styles/Collection.css";
import Button from "./ui/Button";

const Collection = () => {
  return (
    <section id="Collection" className="h-[100vh] flex justify-start">
        <div id="CollectionContent" className="mt-20 ml-24">
            <h1 className="text-4xl font-semibold">Re-Zero <span id="CollectionBananaFont" className="text-5xl">Collection</span></h1>
            <p className="mt-4 mb-2">Suit up as your favourite character!</p>
            <p className="mb-4">Explore our anime collection and gear Up!</p>
            <Button text="Explore Shop" route="/shop"/>
        </div>
    </section>
  )
}

export default Collection