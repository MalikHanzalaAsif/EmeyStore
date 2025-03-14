

const Button = ({text}: {text: string}) => {
  return (
    <button className="bg-gradient-to-r from-[#7038ed] via-[#210036] to-[#7038ed] py-2 px-4 text-white hover:opacity-80 hover:scale-105 transition-all">{text}</button>
  )
}

export default Button