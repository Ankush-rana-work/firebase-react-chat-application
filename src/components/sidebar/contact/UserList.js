import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../../utils/firebase';
import commonHelper from '../../../utils/commonHelper';
import UserSearch from './UserSearch';
import ListLoader from '../../Loader/ListLoader';
import individualQuery from '../../../firbaseQuery/individualQuery';
import commonQuery from '../../../firbaseQuery/commonQuery';
import { useDispatch } from 'react-redux';
import { changesSidebar, selectedRoom } from '../../../Redux/slice/manageSlice';

const UserList = () => {
    const dispatch = useDispatch();
    const [searchUsers, setSearchUsers] = useState();
    const [users, setUsers] = useState();
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const uid = user.uid;
            const q = query(
                collection(db, "users"),
                where('__name__', 'not-in', [uid])
            );

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const newData = [];
                querySnapshot.forEach((doc) => {
                    newData.push({ id: doc.id, ...doc.data() });
                });
                setUsers(newData);
                setSearchUsers(newData)
                setLoader(false);
            });

            
            // Unsubscribe from the snapshot listener when the component unmounts
            return () => unsubscribe();
        }
    }, []);

    const searchUser = (searchText) => {
        setLoader(true);
        setTimeout(() => {
            const filterdata = users.filter((item) => {
                const fullName = item.firstName + ' ' + item.lastName;
                return fullName.toLowerCase().includes(searchText.toLowerCase()); // Adjust the field name as needed
            });
            setLoader(false);
            setSearchUsers(filterdata);
        }, 200);
    }

    const CreateOrSelectRoom = async (user) => {
        try {
            const currentUser = auth.currentUser;
            const currentUserId = currentUser.uid;
            const selectedUserId = user?.id;
            let room = null;
            let memberIds = [];
            // checking sender and receiver room exist
            let userRoom = await individualQuery.checkOneToOneRoomExist(selectedUserId, currentUserId);
            console.log(userRoom, '>>>user room exist');
            
            // room existing check
            if (!userRoom?.id) {
                // if room is not exist then create
                const roomDocId = await individualQuery.createIndividualRoom('abc', 'individual', [selectedUserId, currentUserId]);
                room = await commonQuery?.getRoom(roomDocId);
            } else {
                //await commonQuery?.getRoom(userRoom.id);
                room = userRoom;
            }

            if (room.type == 'individual') {
                memberIds = room?.members.filter((value) => currentUserId != value);
                let UserInfo = await commonQuery.getUsersByIds(memberIds);
                UserInfo = UserInfo[0]||null;
                room = {...room, UserInfo}
            }
            console.log(room);
            dispatch(selectedRoom(room));
            dispatch(changesSidebar('chats'));
        } catch (error) {
            console.log(error);
            commonHelper.showToats(true, "Fail to Add member")
        }
    }

    return (
        <div className="tab-content active">
            {/* Start chat content */}
            <div>
                <div className="p-6 pb-0">
                    <h4 className="mb-6 dark:text-gray-50">Contacts</h4>
                    <UserSearch searchUser={searchUser} />
                </div>
                {loader ? <ListLoader /> :
                    <div className="h-[80vh]" data-simplebar="">
                        <div className="p-6">
                            {commonHelper.userAlphabeticallyListing(searchUsers).map((UsersList) => (
                                <div key={UsersList.alphabet}>
                                    <div className="p-3 font-bold">
                                        {commonHelper.capitalizeFirstLetter(UsersList.alphabet)}
                                    </div>
                                    <ul className="list-unstyled contact-list">
                                        {UsersList?.user?.map((userInfo, index) => (
                                            <li
                                                key={index}
                                                className="px-5 py-[15px] group-data-[theme-color=violet]:hover:bg-slate-100"
                                                onClick={() => CreateOrSelectRoom(userInfo)}
                                            >
                                                <div className="flex items-center">
                                                    <div className="flex-grow">
                                                        <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                                                            {commonHelper.capitalizeFirstLetter(userInfo.firstName)} {commonHelper.capitalizeFirstLetter(userInfo.lastName)}
                                                        </h5>
                                                    </div>
                                                    <div className="relative flex-shrink-0 dropdown">
                                                        <button
                                                            className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                                                            type="button"
                                                            data-bs-toggle="dropdown"
                                                            id="dropdownMenuButtonB"
                                                        >
                                                            <i className="text-lg ri-more-2-fill" />
                                                        </button>
                                                        <ul
                                                            className="absolute hidden z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                                                            aria-labelledby="dropdownMenuButtonB"
                                                        >
                                                            <li>
                                                                <a
                                                                    className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                                                    href="#"
                                                                >
                                                                    Remove <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line" />
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default UserList