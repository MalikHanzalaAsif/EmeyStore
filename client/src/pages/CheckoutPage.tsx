import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from 'react-router-dom';
import toastEmitter from '../components/ui/toast.tsx';
import { formDataInterface } from '../utils/types.ts';
import { Controller, useForm } from "react-hook-form";
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useStore from '../store/store.ts';
import { verifyPayment } from '../api/orderApi.ts';

const ModalStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    p: 4,
    overflowY: "auto",
    maxHeight: "90vh",
};

const CheckoutForm = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { cart, user } = useStore();

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm<formDataInterface>()


    const onSubmit = async (data: formDataInterface) => {
        if (!user) {
            toastEmitter({
                title: "please login to confirm order",
                type: "info",
            });
            navigate('/login');
            return;
        }

        if (!cart || cart.length === 0) {
            toastEmitter({
                title: "your cart is empty",
                type: "info",
            });
            navigate('/shop');
            return;
        }
        handleOpen();
    };
    const formState = watch();

    const calculatedItemTotal = cart.reduce((acc, item) => {
        const price = Number(item.price);
        const quantity = Number(item.quantity);
        return acc + price * quantity;
    }, 0);

    return (
        <>
            <div className="font-[sans-serif] bg-white mt-24">
                <div className="flex max-sm:flex-col gap-12 max-lg:gap-4 h-full justify-center">
                    <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
                        <h2 className="text-2xl font-bold text-gray-800">Complete your order</h2>
                        <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <h3 className="text-sm lg:text-base text-gray-800 mb-4">Personal Details</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md placeholder:text-gray-500"
                                            required
                                            {...register("firstName", {
                                                required: {
                                                    value: true,
                                                    message: "First Name is required!"
                                                },
                                                minLength: {
                                                    value: 3,
                                                    message: "name must be at least 3 characters long!"
                                                }
                                            })}
                                        />
                                        {errors?.firstName && (
                                            <span className="text-red-600 mb-4">{errors.firstName.message}</span>
                                        )}
                                    </div>

                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 placeholder:text-gray-500 w-full text-sm rounded-md"
                                            {...register("lastName")}
                                        />
                                        {errors.lastName && <span className='text-red-600 mb-4'>{errors.lastName.message}</span>}
                                    </div>

                                    <div>
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 placeholder:text-gray-500 w-full text-sm rounded-md"
                                            required
                                            {...register("email", {
                                                required: {
                                                    value: true,
                                                    message: "email address is required!"
                                                },
                                                pattern: {
                                                    value: emailRegex,
                                                    message: "Please enter a valid email address!"
                                                }
                                            })}
                                        />
                                        {errors.email && <span className='text-red-600 mb-4'>{errors.email.message}</span>}
                                    </div>

                                    <div>
                                        <Controller
                                            name="phone"
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: "Phone number is required!",
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <PhoneInput
                                                    country={"us"} // Default country
                                                    value={value}
                                                    onChange={onChange}
                                                    placeholder="Phone No."
                                                    enableSearch
                                                    containerStyle={{
                                                        width: "100%",
                                                        backgroundColor: "rgb(243 244 246)",
                                                    }}
                                                    inputStyle={{
                                                        fontSize: "1rem",
                                                        backgroundColor: "transparent",
                                                        height: "50px",
                                                        paddingLeft: "48px",
                                                        width: "100%",
                                                        border: "1px solid black",
                                                    }}
                                                    buttonStyle={{
                                                        backgroundColor: "transparent",
                                                        border: "1px solid black",
                                                        height: "50px", // Ensure it matches input height
                                                    }}
                                                />
                                            )}
                                        />
                                        {errors.phone && <span className='text-red-600 mb-4'>{errors.phone.message}</span>}

                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-sm lg:text-base text-gray-800 mb-4">Shipping Address</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Address Line"
                                            className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm rounded-md text-gray-800 placeholder:text-gray-500"
                                            required
                                            {...register("address", {
                                                required: {
                                                    value: true,
                                                    message: "address is required!"
                                                },
                                            })}
                                        />
                                        {errors.address && <span className='text-red-600 mb-4'>{errors.address.message}</span>}
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="City"
                                            className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm rounded-md text-gray-800 placeholder:text-gray-500"
                                            required
                                            {...register("city", {
                                                required: {
                                                    value: true,
                                                    message: "city is required!"
                                                },
                                            })}
                                        />
                                        {errors.city && <span className='text-red-600 mb-4'>{errors.city.message}</span>}
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="State"
                                            className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm rounded-md text-gray-800 placeholder:text-gray-500"
                                            required
                                            {...register("state", {
                                                required: {
                                                    value: true,
                                                    message: "state is required!"
                                                },
                                            })}
                                        />
                                        {errors.state && <span className='text-red-600 mb-4'>{errors.state.message}</span>}
                                    </div>
                                    <div>
                                        <input
                                            type="number"
                                            placeholder="Zip Code"
                                            className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm rounded-md text-gray-800 placeholder:text-gray-500"
                                            required
                                            {...register("zipCode", {
                                                required: {
                                                    value: true,
                                                    message: "zip code is required!"
                                                },
                                            })}
                                        />
                                        {errors.zipCode && <span className='text-red-600 mb-4'>{errors.zipCode.message}</span>}
                                    </div>
                                </div>

                                <div className="flex gap-4 max-md:flex-col mt-8">
                                    <button type="button" className="rounded-md h-fit py-2.5 flex-1 text-sm tracking-wide bg-transparent hover:bg-gray-100 border border-gray-300 text-red-600 max-md:order-1" onClick={() => {
                                        toastEmitter({
                                            title: "order has been interrupted!",
                                            type: "info",
                                        });
                                        navigate('/')
                                    }}>Cancel</button>
                                    <div className='flex-1'>
                                        <button type="submit" className="px-4 py-2.5 w-full text-sm tracking-wide bg-[#7038ed] hover:bg-[#210036] text-white transition-colors rounded-md">Continue Purchase</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* PAYMENT MODAL */}
                <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"

                    >
                        <Box sx={ModalStyles} className="backdrop-blur-xl w-[90vw] sm:w[80vw] md:w-[60vw] lg:w-[50vw]">
                            <IconButton
                                onClick={handleClose}
                                sx={{
                                    position: "absolute",
                                    top: 10,
                                    right: 10,
                                    color: "black",
                                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                                    "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
                                }}
                            >
                                <CloseIcon fontSize="large" />
                            </IconButton>
                            <h1 id="modal-modal-title" className='text-center text-4xl mb-4 text-white'>
                                PayPal Checkout
                            </h1>
                            <h3 className='text-white text-center text-xl'>Total Amount: <span className='text-[#7038ed] text-3xl'>£{calculatedItemTotal.toFixed(2)}</span></h3>
                            <div>
                                <div className="mt-6"></div>
                                <PayPalButtons
                                    style={{
                                        color: "white", // Options: 'gold', 'blue', 'silver', 'white', 'black'
                                        shape: "rect", // Options: 'rect', 'pill'
                                        label: "checkout",  // Options: 'pay', 'checkout', 'buynow', 'paypal', 'installment'
                                        layout: "vertical", // Options: 'horizontal', 'vertical'
                                        tagline: false, // Options: true, false (to show/hide tagline)
                                        height: 43, // Set button height (optional)
                                    }}
                                    createOrder={(data, actions) => {
                                        const purchase_units = [
                                            {
                                                amount: {
                                                    currency_code: "GBP",
                                                    value: calculatedItemTotal.toFixed(2),
                                                    breakdown: {
                                                        item_total: { value: calculatedItemTotal.toFixed(2), currency_code: "GBP" },
                                                    },
                                                },
                                                items: cart.map(item => ({
                                                    name: item.title,
                                                    quantity: item.quantity.toString(),
                                                    unit_amount: {
                                                        value: parseFloat(item.price).toFixed(2),
                                                        currency_code: "GBP",
                                                    },
                                                    description: `color: ${item.color}, size: ${item.size}`
                                                })),
                                            },
                                        ];

                                        return actions.order.create({
                                            intent: "CAPTURE",
                                            purchase_units,
                                        });
                                    }}
                                    onApprove={async (data, actions) => {
                                        if (actions.order) {
                                            return actions.order.capture().then(async (details) => {
                                                const payerName =
                                                    details?.payer?.name?.given_name || "the buyer";
                                                alert(`Transaction completed by ${payerName}!`);
                                                console.log("Transaction details: ", details);
                                                if (details) {
                                                    await verifyPayment(details.id, formState);
                                                    navigate('/thank-you');
                                                }
                                            });
                                        }
                                    }}
                                    onCancel={() => {
                                        alert("Payment was cancelled by user.");
                                    }}
                                    onError={(err) => {
                                        console.error("PayPal Error:", err);
                                        alert("An error occurred during the transaction. Please try again.");
                                    }}
                                />

                            </div>
                        </Box>
                    </Modal>
                </div>
            </div>
        </>
    )
}

export default CheckoutForm;