import { Link } from "react-router"
import { useState } from "react";
import useStore from "../../store/store";
import { logoutApi } from "../../api/userApi";

const Avatar = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { user, removeUser } = useStore();
    const [isOpen, setIsOpen] = useState(false);

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const signOut = async () => {
        setIsLoading(true);
        try {
            await logoutApi();
            removeUser();
        } finally {
            setIsLoading(false)
            setIsOpen(false);
        }
    }

    return (
        <div className="relative">

            <img id="avatarButton" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="h-8 rounded-full cursor-pointer" src="/img/profileIcon.png" alt="User dropdown" onClick={toggleDropdown} />

            {isOpen && (
                <div id="userDropdown" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44 dark:bg-gray-700 dark:divide-gray-600 absolute -left-16 top-12">
                    {user === null ? (
                        <>
                            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                <div className="text-xs">Sign In to make Purchase.</div>
                            </div>
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                                <li>
                                    <Link to="/login" className="block px-4 py-2 text-gray-600 hover:bg-[#7038ed] hover:text-white dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setIsOpen(false)}>Login</Link>
                                </li>
                            </ul>
                            <div className="py-1">
                                <Link to="/signup" className="block px-4 py-2 text-sm text-gray-600 hover:bg-[#7038ed] hover:text-white dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={() => setIsOpen(false)}>Sign Up</Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                <div>{user?.name}</div>
                                <div className="font-medium truncate">{user?.email}</div>
                            </div>
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                                <li>
                                    <Link to="/cart" className="block px-4 py-2 hover:text-white hover:bg-[#7038ed] dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setIsOpen(false)}>Cart</Link>
                                </li>
                                <li>
                                    <Link to="/orders" className="block px-4 py-2 hover:text-white hover:bg-[#7038ed] dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setIsOpen(false)}>Orders</Link>
                                </li>
                            </ul>
                            <div className="py-1">
                                <button className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full" onClick={signOut}>{isLoading ? "Signing out..." : "Sign out"}</button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

export default Avatar;