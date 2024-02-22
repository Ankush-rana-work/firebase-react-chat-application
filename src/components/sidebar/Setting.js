import React from 'react'

const Setting = () => {
    return (
        <div className="tab-content active">
            {/* Start profile content */}
            <div>
                <div className="px-6 pt-6">
                    <h4 className="mb-0 text-gray-700 dark:text-gray-50">Settings</h4>
                </div>
                <div className="p-6 text-center border-b border-gray-100 dark:border-zinc-500">
                    <div className="relative mb-4">
                        <img
                            src="assets/images/avatar-1.jpg"
                            className="w-24 h-24 p-1 mx-auto border border-gray-100 rounded-full dark:border-zinc-800"
                            alt=""
                        />
                        <a
                            href="#!"
                            className="absolute bottom-0 w-10 h-10 bg-gray-100 rounded-full ltr:right-28 rtl:left-28dark:bg-zinc-800 dark:text-gray-100"
                        >
                            <i className="leading-10 ri-pencil-fill text-16" />
                        </a>
                    </div>
                    <h5 className="mb-1 text-16 dark:text-gray-50">Patricia Smith</h5>
                    <div className="relative mb-1 dropdown">
                        <a
                            className="pb-1 text-gray-500 dropdown-toggle d-block dark:text-gray-300"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            id="dropdownMenuButtonX"
                        >
                            Available <i className="mdi mdi-chevron-down" />
                        </a>
                        <ul
                            className="absolute z-50 hidden py-2 mt-2 text-left list-none bg-white border rounded shadow-lg left-20 dropdown-menu w-36 top-6 dark:bg-zinc-700 bg-clip-padding border-gray-50 dark:border-zinc-500"
                            aria-labelledby="dropdownMenuButtonX"
                        >
                            <li>
                                <a
                                    className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600/80 ltr:text-left rtl:text-right"
                                    href="#"
                                >
                                    Available
                                </a>
                            </li>
                            <li>
                                <a
                                    className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600/80 ltr:text-left rtl:text-right"
                                    href="#"
                                >
                                    Busy
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* End profile user */}
                {/* Start user-profile-desc */}
                <div className="p-6 h-[550px]" data-simplebar="">
                    <div data-tw-accordion="collapse">
                        <div className="text-gray-700 accordion-item">
                            <h2>
                                <button
                                    type="button"
                                    className="flex items-center justify-between w-full px-3 py-2 font-medium text-left border border-gray-100 rounded-t accordion-header group active dark:border-zinc-600 dark:bg-zinc-600 dark:text-gray-50"
                                >
                                    <span className="m-0 text-[14px] font-medium">
                                        Personal Info
                                    </span>
                                    <i className="mdi mdi-chevron-down text-lg group-[.active]:rotate-180" />
                                </button>
                            </h2>
                            <div className="block bg-white border border-t-0 border-gray-100 accordion-body dark:bg-transparent dark:border-zinc-600">
                                <div className="p-5">
                                    <div>
                                        <div className="ltr:float-right rtl:float-left">
                                            <button
                                                type="button"
                                                className="py-1.5 btn bg-slate-100 border-transparent rounded hover:bg-gray-50 transition-all ease-in-out dark:bg-zinc-600 dark:text-gray-50 dark:hover:bg-zinc-500/50"
                                            >
                                                <i className="mr-1 align-middle ri-edit-fill" /> Edit
                                            </button>
                                        </div>
                                        <p className="mb-1 text-gray-500 dark:text-gray-300">
                                            Name
                                        </p>
                                        <h5 className="text-sm dark:text-gray-50">
                                            Patricia Smith
                                        </h5>
                                    </div>
                                    <div className="mt-5">
                                        <p className="mb-1 text-gray-500 dark:text-gray-300">
                                            Email
                                        </p>
                                        <h5 className="text-sm dark:text-gray-50">adc@123.com</h5>
                                    </div>
                                    <div className="mt-5">
                                        <p className="mb-1 text-gray-500 dark:text-gray-300">
                                            Time
                                        </p>
                                        <h5 className="text-sm dark:text-gray-50">11:40 AM</h5>
                                    </div>
                                    <div className="mt-5">
                                        <p className="mb-1 text-gray-500 dark:text-gray-300">
                                            Location
                                        </p>
                                        <h5 className="text-sm dark:text-gray-50">
                                            California, USA
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 text-gray-700 accordion-item">
                            <h2>
                                <button
                                    type="button"
                                    className="flex items-center justify-between w-full px-3 py-2 font-medium text-left border border-gray-100 rounded accordion-header group dark:bg-zinc-600 dark:text-gray-50 dark:border-zinc-600"
                                >
                                    <span className="m-0 text-[14px] font-semibold">
                                        Privacy
                                    </span>
                                    <i className="mdi mdi-chevron-down text-lg group-[.active]:rotate-180" />
                                </button>
                            </h2>
                            <div className="hidden bg-white border border-t-0 border-gray-100 accordion-body dark:bg-transparent dark:border-zinc-600">
                                <div className="p-5">
                                    <div className="py-4">
                                        <div className="flex items-center">
                                            <div className="flex-grow overflow-hidden">
                                                <h5 className="mb-0 text-gray-700 truncate text-13 dark:text-gray-50">
                                                    Profile photo
                                                </h5>
                                            </div>
                                            <div className="relative flex-shrink-0 dropdown">
                                                <button
                                                    className="border-transparent rounded btn dropdown-toggle bg-slate-100 px-1.5 py-1 dark:bg-zinc-500 dark:text-gray-50 "
                                                    type="button"
                                                    data-bs-toggle="dropdown"
                                                    id="dropdownMenuButtonY"
                                                >
                                                    Everyone <i className="mdi mdi-chevron-down" />
                                                </button>
                                                <ul
                                                    className="absolute z-50 block w-40 py-2 my-8 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:right-0 ltr:left-auto dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:shadow-sm dark:border-zinc-600"
                                                    aria-labelledby="dropdownMenuButtonY"
                                                >
                                                    <li>
                                                        <a
                                                            className="block w-full px-5 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600"
                                                            href="#"
                                                        >
                                                            Everyone
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="block w-full px-5 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600"
                                                            href="#"
                                                        >
                                                            selected
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="block w-full px-5 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600"
                                                            href="#"
                                                        >
                                                            Nobody
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-4 border-t border-gray-100/80 dark:border-zinc-600">
                                        <div className="flex items-center">
                                            <div className="flex-grow overflow-hidden">
                                                <h5 className="mb-0 text-gray-700 truncate text-13 dark:text-gray-50">
                                                    Last seen
                                                </h5>
                                            </div>
                                            <div className="flex items-center">
                                                <label
                                                    htmlFor="toggleSwitch"
                                                    className="flex items-center cursor-pointer"
                                                >
                                                    <span className="relative">
                                                        <input
                                                            type="checkbox"
                                                            id="toggleSwitch"
                                                            className="sr-only"
                                                            defaultChecked=""
                                                        />
                                                        <span className="block w-8 h-5 rounded-full checked-bg" />
                                                        <span className="absolute w-3 h-3 transition rounded-full dot left-1 top-1" />
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-4 border-t border-gray-100/80 dark:border-zinc-600">
                                        <div className="flex items-center">
                                            <div className="flex-grow overflow-hidden">
                                                <h5 className="mb-0 text-gray-700 truncate text-13 dark:text-gray-50">
                                                    Status
                                                </h5>
                                            </div>
                                            <div className="relative flex-shrink-0 dropdown">
                                                <button
                                                    className="border-transparent rounded btn dropdown-toggle bg-slate-100 px-1.5 py-1 dark:bg-zinc-500 dark:text-gray-50 "
                                                    type="button"
                                                    data-bs-toggle="dropdown"
                                                    id="dropdownMenuButtonT"
                                                >
                                                    Everyone <i className="mdi mdi-chevron-down" />
                                                </button>
                                                <ul
                                                    className="absolute z-50 block w-40 py-2 my-8 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:right-0 ltr:left-auto dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:shadow-sm dark:border-zinc-600"
                                                    aria-labelledby="dropdownMenuButtonT"
                                                >
                                                    <li>
                                                        <a
                                                            className="block w-full px-5 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600"
                                                            href="#"
                                                        >
                                                            Everyone
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="block w-full px-5 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600"
                                                            href="#"
                                                        >
                                                            selected
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="block w-full px-5 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600"
                                                            href="#"
                                                        >
                                                            Nobody
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-4 border-t border-gray-100/80 dark:border-zinc-600">
                                        <div className="flex items-center">
                                            <div className="flex-grow overflow-hidden">
                                                <h5 className="mb-0 text-gray-700 truncate text-13 dark:text-gray-50">
                                                    Read receipts
                                                </h5>
                                            </div>
                                            <div className="flex items-center">
                                                <label
                                                    htmlFor="toggleSwitch2"
                                                    className="flex items-center cursor-pointer"
                                                >
                                                    <span className="relative">
                                                        <input
                                                            type="checkbox"
                                                            id="toggleSwitch2"
                                                            className="sr-only"
                                                            defaultChecked=""
                                                        />
                                                        <span className="block w-8 h-5 rounded-full checked-bg" />
                                                        <span className="absolute w-3 h-3 transition rounded-full dot left-1 top-1" />
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-4 border-t border-gray-100/80 dark:border-zinc-600">
                                        <div className="flex items-center">
                                            <div className="flex-grow overflow-hidden">
                                                <h5 className="mb-0 text-gray-700 truncate text-13 dark:text-gray-50">
                                                    Profile photo
                                                </h5>
                                            </div>
                                            <div className="relative flex-shrink-0 dropdown">
                                                <button
                                                    className="border-transparent rounded btn dropdown-toggle bg-slate-100 px-1.5 py-1 dark:bg-zinc-500 dark:text-gray-50 "
                                                    type="button"
                                                    data-bs-toggle="dropdown"
                                                    id="dropdownMenuButtonZM"
                                                >
                                                    Everyone <i className="mdi mdi-chevron-down" />
                                                </button>
                                                <ul
                                                    className="absolute z-50 block w-40 py-2 my-8 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:right-0 ltr:left-auto dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:shadow-sm dark:border-zinc-600"
                                                    aria-labelledby="dropdownMenuButtonZM"
                                                >
                                                    <li>
                                                        <a
                                                            className="block w-full px-5 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600"
                                                            href="#"
                                                        >
                                                            Everyone
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="block w-full px-5 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600"
                                                            href="#"
                                                        >
                                                            selected
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="block w-full px-5 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600"
                                                            href="#"
                                                        >
                                                            Nobody
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 text-gray-700 accordion-item">
                            <h2>
                                <button
                                    type="button"
                                    className="flex items-center justify-between w-full px-3 py-2 font-medium text-left border border-gray-100 rounded accordion-header group dark:border-zinc-600 dark:bg-zinc-600 dark:text-gray-50"
                                >
                                    <span className="m-0 text-[14px] font-medium">
                                        Security
                                    </span>
                                    <i className="mdi mdi-chevron-down text-lg group-[.active]:rotate-180" />
                                </button>
                            </h2>
                            <div className="hidden bg-white border border-t-0 border-gray-100 accordion-body dark:bg-transparent dark:border-zinc-600">
                                <div className="p-5">
                                    <div>
                                        <div className="flex items-center">
                                            <div className="flex-grow overflow-hidden">
                                                <h5 className="mb-0 text-gray-700 truncate text-13 dark:text-gray-50">
                                                    Show security notification
                                                </h5>
                                            </div>
                                            <div className="flex items-center">
                                                <label
                                                    htmlFor="toggleSwitch3"
                                                    className="flex items-center cursor-pointer"
                                                >
                                                    <span className="relative">
                                                        <input
                                                            type="checkbox"
                                                            id="toggleSwitch3"
                                                            className="sr-only"
                                                        />
                                                        <span className="block w-8 h-5 rounded-full checked-bg" />
                                                        <span className="absolute w-3 h-3 transition rounded-full dot left-1 top-1" />
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 text-gray-700 accordion-item">
                            <h2>
                                <button
                                    type="button"
                                    className="flex items-center justify-between w-full px-3 py-2 font-medium text-left border border-gray-100 rounded accordion-header group dark:border-zinc-600 dark:bg-zinc-600 dark:text-gray-50"
                                >
                                    <span className="m-0 text-[14px] font-medium">Help</span>
                                    <i className="mdi mdi-chevron-down text-lg group-[.active]:rotate-180" />
                                </button>
                            </h2>
                            <div className="hidden bg-white border border-t-0 border-gray-100 accordion-body dark:bg-transparent dark:border-zinc-600">
                                <div className="p-5">
                                    <div className="py-3">
                                        <h5 className="mb-0 text-gray-700 text-13 dark:text-gray-300">
                                            <a href="#" className="block text-body">
                                                FAQs
                                            </a>
                                        </h5>
                                    </div>
                                    <div className="py-3 border-t border-gray-100 dark:border-zinc-600">
                                        <h5 className="mb-0 text-gray-700 text-13 dark:text-gray-300">
                                            <a href="#" className="text-body d-block">
                                                Contact
                                            </a>
                                        </h5>
                                    </div>
                                    <div className="py-3 border-t border-gray-100 dark:border-zinc-600">
                                        <h5 className="mb-0 text-gray-700 text-13 dark:text-gray-300">
                                            <a href="#" className="text-body d-block">
                                                Terms &amp; Privacy policy
                                            </a>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Setting