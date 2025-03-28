import useStore from "../store/store";
import Heading from "../components/ui/Heading";
import Button from "../components/ui/Button";
import { Link, useNavigate } from "react-router";

const OrdersPage = () => {
    const navigate = useNavigate();
    const { orders } = useStore();

    return orders.length > 0 ? (
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 mt-10">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div className="mx-auto max-w-5xl">
                    <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                        <Heading text="My Orders" />
                    </div>

                    <div className="mt-6 flow-root sm:mt-8">
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">

                            <div className="flex flex-wrap items-center gap-y-4 py-6">
                                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
                                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                        <a href="#" className="hover:underline">#FWB156475937</a>
                                    </dd>
                                </dl>

                                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
                                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">11.02.2023</dd>
                                </dl>

                                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Price:</dt>
                                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">$1,845</dd>
                                </dl>

                                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                                    <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                                        <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                        </svg>
                                        Confirmed
                                    </dd>
                                </dl>

                                <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                                    <button type="button" className="w-full rounded-lg bg-primary-700 px-3 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 lg:w-auto">Order again</button>
                                    <a href="#" className="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto">View details</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    ): (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl mb-8">No Orders Yet!</h1>
            <Link to={"/cart"}>
                <Button text="Go to Cart" />
            </Link>
        </div>
    )
}

export default OrdersPage