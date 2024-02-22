import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectedRoom, toggleAddMemberGroupModal, toggleGroupModal } from '../../../Redux/slice/manageSlice';
import { useFormik } from 'formik';
import * as yup from "yup";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../../utils/firebase';
import groupQuery from '../../../firbaseQuery/groupQuery';
import commonHelper from '../../../utils/commonHelper';
import commonQuery from '../../../firbaseQuery/commonQuery';

const animatedComponents = makeAnimated();

const schema = yup.object().shape({
    selectUsers: yup.array().min(1, 'Select at least one user').required('user is required'),
});

const AddGroupMemberModel = () => {
    const [users, setUsers] = useState(null);
    const [selectOptions, setSelectOptions] = useState(null);
    const dispatch = useDispatch();
    const setting = useSelector((state) => state.manage.setting);

    const closeGroupModel = () => {
        dispatch(toggleAddMemberGroupModal(false));
    }

    useEffect(() => {
        const getAllUsers = async () => {
            const user = auth.currentUser;
            const uid = user?.uid;
            if (uid) {
                try {
                    const exisingMembers = setting?.room?.members;
                    const usersCollection = collection(db, 'users');
                    const q = query(usersCollection,
                        where('__name__', 'not-in', [...exisingMembers, uid])
                    ); // Filter out the current user
                    const querySnapshot = await getDocs(q);
                    const usersData = [];
                    const options = [];
                    querySnapshot.forEach((doc) => {
                        const userData = doc.data();
                        const userFullName = `${userData.firstName} ${userData.lastName}`;
                        const { profile } = userData;
                        const firstLetterFirstName = userData.firstName.charAt(0).toUpperCase();
                        const option = {
                            value: doc.id,
                            label: !profile ? (
                                <div className="flex items-center space-x-4">
                                    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-orange-600 rounded-full dark:bg-gray-600">
                                        <span className="font-medium text-white dark:text-gray-300">{firstLetterFirstName}</span>
                                    </div>
                                    <div className="font-medium dark:text-white">
                                        <div>{userFullName}</div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <img className="w-10 h-10 rounded-full" src={userData.profile} alt="" />
                                    <div className="font-medium dark:text-white">
                                        <div>{userFullName}</div>
                                    </div>
                                </div>
                            ),
                        };
                        usersData.push({ id: doc.id, ...userData });
                        options.push(option);
                    });
                    setUsers(usersData);
                    setSelectOptions(options);
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            }
        };

        getAllUsers();
    }, []);

    const formik = useFormik({
        initialValues: {
            selectUsers: []
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            try {
                const roomId = setting?.room?.id;
                const exisingMembers = setting?.room?.members;
                let membersIds = values?.selectUsers?.map(item => item.value);
                await groupQuery.AddNewMember(roomId, [...exisingMembers, ...membersIds]);
                const updatedRoom = await commonQuery.getRoom(roomId);
                dispatch(selectedRoom(updatedRoom));
                closeGroupModel();
                commonHelper.showToats(true, "Successfully Mmeber added")
            } catch (error) {
                commonHelper.showToats(true, "Fail to Add member")
            }
        }
    });

    return (
        <div className="relative z-50 modal">
            <div className="fixed inset-0 z-50 overflow-hidden">
                <div className="absolute inset-0 transition-opacity bg-black bg-opacity-50 modal-overlay" />
                <div className="flex items-center justify-center max-w-lg min-h-screen p-4 mx-auto text-center animate-translate">
                    <div className="relative w-full max-w-lg my-8 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl -top-10 dark:bg-zinc-700">
                        <div className="group-data-[theme-color=violet]:bg-violet-800/10 group-data-[theme-color=green]:bg-green-800/10 group-data-[theme-color=red]:bg-red-800/10 group-data-[theme-color=violet]:dark:bg-zinc-700 group-data-[theme-color=red]:dark:bg-zinc-700 group-data-[theme-color=green]:dark:bg-zinc-700">
                            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-zinc-500">
                                <h5
                                    className="mb-0 text-gray-800 text-16 dark:text-gray-50"
                                    id="addgroup-exampleModalLabel"
                                >
                                    Add New Member
                                </h5>
                            </div>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="p-4">
                                    <div className="mb-5 ltr:text-left rtl:text-right">
                                        <label className="dark:text-gray-300 ">
                                            Group Members
                                        </label>
                                        <div className="mt-2 mb-3">
                                        </div>
                                    </div>
                                    <div className="mb-5 ltr:text-left rtl:text-right">
                                        {selectOptions && (
                                            <Select
                                                menuPortalTarget={document.body}
                                                styles={{
                                                    menuPortal: base => ({ ...base, zIndex: 9999 })
                                                }}
                                                closeMenuOnSelect={false}
                                                components={animatedComponents}
                                                options={selectOptions}
                                                name="selectUsers"
                                                value={formik.values.selectUsers}
                                                onBlur={formik.handleBlur}
                                                isMulti
                                                onChange={(selectedOptions) => {
                                                    formik.setFieldValue('selectUsers', selectedOptions);
                                                }}
                                            />
                                        )}
                                        {formik.touched.selectUsers && formik.errors.selectUsers && (
                                            <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                                {formik.errors.selectUsers}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex p-4 border-t border-gray-100 ltr:justify-end dark:border-zinc-500 rtl:justify-start">
                                    <div>
                                        <button
                                            type="button"
                                            className="border-0 btn hover:underline group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500"
                                            onClick={closeGroupModel}
                                        >
                                            Close
                                        </button>
                                        <button
                                            type="submit"
                                            className="text-white border-transparent btn group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=violet]:hover:bg-violet-600 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=green]:hover:bg-green-600 group-data-[theme-color=red]:bg-red-500 group-data-[theme-color=red]:hover:bg-red-600"
                                        >
                                            Add Member
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AddGroupMemberModel