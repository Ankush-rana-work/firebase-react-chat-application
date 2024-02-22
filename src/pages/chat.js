import React from 'react'
import SidebarMenu from '../components/sidebar/SidebarMenu';
import Sidebar from '../components/sidebar/index';
import ChatBody from '../components/chat/ChatBody';
import { useSelector } from 'react-redux';

const Chat = () => {
    const setting = useSelector((state) => state.manage.setting);
    console.log(setting?.room?.id , '>>>>comrm')
    return (
        <div className="lg:flex hide-scroll">
            <SidebarMenu />
            <Sidebar />
            {setting?.room?.id && (
                <ChatBody />
            )}
        </div>

    )
}
export default Chat