import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { db } from "../utils/firebase";

const groupQuery = {
    createGroup: async (values, type, members) => {
        try {
            const roomsRef = collection(db, "rooms");
            // Add a new document with a generated id.
            await addDoc(roomsRef, {
                name: values.groupName || null,
                description: values.groupName || null,
                type,
                profile: null,
                members: members || null,
                createOn: serverTimestamp(),
                updateAt: serverTimestamp()
            });

        } catch (error) {
            // Rethrow the caught exception
            throw error;
        }
    },
    AddNewMember: async (roomId, memberIds) => {
        try {
            const roomDocRef = doc(db, "rooms", roomId);
            // Add a new document with a generated id.
            await updateDoc(roomDocRef, {
                members: [...memberIds]
            });

        } catch (error) {
            // Rethrow the caught exception
            throw error;
        }
    },
    getUsersByIds: async(memberIds) => {
        try {
            const userRef = collection(db, "users");
            // Create a query against the collection.
            const q = query(userRef, where('__name__', 'in', memberIds));
            const querySnapshot = await getDocs(q);
            const members = [];
            querySnapshot.forEach((doc) => {
                members.push({ id: doc.id, ...doc.data()});
            });

            return members;

        } catch (error) {
            // Rethrow the caught exception
            throw error;
        }
    },
    updateRoomInfo: async(roomId, data )=>{
        try {
            console.log(data,roomId);
            const roomDocRef = doc(db, "rooms", roomId);
            // Add a new document with a generated id.
            await updateDoc(roomDocRef, data);

        } catch (error) {
            // Rethrow the caught exception
            throw error;
        }
    }
}

export default groupQuery;