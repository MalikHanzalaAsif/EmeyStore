import { useNavigate } from "react-router"

const Button = ({text, route}: {text: string, route: string}) => {
  const navigate = useNavigate();
  return (
    <button className="bg-gradient-to-r from-[#7038ed] via-[#210036] to-[#7038ed] py-2 px-4 text-white hover:opacity-80 hover:scale-105 transition-all w-fit" onClick={() => navigate(route)}>{text}</button>
  )
}

export default Button