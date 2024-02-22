import React, { useEffect, useState } from 'react'
import { auth, db } from '../../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';
import commonHelper from '../../utils/commonHelper';
import commonQuery from '../../firbaseQuery/commonQuery';
import authQuery from '../../firbaseQuery/authquery';
import FullPageLoader from '../Loader/FullPageLoader';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        console.log('ee');
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const uid = user.uid;
                    const docRef = doc(db, 'users', uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setProfile(docSnap.data());
                        console.log(docSnap.data());
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    // uplaoding image to firebase storage then updating it on firestore
    const handleImageChange = (event) => {
        setLoader(true);
        const file = event.target.files;
        if (file && file[0]) {
            let reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const user = auth.currentUser;
                    const userId = user.uid;
                    setSelectedImage(e.target.result);
                    // Upload image to Firebase Storage
                    const downloadURL = await commonQuery.uploadImageAndGetUrl('profile/image', file[0]);
                    await authQuery.updateUser(userId, { profile: downloadURL });
                    setLoader(false);
                } catch (error) {
                    console.log(error);
                }
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    if( loader && !profile){
        return(<FullPageLoader/>)
    }
    
    return (
        <div className="tab-content active">
            {/* Start profile content */}
            <div>
                <div className="px-6 pt-6">
                    <div className="ltr:float-right rtl:float-left">
                        <div className="relative flex-shrink-0 dropdown">
                        </div>
                    </div>
                    <h4 className="mb-0 text-gray-700 dark:text-gray-50">My Profile</h4>
                </div>
                <div className="p-6 text-center border-b border-gray-100 dark:border-zinc-600">
                    <div className="mb-4">
                        <label htmlFor="upload-input">
                            <img
                                src={commonHelper.defaultProfileImage(selectedImage, profile)}
                                className="w-24 h-24 p-1 mx-auto border border-gray-100 rounded-full dark:border-zinc-800"
                                alt=""
                            />
                        </label>
                        <input id="upload-input" type="file" onChange={handleImageChange} style={{ display: 'none' }} />
                    </div>
                    <h5 className="mb-1 text-16 dark:text-gray-50">{profile?.firstName} {profile?.lastName}</h5>
                    <h5 className="mb-0 truncate text-14 ltr:block rtl:hidden">
                        <a href="/" className="text-gray-500 dark:text-gray-50">
                            {profile?.status === "online" ? (
                                <span className="text-green-500 ltr:ml-1 rtl:mr-1 ri-record-circle-fill text-10" />
                            ) : (
                                <span className="text-gray-500 ltr:ml-1 rtl:mr-1 ri-record-circle-fill text-10" />
                            )}
                            {profile?.status ? profile?.status?.charAt(0).toUpperCase() + profile?.status?.slice(1) : ''}
                        </a>
                    </h5>
                    <h5 className="mb-0 truncate text-14 ltr:hidden rtl:block">
                        <a href="/" className="text-gray-500 dark:text-gray-50">
                            {profile?.lastName}
                            <i className="text-green-500 ltr:ml-1 rtl:mr-1 ri-record-circle-fill text-10 " />
                        </a>
                    </h5>
                </div>
                {/* End profile user */}
                {/* Start user-profile-desc */}
                <div className="p-6 h-[550px]" data-simplebar="">
                    <div>
                        <p className="mb-6 text-gray-500 dark:text-gray-300">
                            If several languages coalesce, the grammar of the resulting
                            language is more simple and regular than that of the individual.
                        </p>
                    </div>
                    <div data-tw-accordion="collapse">
                        <div className="text-gray-700 accordion-item">
                            <h2>
                                <button
                                    type="button"
                                    className="flex items-center justify-between w-full px-3 py-2 font-medium text-left border border-gray-100 rounded-t accordion-header group active dark:border-b-zinc-600 dark:bg-zinc-600 dark:border-zinc-600"
                                >
                                    <span className="m-0 text-[14px] dark:text-gray-50 font-semibold ltr:block rtl:hidden">
                                        <i className="mr-2 align-middle ri-user-2-line d-inline-block" />{" "}
                                        About
                                    </span>
                                    <span className="m-0 text-[14px] dark:text-gray-50 font-semibold ltr:hidden rtl:block">
                                        About{" "}
                                        <i className="ml-2 align-middle ri-user-2-line d-inline-block" />
                                    </span>
                                    <i className="mdi mdi-chevron-down text-lg group-[.active]:rotate-180 dark:text-gray-50" />
                                </button>
                            </h2>
                            <div className="block bg-white border border-t-0 border-gray-100 accordion-body dark:bg-transparent dark:border-zinc-600">
                                <div className="p-5">
                                    <div>
                                        <p className="mb-1 text-gray-500 dark:text-gray-300">
                                            Name
                                        </p>
                                        <h5 className="text-sm dark:text-gray-50">
                                            {profile?.firstName} {profile?.lastName}
                                        </h5>
                                    </div>
                                    <div className="mt-5">
                                        <p className="mb-1 text-gray-500 dark:text-gray-300">
                                            Email
                                        </p>
                                        <h5 className="text-sm dark:text-gray-50">{profile?.email}</h5>
                                    </div>
                                    <div className="mt-5">
                                        <p className="mb-1 text-gray-500 dark:text-gray-300">
                                            Time
                                        </p>
                                        <h5 className="text-sm dark:text-gray-50">
                                            {commonHelper.convertToTime(profile?.time)}
                                        </h5>
                                    </div>
                                    <div className="mt-5">
                                        <p className="mb-1 text-gray-500 dark:text-gray-300">
                                            Location
                                        </p>
                                        <h5 className="text-sm dark:text-gray-50">
                                            California, USA
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile