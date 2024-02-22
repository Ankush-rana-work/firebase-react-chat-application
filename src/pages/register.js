import React, { useState } from 'react'
import logoDark from '../assets/images/logo-dark.png';
import logoLight from '../assets/images/logo-light.png';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from "yup"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db, getFirebaseErrorMessage } from '../utils/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import authQuery from '../firbaseQuery/authquery';

const schema = yup.object().shape({
    email: yup.string().min(3).required(),
    password: yup.string().min(3).required(),
    firstName: yup.string().min(3).required(),
    lastName: yup.string().min(3).required(),
});

const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: ""
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                setIsLoading(true);
                // checking user with email and password
                const userCredential = await createUserWithEmailAndPassword(
                  auth,
                  values.email,
                  values.password
                );
                // getting user information
                const user = userCredential.user;
                // saving user in user collection
                authQuery.saveUser(user.uid, values);
                // make loader close
                setIsLoading(false);
                // nevigating user to chat page
                navigate("/");
              } catch (error) {
                // getting error message
                const message = getFirebaseErrorMessage(error);
                setError(message);
                setIsLoading(false);
              }
        }
    });

    return (
        <div className="bg-violet-100/30 dark:bg-zinc-700">
            <div className="w-full h-full">
                <div className="px-5 py-24 sm:px-24 lg:px-0">
                    <div className="grid items-center justify-center grid-cols-1 lg:grid-cols-12 auth-bg">
                        <div className="mx-5 lg:mx-20 lg:col-start-5 lg:col-span-4">
                            <div className="text-center">
                                <a href="index.html" className="block mb-10">
                                    <img
                                        src={logoDark}
                                        alt=""
                                        className="block h-8 mx-auto dark:hidden"
                                    />
                                    <img
                                        src={logoLight}
                                        alt=""
                                        className="hidden h-8 mx-auto logo-light dark:block"
                                    />
                                </a>
                                <h4 className="mb-2 text-gray-800 text-21 dark:text-gray-50">
                                    Sign up
                                </h4>
                            </div>
                            <div className="bg-white card dark:bg-zinc-800 dark:border-transparent">
                                <div className="p-5">
                                    <div className="p-4">
                                        <form className="spaceY-lg w100-small w50-lg" onSubmit={formik.handleSubmit}>
                                        <div className="mb-5">
                                                <label className="font-medium text-gray-700 dark:text-gray-200">
                                                    First Name
                                                </label>
                                                <div className="flex items-center mt-2 mb-1 rounded-3 bg-slate-50/50 dark:bg-transparent">
                                                    <span className="flex items-center px-4 py-2 text-gray-500 border border-r-0 border-gray-100 rounded rounded-r-none dark:border-zinc-600">
                                                        <i className="ri-mail-line text-16"></i>
                                                    </span>
                                                    <input
                                                        type="text"
                                                        name="firstName"
                                                        className="w-full border-gray-100 rounded rounded-l-none placeholder:text-14 bg-slate-50/50 text-14 focus:ring-0 dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-200"
                                                        placeholder="Enter First Name"
                                                        aria-label="Enter First Name"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.firstName}
                                                        onBlur={formik.handleBlur}
                                                    />
                                                </div>
                                                {formik.touched.firstName && formik.errors.firstName && (
                                                    <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                                        {formik.errors.firstName}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="mb-5">
                                                <label className="font-medium text-gray-700 dark:text-gray-200">
                                                    Last Name
                                                </label>
                                                <div className="flex items-center mt-2 mb-1 rounded-3 bg-slate-50/50 dark:bg-transparent">
                                                    <span className="flex items-center px-4 py-2 text-gray-500 border border-r-0 border-gray-100 rounded rounded-r-none dark:border-zinc-600">
                                                        <i className="ri-mail-line text-16"></i>
                                                    </span>
                                                    <input
                                                        type="text"
                                                        name="lastName"
                                                        className="w-full border-gray-100 rounded rounded-l-none placeholder:text-14 bg-slate-50/50 text-14 focus:ring-0 dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-200"
                                                        placeholder="Enter Last Name"
                                                        aria-label="Enter Last Name"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.lastName}
                                                        onBlur={formik.handleBlur}
                                                    />
                                                </div>
                                                {formik.touched.lastName && formik.errors.lastName && (
                                                    <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                                        {formik.errors.lastName}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="mb-5">
                                                <label className="font-medium text-gray-700 dark:text-gray-200">
                                                    Email
                                                </label>
                                                <div className="flex items-center mt-2 mb-1 rounded-3 bg-slate-50/50 dark:bg-transparent">
                                                    <span className="flex items-center px-4 py-2 text-gray-500 border border-r-0 border-gray-100 rounded rounded-r-none dark:border-zinc-600">
                                                        <i className="ri-mail-line text-16"></i>
                                                    </span>
                                                    <input
                                                        type="text"
                                                        name="email"
                                                        className="w-full border-gray-100 rounded rounded-l-none placeholder:text-14 bg-slate-50/50 text-14 focus:ring-0 dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-200"
                                                        placeholder="Enter Email"
                                                        aria-label="Enter Email"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.email}
                                                        onBlur={formik.handleBlur}
                                                    />
                                                </div>
                                                {formik.touched.email && formik.errors.email && (
                                                    <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                                        {formik.errors.email}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="mb-6">
                                                <label className="font-medium text-gray-700 dark:text-gray-200">
                                                    Password
                                                </label>
                                                <div className="flex items-center mt-2 mb-1 rounded-3 bg-slate-50/50 dark:bg-transparent">
                                                    <span className="flex items-center px-4 py-2 text-gray-500 border border-r-0 border-gray-100 rounded rounded-r-none dark:border-zinc-600">
                                                        <i className="ri-lock-2-line text-16"></i>
                                                    </span>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        className="w-full border-gray-100 rounded rounded-l-none placeholder:text-14 bg-slate-50/50 text-14 focus:ring-0 dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-200"
                                                        placeholder="Enter Password"
                                                        aria-label="Enter Password"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.password}
                                                        onBlur={formik.handleBlur}
                                                    />
                                                </div>
                                                {formik.touched.password && formik.errors.password && (
                                                    <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                                        {formik.errors.password}
                                                    </span>
                                                )}
                                                {error && (
                                                    <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                                        {error}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="grid">
                                                <button className="py-2 text-white border-transparent btn bg-violet-500 hover:bg-violet-600 text-16" type="submit">
                                                    {!isLoading ? 'Sign up' : (
                                                        <div class="text-center">
                                                            <div role="status">
                                                                <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                                </svg>
                                                                <span className="sr-only">Loading...</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </button>
                                            </div>

                                            <div className="mt-5 text-center">
                                                <p className="mb-0 text-gray-500 dark:text-gray-300">
                                                    By registering you agree to the Chatvia{' '}
                                                    <a href="#" className="text-violet-500">
                                                        Terms of Use
                                                    </a>
                                                </p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 text-center">
                                <p className="mb-5 text-gray-700 dark:text-gray-200">
                                    Don't have an account ?{' '}
                                    <Link to="/login" className="fw-medium text-violet-500">
                                        Signin
                                    </Link>{' '}
                                </p>
                                <p className="text-gray-700 dark:text-gray-200">
                                    © Crafted with
                                    <i className="text-red-500 mdi mdi-heart"></i> by Ankush
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register