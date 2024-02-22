import React, { useEffect, useState } from 'react'
import EmojiPicker from 'emoji-picker-react';
import chatQuery from '../../firbaseQuery/chatQuery';
import { auth } from '../../utils/firebase';

const ChatFooter = (props) => {
    const room = props.room;
    const [message, setMessage] = useState('');
    const [toggleEmoji, setToggleEmoji] = useState(false);
    const [typingUser, setTypingUser] = useState('');

    useEffect(() => {
        const user = auth.currentUser;
        const uid = user?.uid;
        console.log(uid);
        if (uid && room) {
            const userTypingObj = room?.userTypingStatus;
            const typingUserStr = chatQuery.getTypingUser(userTypingObj, uid);
            setTypingUser(typingUserStr);
        }

    }, [room])

    const handleSubmit = () => {
        props.onMessageSubmit(message);
        setMessage('');
    };

    const onEmojiClick = (emojiObject, event) => {
        console.log(message);
        setMessage((prevMessage) => prevMessage + emojiObject.emoji);
    };

    const handleKeyUp = (event) => {
        if (event.keyCode === 8) {
            console.log(event.target.value);
            setMessage(event.target.value);
        }
        props.userTyping(true);
    };

    const handleFocus = (event) => {
        setToggleEmoji(false);
    }

    return (
        <>
            {typingUser && (
                <div class="flex items-end gap-2 mb-0 group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500 text-14">
                    <p class="mb-0">typing</p>

                    <div class="animate-typing flex gap-0.5">
                        <p class="w-1 h-1 mb-1 rounded-full dot group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=red]:bg-red-500 animate-bounce"></p>
                        <p class="w-1 h-1 mb-1 rounded-full dot-2 group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=red]:bg-red-500 "></p>
                        <p class="w-1 h-1 mb-1 rounded-full dot-3 group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=red]:bg-red-500 animate-bounce"></p>
                    </div>
                </div>
            )}
            <div className="z-40 w-full p-6 mb-0 bg-white border-t lg:mb-1 border-gray-50 dark:bg-zinc-800 dark:border-zinc-700">
                <div className="flex gap-2">
                    <div className="flex-grow">
                        <input
                            type="text"
                            className="w-full border-transparent rounded bg-gray-50 placeholder:text-14 text-14 dark:bg-zinc-700 dark:placeholder:text-gray-300 dark:text-gray-300"
                            placeholder="Enter Message..."
                            onChange={(event) => setMessage(event.target.value)}
                            onKeyUp={handleKeyUp}
                            onFocus={handleFocus}
                            value={message}
                        />
                    </div>
                    <div>
                        <div>
                            <ul className="mb-0">
                                {toggleEmoji && (
                                    <EmojiPicker
                                        size="23"
                                        onEmojiClick={onEmojiClick}
                                    />
                                )}
                                <li className="inline-block" title="Emoji">
                                    <button
                                        type="button"
                                        className="border-transparent group/tooltip btn relative group-data-[theme-color=violet]:dark:text-violet-200 group-data-[theme-color=green]:dark:text-green-200 group-data-[theme-color=red]:dark:text-red-200 group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500 text-16"
                                        onClick={() => setToggleEmoji(!toggleEmoji)}
                                    >
                                        <div className="absolute items-center hidden -top-10 ltr:-left-2 group-hover/tooltip:flex rtl:-right-2">
                                            <div className="absolute -bottom-1 left-[40%] w-3 h-3 rotate-45 bg-black" />
                                            <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">
                                                Emoji
                                            </span>
                                        </div>
                                        <i className="ri-emotion-happy-line" />
                                    </button>
                                </li>
                                <li className="inline-block" title="Attached File">
                                    <button
                                        type="button"
                                        className="border-transparent btn group/tooltip group-data-[theme-color=violet]:dark:text-violet-200 group-data-[theme-color=green]:dark:text-green-200 group-data-[theme-color=red]:dark:text-red-200 group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500 text-16"
                                    >
                                        <div className="absolute items-center hidden -top-10 ltr:-left-2 group-hover/tooltip:flex rtl:-right-2">
                                            <div className="absolute -bottom-1 left-[40%] w-3 h-3 rotate-45 bg-black" />
                                            <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">
                                                Attached File
                                            </span>
                                        </div>
                                        <i className="ri-attachment-line" />
                                    </button>
                                </li>
                                <li className="inline-block">
                                    <button
                                        type="submit"
                                        className="text-white border-transparent btn group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=red]:bg-red-500 group-data-[theme-color=violet]:hover:bg-violet-600 group-data-[theme-color=green]:hover:bg-green-600"
                                        onClick={handleSubmit}
                                    >
                                        <i className="ri-send-plane-2-fill" />
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatFooter