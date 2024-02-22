import React from 'react';
import RecentChat from './RecentChat';
import GroupChat from '../sidebar/group/GroupChat';
import UserList from './contact/UserList';
import Setting from './Setting';
import Profile from './Profile';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const setting = useSelector((state) => state.manage.setting);

  return (
    <div className="chat-leftsidebar lg:w-[380px] group-data-[theme-color=violet]:bg-slate-50 group-data-[theme-color=green]:bg-green-50/20 group-data-[theme-color=red]:bg-red-50/20 shadow overflow-y-hidden mb-[80px] lg:mb-0 group-data-[theme-color=violet]:dark:bg-zinc-700 group-data-[theme-color=green]:dark:bg-zinc-700 group-data-[theme-color=red]:dark:bg-zinc-700">
      <div>
        {setting.acitveSidbar == 'profile' && (<Profile />)}
        {setting.acitveSidbar == 'chats' && (<RecentChat />)}
        {setting.acitveSidbar == 'group' && (<GroupChat />)}
        {setting.acitveSidbar == 'contacts' && (<UserList />)}
        {setting.acitveSidbar == 'settings' && (<Setting />)}
      </div>
    </div>
  )
}

export default Sidebar  