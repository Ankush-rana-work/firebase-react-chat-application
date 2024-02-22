import { collection, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

const authQuery = {
    saveUser: async (uid, values) => {
        const usersRef = collection(db, "users");
        try {
            await setDoc(doc(usersRef, uid), {
                firstName: values?.firstName,
                lastName: values?.lastName,
                email: values?.email,
                profile: values.photoUrl||null,
                time: serverTimestamp(),
                status: "online"
            });
        } catch (error) {
            console.log(error);
        }
    },
    updateUser: async(userId, data)=>{
        try {
            console.log(userId, data);
            const userDocRef = doc(db, "users", userId);
            // Add a new document with a generated id.
            await updateDoc(userDocRef, data);

        } catch (error) {
            // Rethrow the caught exception
            throw error;
        }
    }
}

export default authQuery