import React, { useEffect, useState } from 'react'
import GroupModel from './GroupModel'
import { useDispatch, useSelector } from 'react-redux';
import { changesSidebar, selectedRoom, toggleGroupModal } from '../../../Redux/slice/manageSlice';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { auth, db } from '../../../utils/firebase';
import ListLoader from '../../Loader/ListLoader';

const GroupChat = props => {
  const dispatch = useDispatch();
  const setting = useSelector((state) => state.manage.setting);
  const [allGroups, setAllGroups] = useState(null);
  const [groups, setGroups] = useState(null);
  const [loader, setLoader] = useState(true);

  const openGroupModal = () => {
    dispatch(toggleGroupModal(true));
  }

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      const q = query(
        collection(db, "rooms"),
        where("members", 'array-contains', uid),
        where('type', '==', 'group'),
        orderBy("updateAt", "desc")
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const newData = [];
        querySnapshot.forEach((doc) => {
          newData.push({ id: doc.id, ...doc.data() });
        });
        console.log(newData);
        setGroups(newData);
        setAllGroups(newData);
        setLoader(false);
      });

      
      // Unsubscribe from the snapshot listener when the component unmounts
      return () => unsubscribe();
    }
  }, []);

  const searchGroup = (e) => {
    setLoader(true);
    setTimeout(() => {
      if (e.target.value) {
        const filterdata = groups.filter((item) => {
          return item.name.toLowerCase().includes(e.target.value.toLowerCase()); // Adjust the field name as needed
        });
        setGroups(filterdata);
      } else {
        setGroups(allGroups);
      }
      setLoader(false);
    }, 200);
  }

  const openGroupChat = (group) => {
    dispatch(selectedRoom(group));
    dispatch(changesSidebar('chats'));
  }


  return (
    <div className="tab-content active">
      {/* Start chat content */}
      <div className="h-screen lg:h-auto">
        <div className="p-6">
          <div className="ltr:float-right rtl:float-left">
            <div className="relative">
              {/* Button trigger modal */}
              <button
                type="button"
                className="px-4 text-lg text-gray-500 group/tag dark:text-gray-300"
                data-tw-toggle="modal"
                data-tw-target="#modal-id"
                onClick={openGroupModal}
              >
                <i className="ri-group-line me-1 ms-0" />
                <span className="absolute items-center hidden mb-6 top-8 group-hover/tag:flex ltr:-left-8 rtl:-right-8">
                  <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">
                    Create groups
                  </span>
                  <span className="w-3 h-3 -mt-6 rotate-45 bg-black ltr:-ml-12 rtl:-mr-12" />
                </span>
              </button>
            </div>
          </div>
          <h4 className="mb-6 dark:text-gray-50">Groups</h4>
          {/* Start add group Modal */}

          <div className="py-1 mt-5 mb-5 rounded group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600">
            <span
              className="group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600 pe-1 ps-3 "
              id="basic-addon2"
            >
              <i className="text-lg text-gray-700 ri-search-line search-icon dark:text-gray-200" />
            </span>
            <input
              type="text"
              className="border-0 group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600 placeholder:text-[14px] focus:ring-offset-0 focus:outline-none focus:ring-0 dark:text-gray-400"
              placeholder="Search messages or users"
              onKeyUp={searchGroup}
            />
          </div>
          { loader ? <ListLoader /> :
            <div
              className="chat-message-list chat-group-list"
              data-simplebar=""
            >
              <ul>
                {groups && groups.map((group) => (
                  <li key={group.id} className="px-5 py-[15px] group-data-[theme-color=violet]:hover:bg-slate-100 group-data-[theme-color=green]:hover:bg-green-50/50 group-data-[theme-color=red]:hover:bg-red-50/50 group-data-[theme-color=violet]:dark:hover:bg-zinc-600 group-data-[theme-color=green]:dark:hover:bg-zinc-600 group-data-[theme-color=red]:dark:hover:bg-zinc-600 transition-all ease-in-out rounded"
                    onClick={() => openGroupChat(group)}
                  >
                    <a href="#">
                      <div className="flex items-center">
                        <div className="rtl:ml-3 ltr:mr-3" >
                          <img
                            src={group?.profile || `https://ui-avatars.com/api/?name=${group?.name?.charAt(0).toUpperCase()}`}
                            className="rounded-full h-9 w-9"
                            alt=""
                          />
                        </div>
                        <div className="flex-grow overflow-hidden">
                          <h5 className="mb-0 text-gray-700 truncate text-14 dark:text-gray-50">
                            {group?.name}
                          </h5>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          }
        </div>
      </div>
      {setting.isGroupModalOpen && <GroupModel />}
    </div>
  )
}

GroupChat.propTypes = {}

export default GroupChat