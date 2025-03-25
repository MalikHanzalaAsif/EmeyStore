import { useForm } from 'react-hook-form';
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
import { Link, useNavigate } from 'react-router';
import { signupApi } from '../api/userApi';
import { CircularProgress } from '@mui/material';
import useStore from '../store/store';


export default function SignupPage() {
    const navigate = useNavigate();
    const { setUser } = useStore();
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();
    interface FormData {
        fullName: string;
        email: string;
        password: string;
    }

    const onSubmit = async (formData: FormData) => {
        let data = await signupApi(formData);
        if (data.user) {
            setUser(data.user)
        }
        reset();
        navigate("/");
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-16">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Create an Account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                                Full Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    autoComplete="name"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    {...register("fullName", {
                                        required: {
                                            value: true,
                                            message: "fullName is required!"
                                        },
                                        minLength: {
                                            value: 3,
                                            message: "fullName must be at least 3 characters long!"
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: "fullName must not exceed 50 characters!"
                                        }
                                    })}
                                />
                            </div>
                            {errors.fullName && <span className='text-red-600 mb-4 text-sm'>{errors.fullName.message}</span>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                            </div>
                            {errors.email && <span className='text-red-600 mb-4 text-sm'>{errors.email.message}</span>}
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                            </div>

                            <div className="mt-2">
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: "please enter your password!"
                                        },
                                    })}
                                />
                                {errors.password && <span className='text-red-600 mb-4 text-sm'>{errors.password.message}</span>}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (<CircularProgress color='primary' size={30} />) : "Sign up"}
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Already have and Account?{' '}
                        <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}
