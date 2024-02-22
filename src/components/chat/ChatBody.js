import React, { useEffect, useState } from 'react'
import ChatHeader from './ChatHeader'
import { useSelector } from 'react-redux';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import ChatMessages from './ChatMessages';

const ChatBody = () => {
    const [roomInfo, setRoomInfo] = useState(null);
    const setting = useSelector((state) => state.manage.setting);
    const roomId = setting?.room?.id

    useEffect(() => {
        let unsubscribe;

        const fetchUserData = async () => {
            const roomDocRef = doc(db, "rooms", roomId);
            unsubscribe = onSnapshot(roomDocRef, (doc) => {
                console.log(doc.data(), 'nka');
                setRoomInfo({ id: roomId, ...doc.data() });
            });

        };

        if (roomId) {
            fetchUserData();
        }
        // Add cleanup for the listener if the roomId changes
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [roomId])

    return (
        <div className="w-full overflow-hidden transition-all duration-150 bg-white user-chat dark:bg-zinc-800">
            <div className="lg:flex">
                {/* start chat conversation section */}
                <div className="relative w-full overflow-hidden ">
                    <ChatHeader room={roomInfo} />
                    <ChatMessages room={roomInfo} />
                </div>
            </div>
        </div>
    )
}

export default ChatBody