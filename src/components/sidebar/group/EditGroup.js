import { useFormik } from 'formik';
import React from 'react'
import * as yup from "yup";
import groupQuery from '../../../firbaseQuery/groupQuery';
import commonHelper from '../../../utils/commonHelper';

const schema = yup.object().shape({
    groupName: yup.string().min(3).required(),
    description: yup.string().min(20)
});

const EditGroup = (props) => {

    const formik = useFormik({
        initialValues: {
            groupName: props?.room?.name,
            description: props?.room?.description
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            try {
                const roomId = props?.room?.roomId;
                const payload = {
                    name: values?.groupName,
                    description: values.description
                }

                await groupQuery.updateRoomInfo(roomId, payload);
                commonHelper.showToats(true, "Successfully room updated")
            } catch (error) {
                commonHelper.showToats(true, "Fail to update room")
            }
        }
    });

    return (
        <div className="p-4 h-100">
            <form onSubmit={formik.handleSubmit}>
                <div className="p-4">

                    <div className="mb-8">
                        <label className="block mb-2 ltr:text-left dark:text-gray-200 rtl:text-right">
                            Group Name
                        </label>
                        <input
                            type="text"
                            className="py-1.5 border-gray-100 rounded placeholder:text-13 w-full focus:border-violet-500 focus:ring-0 focus:ring-offset-0 placeholder:dark:text-gray-200 dark:border-zinc-500"
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
                        <label
                            htmlFor="addgroupdescription-input"
                            className="block mb-2 dark:text-gray-50"
                        >
                            Description
                        </label>
                        <textarea
                            className="w-full border-gray-100 rounded placeholder:text-13 focus:border-violet-500 focus:ring-0 focus:ring-offset-0 dark:border-zinc-500 dark:text-gray-200 dark:placeholder:text-gray-200"
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
                            type="submit"
                            className="text-white border-transparent btn group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=violet]:hover:bg-violet-600 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=green]:hover:bg-green-600 group-data-[theme-color=red]:bg-red-500 group-data-[theme-color=red]:hover:bg-red-600"
                        >
                            Edit Groups
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditGroup