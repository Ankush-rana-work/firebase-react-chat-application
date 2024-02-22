import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleAddMemberGroupModal, toggleGroupInfoModal } from '../../Redux/slice/manageSlice';
import AddGroupMemberModel from '../sidebar/group/AddGroupMemberModel';
import GroupInfoModel from '../sidebar/group/GroupInfoModel';

const ChatHeader = (props) => {
    const dispatch = useDispatch();
    const setting = useSelector((state) => state.manage.setting);
    const [toggleMenu, setToggleMenu] = useState(false);
    const room = props.room;

    const openGroupModel = () => {
        dispatch(toggleAddMemberGroupModal(true));
    }

    const openGroupInfo = () => {
        dispatch(toggleGroupInfoModal(true));
    }

    return (
        <div className="p-4 border-b border-gray-100 lg:p-6 dark:border-zinc-600">
            <div className="grid items-center grid-cols-12">
                <div className="col-span-8 sm:col-span-4">
                    <div className="flex items-center">
                        <div className="block ltr:mr-2 rtl:ml-2 lg:hidden">
                            <a
                                href="/"
                                className="p-2 text-gray-500 user-chat-remove text-16"
                            >
                                <i className="ri-arrow-left-s-line" />
                            </a>
                        </div>
                        <div className="rtl:ml-3 ltr:mr-3" onClick={openGroupInfo}>
                            {setting?.room?.type === "individual" ?
                                <img
                                    src={setting?.room?.UserInfo?.profile || `https://ui-avatars.com/api/?name=${setting?.room?.UserInfo?.firstName?.charAt(0).toUpperCase()}`}
                                    className="rounded-full h-9 w-9"
                                    alt=""
                                />
                                :
                                <img
                                    src={setting?.room?.profile || `https://ui-avatars.com/api/?name=${setting?.room?.name?.charAt(0).toUpperCase()}`}
                                    className="rounded-full h-9 w-9"
                                    alt=""
                                />
                            }
                        </div>
                        <div className="flex-grow overflow-hidden" onClick={openGroupInfo}>
                            <h5 className="mb-0 truncate text-16 ltr:block">
                                <a href="/" className="text-gray-800 dark:text-gray-50">
                                    {setting?.room?.type == "individual" ?
                                        setting?.room?.UserInfo?.firstName+' '+setting?.room?.UserInfo?.lastName
                                        :
                                        setting?.room?.name
                                    }
                                </a>
                                {setting?.room?.type != "group" && (
                                    <i className="text-green-500 ltr:ml-1 rtl:mr-1 ri-record-circle-fill text-10 " />)
                                }
                            </h5>
                        </div>
                    </div>
                </div>
                <div className="col-span-4 sm:col-span-8">
                    <ul className="flex items-center justify-end lg:gap-4">
                        <li className="px-3">
                            <div className="relative dropstart">
                                <button
                                    className="p-0 text-xl text-gray-500 border-0 btn dropdown-toggle dark:text-gray-300"

                                >
                                    <i className="ri-search-line" />
                                </button>
                                <ul
                                    className="absolute z-50 hidden mt-2 text-left list-none bg-white border rounded-lg shadow-lg w-fit border-gray-50 dropdown-menu top-8 dark:bg-zinc-700 bg-clip-padding dark:border-gray-700"
                                    aria-labelledby="dropdownMenuButton10"
                                >
                                    <li className="p-2">
                                        <input
                                            type="text"
                                            className="text-gray-500 border-0 rounded bg-gray-50 placeholder:text-14 text-14 dark:bg-zinc-600 dark:text-gray-300 placeholder:dark:text-gray-300 focus:ring-0"
                                            placeholder="Search.."
                                        />
                                    </li>
                                </ul>
                            </div>
                        </li>
                        {room?.type === "group" && (
                            <li className="px-3">
                                <a
                                    href="/"
                                    className="text-gray-500 dark:text-gray-300 lg:block profileTab"
                                    onClick={openGroupModel}
                                >
                                    <i className="text-xl ri-group-line" />
                                </a>
                            </li>
                        )}
                        <li className="px-3">
                            <div className="relative dropdown">
                                <button
                                    className="p-0 text-xl text-gray-500 border-0 btn dropdown-toggle dark:text-gray-300"
                                    onClick={() => setToggleMenu(prevState => !prevState)}
                                >
                                    <i className="ri-more-fill" />
                                </button>
                                {toggleMenu && (
                                    <ul
                                        className="absolute z-50 w-40 py-2 mx-4 mt-2 text-left list-none bg-white border rounded shadow-lg ltr:-right-4 border-gray-50 dropdown-menu top-8 dark:bg-zinc-600 bg-clip-padding dark:border-gray-600/50 rtl:-left-5"
                                        aria-labelledby="dropdownMenuButton11"
                                    >
                                        <li className="block lg:hidden">
                                            <a
                                                className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent profileTab dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-700 ltr:text-left rtl:text-right"
                                                href="/"
                                            >
                                                View profile{" "}
                                                <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-300 ri-user-2-line text-16" />
                                            </a>
                                        </li>
                                        <li className="block lg:hidden">
                                            <a
                                                className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-700 ltr:text-left rtl:text-right"
                                                href="/"
                                                data-tw-toggle="modal"
                                                data-tw-target="#audiCallModal"
                                            >
                                                Audio{" "}
                                                <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-300 ri-phone-line text-16" />
                                            </a>
                                        </li>
                                        <li className="block lg:hidden">
                                            <a
                                                className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-700 ltr:text-left rtl:text-right"
                                                href="/"
                                                data-tw-toggle="modal"
                                                data-tw-target="#videoCallModal"
                                            >
                                                Video{" "}
                                                <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-300 ri-vidicon-line text-16" />
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-700 ltr:text-left rtl:text-right"
                                                href="/"
                                            >
                                                Archive{" "}
                                                <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-300 ri-archive-line text-16" />
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-700 ltr:text-left rtl:text-right"
                                                href="/"
                                            >
                                                Muted{" "}
                                                <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-300 ri-volume-mute-line text-16" />
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-700 ltr:text-left rtl:text-right"
                                                href="/"
                                            >
                                                Delete{" "}
                                                <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-300 ri-delete-bin-line text-16" />
                                            </a>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            {setting?.isAddMemberGroupModalOpen && (
                <AddGroupMemberModel />
            )}
            {setting?.isGroupModalInfoOpen && (
                <GroupInfoModel />
            )}
        </div>
    )
}

export default ChatHeader