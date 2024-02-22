import React, { useEffect, useRef } from 'react'
import chatQuery from '../../firbaseQuery/chatQuery';
import { useState } from 'react';
import { auth, db } from '../../utils/firebase';
import { collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import commonHelper from '../../utils/commonHelper';
import ChatFooter from './ChatFooter';
import { useSelector } from 'react-redux';
import groupQuery from '../../firbaseQuery/groupQuery';
import ListLoader from '../Loader/ListLoader';

const ChatMessages = (prop) => {
    const room = prop.room;
    const user = auth.currentUser;
    const uid = user?.uid;
    const [messages, setMessages] = useState([]);
    const [messageType, setMessageType] = useState('initialLoad');
    const [loader, setLoader] = useState(false);
    const messagesEndRef = useRef(null);
    const setting = useSelector((state) => state.manage.setting);
    const roomId = setting?.room?.id
    let typingTimer;

    useEffect(() => {
        let unsubscribe; // Declare the unsubscribe variable
        const fetchUsersAndMessages = async () => {
            const users = await groupQuery.getUsersByIds(room?.members);
            const messageCollectionRef = collection(db, 'rooms', room.id, 'messages');
            const q = query(messageCollectionRef, orderBy('created_at', 'asc'));
            unsubscribe = onSnapshot(q, (querySnapshot) => {
                const messageData = [];
                querySnapshot.forEach((doc) => {
                    const user = users.find(user => user.id === doc.data().sendBy);
                    messageData.push({ id: doc.id, ...doc.data(), user });
                });
                setMessages(messageData);
            });
        };

        if (room?.members) {
            fetchUsersAndMessages();
            setMessageType('initialLoad');
            setLoader(true);
            console.log(unsubscribe);


        }

        return () => {
            if (unsubscribe) {
                // Unsubscribe from the snapshot listener when the component unmounts
                unsubscribe();
            }
        };
    }, [room, roomId]);

    useEffect(() => {
        console.log(messageType);
        if (messageType === "initialLoad") {
            messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
        } else if (messageType === "sendMessage") {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [roomId, messages, messageType]);

    const sendMessage = async (message) => {
        setMessageType('sendMessage');
        await chatQuery.sendMessage(auth, roomId, message);
        groupQuery.updateRoomInfo(roomId, {
            updateAt: serverTimestamp(),
            lastMessage: message,
            isActive: true
        });
    }

    const userTyping = async (status) => {
        const user = auth.currentUser;
        const uid = user.uid;
        await chatQuery.changeUserTypingStaus(roomId, uid, true);

        // Clear the previous timer if it exists
        if (typingTimer) {
            clearTimeout(typingTimer);
        }

        // Set a new timer to trigger isTyping to false after 1000 milliseconds (1 second)
        typingTimer = setTimeout(async() => {
            await chatQuery.changeUserTypingStaus(roomId, uid, false);
        }, 3000);
    }

    return (
        <>
            {!loader ? <ListLoader /> :
                <div className="h-[80vh] p-4 lg:p-6 h-64 overflow-auto" >
                    <ul className="mb-0">

                        {messages && messages.map((message) => {
                            if (message?.sendBy != uid && message?.user) {
                                return (
                                    <li className="clear-both py-4" key={message.id}>
                                        <div className="flex items-end gap-3">
                                            <div>
                                                <img
                                                    src={message?.user?.profile || `https://ui-avatars.com/api/?name=${message?.user?.firstName?.charAt(0).toUpperCase()}${message?.user?.lastName?.charAt(0).toUpperCase()}`}
                                                    alt=""
                                                    className="rounded-full h-9 w-9"
                                                />
                                            </div>
                                            <div>
                                                <div className="flex gap-2 mb-2">
                                                    <div className="relative px-5 py-3 text-white rounded-lg ltr:rounded-bl-none rtl:rounded-br-none group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=red]:bg-red-500">
                                                        <p className="mb-0">{message.message}</p>
                                                        <p className="mt-1 mb-0 text-xs text-right text-white/50">
                                                            <i className="align-middle ri-time-line" />{" "}
                                                            <span className="align-middle">{commonHelper.convertToTime(message.created_at)}</span>
                                                        </p>
                                                        <div className="before:content-[''] before:absolute before:border-[5px] before:border-transparent group-data-[theme-color=violet]:ltr:before:border-l-violet-500 group-data-[theme-color=violet]:ltr:before:border-t-violet-500 group-data-[theme-color=green]:ltr:before:border-l-green-500 group-data-[theme-color=green]:ltr:before:border-t-green-500 group-data-[theme-color=red]:ltr:before:border-l-red-500 group-data-[theme-color=red]:ltr:before:border-t-red-500 group-data-[theme-color=violet]:rtl:before:border-r-violet-500 group-data-[theme-color=violet]:rtl:before:border-t-violet-500 group-data-[theme-color=green]:rtl:before:border-r-green-500 group-data-[theme-color=green]:rtl:before:border-t-green-500 group-data-[theme-color=red]:rtl:before:border-r-red-500 group-data-[theme-color=red]:rtl:before:border-t-red-500 ltr:before:left-0 rtl:before:right-0 before:-bottom-2" />
                                                    </div>
                                                </div>
                                                <div className="font-medium text-gray-700 text-14 dark:text-gray-300">
                                                    {message?.user?.firstName} {message?.user?.lastName}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )
                            } else if (message?.sendBy == uid && message?.user) {
                                return (<li className="clear-both py-4" key={message.id}>
                                    <div className="relative inline-flex items-end mb-6 text-right ltr:rtl:float-left ltr:float-right rtl:float-left">
                                        <div className="order-3 mr-0 ltr:ml-4 rtl:mr-4">
                                            <img
                                                src={message?.user?.profile || `https://ui-avatars.com/api/?name=${message?.user?.firstName?.charAt(0).toUpperCase()}${message?.user?.lastName?.charAt(0).toUpperCase()}`}
                                                alt=""
                                                className="rounded-full h-9 w-9"
                                            />
                                        </div>
                                        <div>
                                            <div className="flex gap-2 mb-2 ltr:justify-end rtl:justify-start">
                                                <div className="relative order-2 px-5 py-3 text-gray-700 rounded-lg ltr:rounded-br-none rtl:rounded-bl-none bg-gray-50 dark:bg-zinc-700 dark:text-gray-50">
                                                    <p className="mb-0">
                                                        {message.message}
                                                    </p>
                                                    <p className="mt-1 mb-0 text-xs text-left text-gray-500 dark:text-gray-300">
                                                        <i className="align-middle ri-time-line" />{" "}
                                                        <span className="align-middle">{commonHelper.convertToTime(message.created_at)}</span>
                                                    </p>
                                                    <div className="before:content-[''] before:absolute before:border-[5px] before:border-transparent ltr:before:border-r-gray-50 ltr:before:border-t-gray-50 rtl:before:border-l-gray-50 rtl:before:border-t-gray-50 ltr:before:right-0 rtl:before:left-0 before:-bottom-2 ltr:dark:before:border-t-zinc-700 ltr:dark:before:border-r-zinc-700 rtl:dark:before:border-t-zinc-700 rtl:dark:before:border-l-zinc-700" />
                                                </div>
                                                <div className="relative self-start order-1 dropstart">
                                                    <a
                                                        className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-100"
                                                        href="/"
                                                        role="button"
                                                        data-bs-toggle="dropdown"
                                                        id="dropdownMenuButton13"
                                                    >
                                                        <i className="ri-more-2-fill" />
                                                    </a>
                                                    <div
                                                        className="absolute z-50 hidden py-2 my-6 text-left list-none bg-white border-none rounded shadow-lg ltr:right-auto ltr:left-0 xl:ltr:right-0 xl:ltr:left-auto rtl:right-0 rtl:left-auto xl:rtl:left-0 xl:rtl:right-auto dropdown-menu w-36 bg-clip-padding dark:bg-zinc-700"
                                                        aria-labelledby="dropdownMenuButton13"
                                                    >
                                                        <a
                                                            className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right"
                                                            href="/"
                                                        >
                                                            Copy{" "}
                                                            <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-file-copy-line" />
                                                        </a>
                                                        <a
                                                            className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right"
                                                            href="/"
                                                        >
                                                            Save{" "}
                                                            <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-save-line" />
                                                        </a>
                                                        <a
                                                            className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right"
                                                            href="/"
                                                        >
                                                            Forward{" "}
                                                            <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-chat-forward-line" />
                                                        </a>
                                                        <a
                                                            className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right"
                                                            href="/"
                                                        >
                                                            Delete{" "}
                                                            <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-delete-bin-line" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="font-medium text-gray-700 rtl:text-left text-14 dark:text-gray-300">
                                                {message?.user?.firstName} {message?.user?.lastName}
                                            </div>
                                        </div>
                                    </div>
                                </li>)
                            }
                        })}
                    </ul>
                    <div ref={messagesEndRef} />
                </div>
            }
            <ChatFooter room={room} onMessageSubmit={sendMessage} userTyping={userTyping} />
        </>
    )
}

export default ChatMessages
