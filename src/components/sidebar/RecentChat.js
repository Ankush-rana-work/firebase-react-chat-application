import React, { useEffect, useState } from 'react'
import { auth, db } from '../../utils/firebase';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { selectedRoom } from '../../Redux/slice/manageSlice';
import commonQuery from '../../firbaseQuery/commonQuery';
import ListLoader from '../Loader/ListLoader';
import chatQuery from '../../firbaseQuery/chatQuery';

const RecentChat = () => {
    const dispatch = useDispatch();
    const setting = useSelector((state) => state.manage.setting);
    //const [allRecentChat, setAllRecentChat] = useState(null);
    const [recentChat, setRecentChat] = useState(null);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const uid = user.uid;
            const q = query(
                collection(db, "rooms"),
                where("members", 'array-contains', uid),
                where("isActive", '==', true),
                orderBy("updateAt", "desc")
            );

            const unsubscribe = onSnapshot(q, async (querySnapshot) => {
                const newData = [];
                let memberIds = [];
                querySnapshot.forEach((doc) => {
                    console.log(doc.data(), 'okey workign');
                    const data = doc.data();
                    if (data.type === 'individual') {
                        memberIds = [...memberIds, ...data.members];
                    }
                    newData.push({ id: doc.id, ...data });

                });
                memberIds = memberIds.filter((value) => uid != value);

                if (memberIds.length) {
                    const userData = await commonQuery.getUsersByIds(memberIds);

                    newData.forEach((room) => {
                        if (room.type == "individual") {
                            const receiverUserId = room?.members?.filter((value) => uid != value);
                            const receiverUserInfo = userData.find((item) => item.id == receiverUserId);
                            room.UserInfo = receiverUserInfo;
                            
                        }
                        room.typingUserStr = chatQuery.getTypingUser(room.userTypingStatus, uid);
                    })
                    setLoader(false);
                }

                setRecentChat(newData);
                //setAllRecentChat(newData);
            });

            
            // Unsubscribe from the snapshot listener when the component unmounts
            return () => unsubscribe();
        }
    }, []);

    
    const openGroupChat = (group) => {
        console.log(group);
        let roomInfo = null;
        if (group.type == 'individual') {
            roomInfo = recentChat.find((item) => item.id == group.id);
        }
        dispatch(selectedRoom(roomInfo || group));
    }

    console.log(recentChat);
    return (
        <div className="tab-content active">

            {/* Start chat content */}
            <div>
                <div className="px-6 pt-6">
                    <h4 className="mb-0 text-gray-700 dark:text-gray-50">Chats</h4>
                    <div className="py-1 mt-5 mb-5 rounded group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600">
                        <span
                            className="group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 pe-1 ps-3 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600"
                            id="basic-addon1"
                        >
                            <i className="text-lg text-gray-400 ri-search-line search-icon dark:text-gray-200" />
                        </span>
                        <input
                            type="text"
                            className="border-0 group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 placeholder:text-[14px] focus:ring-offset-0 focus:outline-none focus:ring-0 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600 placeholder:text-gray-400"
                            placeholder="Search messages or users"
                            aria-label="Search messages or users"
                            aria-describedby="basic-addon1"
                        />
                    </div>
                </div>
                {/* end user status */}
                {/* Start chat-message-list */}
                <div>
                    <h5 className="px-6 mb-4 text-16 dark:text-gray-50">Recent</h5>
                    {loader ? <ListLoader /> :
                        <div className="h-[610px] px-2 h-64 overflow-auto" data-simplebar="">
                            <ul className="chat-user-list">
                                {recentChat && recentChat.map((type) => (
                                    <li
                                        className={`${(type.id == setting?.room?.id) ? 'group-data-[theme-color=violet]:bg-slate-100' : ''
                                            } peer-only-of-type:x-5 py-[15px] group-data-[theme-color=violet]:hover:bg-slate-100 group-data-[theme-color=green]:hover:bg-green-50/50 group-data-[theme-color=red]:hover:bg-red-50/50 transition-all ease-in-out border-b border-white/20 dark:border-zinc-700 group-data-[theme-color=violet]:dark:hover:bg-zinc-600 group-data-[theme-color=green]:dark:hover:bg-zinc-600 group-data-[theme-color=red]:dark:hover:bg-zinc-600 dark:hover:border-zinc-700`}
                                        key={type.id}
                                        onClick={() => openGroupChat(type)}>
                                        <a href="#">
                                            <div className="flex">
                                                <div className="relative self-center ltr:mr-3 rtl:ml-3">
                                                    {type.type == "individual" ?
                                                        <>
                                                            <img
                                                                src={type?.UserInfo?.profile || `https://ui-avatars.com/api/?name=${type?.UserInfo?.firstName?.charAt(0).toUpperCase()}`}
                                                                className="rounded-full w-9 h-9"
                                                                alt=""
                                                            />
                                                            <span className="absolute w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full top-7 ltr:right-1 rtl:left-1 dark:border-zinc-600" />
                                                        </>
                                                        :
                                                        <img
                                                            src={type?.profile || `https://ui-avatars.com/api/?name=${type?.name?.charAt(0).toUpperCase()}`}
                                                            className="rounded-full w-9 h-9"
                                                            alt=""
                                                        />

                                                    }

                                                </div>
                                                <div className="flex-grow overflow-hidden">
                                                    <h5 className="mb-1 text-base truncate dark:text-gray-50">
                                                        {type?.type == "individual" ?
                                                            type?.UserInfo?.firstName + ' ' + type?.UserInfo?.lastName
                                                            :
                                                            type?.name
                                                        }
                                                    </h5>
                                                    <p className="mb-0 text-gray-500 truncate dark:text-gray-300 text-14">
                                                        {type.lastMessage}
                                                    </p>
                                                    { type.typingUserStr && (
                                                    
                                                    <div class="flex items-end gap-2 mb-0 group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500 text-14">
                                                        <p class="mb-0">typing</p>
                                                        <div class="animate-typing flex gap-0.5">
                                                            <p class="w-1 h-1 mb-1 rounded-full dot group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=red]:bg-red-500 animate-bounce"></p>
                                                            <p class="w-1 h-1 mb-1 rounded-full dot-2 group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=red]:bg-red-500 "></p>
                                                            <p class="w-1 h-1 mb-1 rounded-full dot-3 group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=red]:bg-red-500 animate-bounce"></p>
                                                        </div>
                                                    </div> 
                                                )}
                                                </div>
                                                
                                                <div className="text-gray-500 text-11 dark:text-gray-300">
                                                    05 min
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    }
                </div>
                {/* End chat-message-list */}
            </div>
        </div>
    )
}

export default RecentChat