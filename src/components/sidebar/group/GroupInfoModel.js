import React, { useEffect } from 'react'
import avata from '../../../assets/images/avatar-2.jpg'
import { useState } from 'react'
import GroupMembersList from './GroupMembersList';
import EditGroup from './EditGroup';
import { selectedRoom, toggleGroupInfoModal } from '../../../Redux/slice/manageSlice';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db, storage } from '../../../utils/firebase';
import groupQuery from '../../../firbaseQuery/groupQuery';
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import commonQuery from '../../../firbaseQuery/commonQuery';

const GroupInfoModel = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState('members');
  const [room, setRoom] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const setting = useSelector((state) => state.manage.setting);

  // close group modal
  const closeGroupInfoModal = () => {
    dispatch(toggleGroupInfoModal(false));
  }

  useEffect(() => {
    // get room detail information
    const getRoomInfo = async () => {
      const roomId = setting.room.id;
      const roomDocRef = doc(db, "rooms", roomId);
      const unsubscribe = onSnapshot(roomDocRef, async (querySnapshot) => {
        let roomdata = { roomId, ...querySnapshot.data() };
        const userInfo = await groupQuery.getUsersByIds(roomdata.members);
        setRoom({ ...roomdata, membersDetail: userInfo });
      });
      // Unsubscribe from the snapshot listener when the component unmounts
      return () => unsubscribe();
    }
    getRoomInfo();
  }, [])

  // uplaoding image to firebase storage then updating it on firestore
  const handleImageChange = (event) => {
    const file = event.target.files;
    if (file && file[0]) {
      let reader = new FileReader();
      reader.onload = async (e) => {
        try {
          setSelectedImage(e.target.result);
          const roomId = setting.room.id;
          // Upload image to Firebase Storage
          const downloadURL = await commonQuery.uploadImageAndGetUrl('room/images/', file[0]);
          await groupQuery.updateRoomInfo(roomId, { profile: downloadURL })
          dispatch(selectedRoom({ ...setting.room, profile: downloadURL }));
        } catch (error) {
          console.log(error);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  console.log(selectedImage);

  return (
    <div className="relative z-50 modal">
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 transition-opacity bg-black bg-opacity-50 modal-overlay">
          <div className="flex items-center justify-center max-w-lg min-h-screen p-4 mx-auto text-center animate-translate">
            <div className="relative w-full max-w-lg my-8 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl -top-10 dark:bg-zinc-700">
              <div className="group-data-[theme-color=violet]:bg-violet-800/10 group-data-[theme-color=green]:bg-green-800/10 group-data-[theme-color=red]:bg-red-800/10 group-data-[theme-color=violet]:dark:bg-zinc-700 group-data-[theme-color=red]:dark:bg-zinc-700 group-data-[theme-color=green]:dark:bg-zinc-700">
                <div class="flex items-start justify-between p-4 rounded-t dark:border-gray-600">
                  <button
                    type="button"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={closeGroupInfoModal}
                  >
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="text-center">
                  <label htmlFor="upload-input">
                    <img
                      src={selectedImage || room?.profile || `https://ui-avatars.com/api/?name=${room?.name?.charAt(0).toUpperCase()}`}
                      className="mx-auto mb-4 w-32 rounded-full pt-4"
                      alt="Avatar"
                    />
                  </label>
                  <input id="upload-input" type="file" onChange={handleImageChange} style={{ display: 'none' }} />
                  <h5 className="text-xl font-medium leading-tight">{room?.name}</h5>
                  <p className="pb-2 text-neutral-500 dark:text-neutral-400">
                    {room?.description}
                  </p>
                </div>
                <ul className="text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
                  <li className="w-full">
                    <a
                      href="#"
                      className="inline-block w-full p-4 text-gray-900 bg-gray-100 rounded-l-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white"
                      onClick={() => setTab('members')}
                    >
                      Users
                    </a>
                  </li>
                  <li className="w-full">
                    <a
                      href="#"
                      className="inline-block w-full p-4 bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                      onClick={() => setTab('editGroup')}
                    >
                      Edit Group
                    </a>
                  </li>
                </ul>
                {(tab == "members") && (
                  <GroupMembersList room={room} />
                )
                }
                {(tab == "editGroup") && (
                  <EditGroup room={room} />
                )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default GroupInfoModel