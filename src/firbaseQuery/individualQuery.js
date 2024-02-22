import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { db } from "../utils/firebase";

const individualQuery = {
    checkOneToOneRoomExist: async (selectedUserId, currentUserId) => {
        try {
            console.log(currentUserId);
            const q = query(
                collection(db, "rooms"),
                where("members", 'array-contains', currentUserId),
                where('type', '==', 'individual')
            );
            const querySnapshot = await getDocs(q);
            const newData = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (data.members.includes(selectedUserId)) {
                    newData.push({ id: doc.id, ...doc.data() });
                  }
            });
            return newData[0] || null

        } catch (error) {
            // Rethrow the caught exception
            throw error;
        }
    },
    createIndividualRoom: async (values, type, members) => {
        try {
            const roomsRef = collection(db, "rooms");
            // Add a new document with a generated id.
            const doc = await addDoc(roomsRef, {
                name: values.groupName || null,
                description: values.groupName || null,
                type,
                profile: null,
                members: members || null,
                createOn: serverTimestamp(),
                updateAt: serverTimestamp(),
                isActive: false
            });

            return doc.id;
        } catch (error) {
            // Rethrow the caught exception
            throw error;
        }
    },
}

export default individualQuery;