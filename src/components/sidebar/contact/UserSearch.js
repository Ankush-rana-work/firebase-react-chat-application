import React, { useState } from 'react'

const UserSearch = (prop) => {
    const [search, setSearch] = useState('');

    const searchHandler = (event) => {
        prop.searchUser(event.target.value);
        setSearch(event.target.value);
        console.log(event.target.value);
    }

    return (
        <div className="py-1 mt-5 mb-5 group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 rounded group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600">
            <span
                className="group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 pe-1 ps-3 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600"
                id="basic-addon"
            >
                <i className="text-lg ttext-gray-700 ri-search-line search-icon dark:text-gray-200" />
            </span>
            <input
                type="text"
                className="border-0 group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600 placeholder:text-[14px] focus:ring-offset-0 focus:outline-none focus:ring-0 placeholder:dark:text-gray-300"
                placeholder="Search users.."
                onKeyUp={searchHandler}
            />
        </div>
    )
}

export default UserSearch