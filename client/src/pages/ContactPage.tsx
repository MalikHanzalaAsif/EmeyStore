import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import "../styles/ContactPage.css"
import { useForm } from "react-hook-form";
import { Controller } from 'react-hook-form';
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
import CircularProgress from '@mui/material/CircularProgress';
import contactApi from '../api/contactApi';


const ContactPage = () => {
    const { register, handleSubmit, watch, control, reset, formState: { errors, isSubmitting } } = useForm<FormData>();

    interface FormData {
      fullName: string;
      email: string;
      phone: string;
      message: string;
    }
    const onSubmit = async (formData: FormData) => {
      await contactApi(formData);
       reset();
    };
    return (
        <section id="ContactPage" className='pt-20'>
            <h1 className='text-[#7038ed] text-7xl text-center py-8 font-[BananaYeti]'>Contact <span className='text-[#210036]'>Us</span></h1>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center w-[90vw] md:w-[60vw] m-auto pb-16'>
                <input
                    type="text"
                    placeholder='Full Name *'
                    required
                    className='placeholder-gray-400 p-4 border-2 border-[#7038ed] text-[#210036] w-full my-4 bg-white focus:outline-none focus:ring-0'
                    style={{ height: '3rem' }}
                    {...register("fullName", {
                        required: {
                            value: true,
                            message: "Full Name is required!"
                        },
                        minLength: {
                            value: 3,
                            message: "Full Name must be at least 3 characters long!"
                        }
                    })}
                />
                {errors.fullName && <span className='text-red-600 mb-4'>{errors.fullName.message}</span>}

                <input
                    type="email"
                    placeholder='Email Address *'
                    required
                    className='placeholder-gray-400 p-4 border-2 border-[#7038ed] text-[#210036] w-full my-4 bg-white focus:outline-none focus:ring-0'
                    style={{ height: '3rem' }}
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

                <Controller
                    name="phone"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: "Phone number is required!",
                    }}
                    render={({ field: { onChange, value } }) => (
                        <PhoneInput
                            placeholder="Contact Number"
                            country="us"
                            value={value}
                            onChange={onChange}
                            enableSearch
                            inputClass="custom-phone-input focus:outline-none focus:ring-0"
                            containerClass="custom-phone-container"
                            buttonClass="custom-phone-button"
                            dropdownClass="custom-phone-dropdown"
                        />
                    )}
                />
                {errors.phone && <span className='text-red-600 mb-4'>{errors.phone.message}</span>}

                <textarea
                    placeholder='Write Your Message...'
                    required
                    className='placeholder-gray-400 p-4 border-2 border-[#7038ed] text-[#210036] w-full my-4 bg-white resize-none focus:outline-none focus:ring-0'
                    rows={5}
                    {...register("message", {
                        required: {
                            value: true,
                            message: "Message is required!"
                        },
                        minLength: {
                            value: 3,
                            message: "Message must be at least 5 characters long!"
                        }
                    })}
                />
                {errors.message && <span className='text-red-600 mb-4'>{errors.message.message}</span>}

                <button
                    type='submit'
                    className='bg-[#7038ed] p-2 w-full text-white my-4 cursor-pointer hover:bg-[#210036]  transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50' disabled={isSubmitting}>
                    {isSubmitting ? <CircularProgress size={"25px"} color={"primary"}/> : "Submit"}
                </button>
            </form>
        </section>
    )
}

export default ContactPage;