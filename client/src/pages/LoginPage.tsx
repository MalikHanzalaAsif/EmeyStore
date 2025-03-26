import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
import { loginApi } from '../api/userApi';
import CircularProgress from '@mui/material/CircularProgress';
import useStore from '../store/store';

export default function LoginPage() {
    const navigate = useNavigate();
    const { setUser } = useStore();
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();

    interface FormData {
        email: string;
        password: string;
    }

    const onSubmit = async (formData: FormData) => {
        let data = await loginApi(formData);
        if (data.user) {
            setUser(data.user);
        }
        if(data.type === "success") {
            navigate("/")
        }
        reset();
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-16">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                            {errors.email && <span className='text-red-600 mb-4'>{errors.email.message}</span>}
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
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
                                {errors.password && <span className='text-red-600 mb-4'>{errors.password.message}</span>}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (<CircularProgress color='primary' size={30} />) : "Sign in"}
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Don't have an Account?{' '}
                        <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            SignUp
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}
