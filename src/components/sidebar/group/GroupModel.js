import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleGroupModal } from '../../../Redux/slice/manageSlice';
import { useFormik } from 'formik';
import * as yup from "yup";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../../utils/firebase';
import groupQuery from '../../../firbaseQuery/groupQuery';
import commonHelper from '../../../utils/commonHelper';

const animatedComponents = makeAnimated();

const schema = yup.object().shape({
    groupName: yup.string().min(3).required(),
    description: yup.string().min(20),
    selectUsers: yup.array().min(1, 'Select at least one user').required('user is required'),
});

const GroupModel = () => {
    const [users, setUsers] = useState(null);
    const [selectOptions, setSelectOptions] = useState(null);
    const dispatch = useDispatch();
    const setting = useSelector((state) => state.manage.setting);
    const closeGroupModel = () => {
        dispatch(toggleGroupModal(false));
    }

    useEffect(() => {
        const getAllUsers = async () => {
            const user = auth.currentUser;
            const uid = user?.uid;
            if (uid) {
                try {
                    const usersCollection = collection(db, 'users');
                    const q = query(usersCollection, where('__name__', '!=', uid)); // Filter out the current user
                    const querySnapshot = await getDocs(q);
                    const usersData = [];
                    const options = [];
                    querySnapshot.forEach((doc) => {
                        const userData = doc.data();
                        const userFullName = `${userData.firstName} ${userData.lastName}`;
                        const { profile } = userData;
                        const firstLetterFirstName = userData.firstName.charAt(0).toUpperCase();
                        const firstLetterLastName = userData.lastName.charAt(0).toUpperCase();
                        const option = {
                            value: doc.id,
                            label: !profile ? (
                                <div className="flex items-center space-x-4">
                                    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                        <span className="font-medium text-gray-600 dark:text-gray-300">{firstLetterFirstName}{firstLetterLastName}</span>
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
            groupName: "",
            selectedUsers: "",
            groupDescription: "",
            selectUsers: []
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            try {
                const user = auth.currentUser;
                const uid = user?.uid;
                let membersIds = values?.selectUsers?.map(item => item.value);
                membersIds = [...membersIds, uid];
                await groupQuery.createGroup(values, 'group', membersIds);
                closeGroupModel();
                commonHelper.showToats(true, "Successfully group created")
            } catch (error) {
                console.log(error);
                commonHelper.showToats(true, "Fail to create group")
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
                                    Create New Group
                                </h5>
                                {/* <button
                                    type="button"
                                    className="absolute top-3 ltr:right-2.5 rtl:left-2.5 text-gray-400 border-transparent hover:bg-gray-50/50/50 hover:text-gray-900 rounded-lg text-sm px-2 py-1 ml-auto inline-flex items-center dark:hover:bg-zinc-600 dark:text-gray-100"
                                    data-tw-dismiss="modal"
                                >
                                    <i className="text-xl text-gray-500 mdi mdi-close dark:text-zinc-100/60" />
                                </button> */}
                            </div>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="p-4">

                                    <div className="mb-8">
                                        <label className="block mb-2 ltr:text-left dark:text-gray-200 rtl:text-right">
                                            Group Name
                                        </label>
                                        <input
                                            type="text"
                                            className="py-1.5 border-gray-100 rounded placeholder:text-13 w-full focus:border-violet-500 focus:ring-0 focus:ring-offset-0 placeholder:dark:text-gray-200 dark:border-zinc-500"
                                            id="addgroupname-input"
                                            placeholder="Enter Group Name"
                                            name="groupName"
                                            onChange={formik.handleChange}
                                            value={formik.values.groupName}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.groupName && formik.errors.groupName && (
                                            <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                                {formik.errors.groupName}
                                            </span>
                                        )}
                                    </div>
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
                                    <div className="mb-5 ltr:text-left rtl:text-right">
                                        <label
                                            htmlFor="addgroupdescription-input"
                                            className="block mb-2 dark:text-gray-50"
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            className="w-full border-gray-100 rounded placeholder:text-13 focus:border-violet-500 focus:ring-0 focus:ring-offset-0 dark:border-zinc-500 dark:text-gray-200 dark:placeholder:text-gray-200"
                                            id="addgroupdescription-input"
                                            rows={3}
                                            name="description"
                                            placeholder="Enter Description"
                                            onChange={formik.handleChange}
                                            value={formik.values.description}
                                            onBlur={formik.handleBlur}
                                        />
                                         {formik.touched.description && formik.errors.description && (
                                            <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                                {formik.errors.description}
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
                                            Create Groups
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

export default GroupModel