import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { db, storage } from "../utils/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const commonQuery = {
    getUsersByIds: async (memberIds) => {
        try {
            const userRef = collection(db, "users");
            // Create a query against the collection.
            const q = query(userRef, where('__name__', 'in', memberIds));
            const querySnapshot = await getDocs(q);
            const members = [];
            querySnapshot.forEach((doc) => {
                members.push({ id: doc.id, ...doc.data() });
            });

            return members;

        } catch (error) {
            // Rethrow the caught exception
            throw error;
        }
    },
    uploadImageAndGetUrl: async (filePath, file) => {
        // Upload image to Firebase Storage
        const storageRef = ref(storage, `${filePath}${file.name}`);
        await uploadBytes(storageRef, file);
        // Get the download URL of the image
        return await getDownloadURL(storageRef);
    },
    getRoom: async (roomId) => {
        try {
            const roomDocRef = doc(db, "rooms", roomId);
            const docSnap = await getDoc(roomDocRef);

            if (docSnap.exists()) {
                return {
                    id: roomId,
                    ...docSnap.data()
                }
            }
            return null;
        } catch (error) {
            // Rethrow the caught exception
            throw error;
        }
    },
    updateRoomInfo: async (roomId, data) => {
        try {
            const roomDocRef = doc(db, "rooms", roomId);
            // Add a new document with a generated id.
            await updateDoc(roomDocRef, data);

        } catch (error) {
            // Rethrow the caught exception
            throw error;
        }
    },
    
}

export default commonQuery;
