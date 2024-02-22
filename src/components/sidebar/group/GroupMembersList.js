import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { auth } from '../../../utils/firebase';

const GroupMembersList = (props) => {
    const [authInfo, setUserInfo] = useState(null);

    useEffect(()=>{
        const user = auth.currentUser;
        setUserInfo(user);
    },[]);

    const leaveGroup = (userId, item) => {
        console.log(userId, item);
    }

    return (
        <div className="p-4  h-100">
            <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
                {props?.room?.membersDetail ? (
                    props.room.membersDetail.map((item) => (
                        <li className="pb-3 sm:pb-4" key={item.roomId}>
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <img
                                        className="w-8 h-8 rounded-full"
                                        src={item.profile || `https://ui-avatars.com/api/?name=${item?.firstName?.charAt(0).toUpperCase()}`}
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        {item.firstName} {item?.lastName}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        {item.email}
                                    </p>
                                </div>
                                <div className="flex-shrink-0">
                                    {authInfo?.uid == item.id && (
                                        <button type="submit" class="text-white border-transparent btn group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=red]:bg-red-500 group-data-[theme-color=violet]:hover:bg-violet-600 group-data-[theme-color=green]:hover:bg-green-600"
                                        onClick={() => leaveGroup(authInfo?.uid, item)}>Delete</button>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="pb-3 sm:pb-4">No member available</li>
                )}

            </ul>
        </div>
    )
}

export default GroupMembersList