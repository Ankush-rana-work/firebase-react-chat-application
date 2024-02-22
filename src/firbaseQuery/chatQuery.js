import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import commonQuery from "./commonQuery";

const chatQuery = {
    sendMessage: async (auth, roomId, message) => {
        try {
            const user = auth.currentUser;
            const uid = user?.uid;
            // Reference to the parent document
            const roomDocRef = doc(db, 'rooms', roomId);
            // Reference to the subcollection
            const messageCollectionRef = collection(roomDocRef, 'messages');
            // Data for the new document
            const messageData = {
                message: message,
                sendBy: uid,
                type: 'text',
                created_at: serverTimestamp(),
                updated_at: null
            };

            await addDoc(messageCollectionRef, messageData);
        } catch (error) {
            console.log(error);
        }
    },
    arrangingUserTypingArry: (userTyping, uid, status) => {
        let newUserTyping = userTyping || [];
        // Find the object with the specified ID
        let foundObject = newUserTyping?.find(item => item.id === uid);

        // If the object doesn't exist, create a new one and add it to the array
        if (!foundObject) {
            let newObject = { id: uid, status };
            newUserTyping.push(newObject);
        } else {
            // If the object exists, update its name
            foundObject.status = status
        }

        return newUserTyping;
    },
    changeUserTypingStaus: async (roomId, uid, status) => {
        const roomInfo = await commonQuery.getRoom(roomId);
        let userTypingObj = roomInfo.userTypingStatus;
        userTypingObj = chatQuery.arrangingUserTypingArry(userTypingObj, uid, status);
        await commonQuery.updateRoomInfo(roomId, { userTypingStatus: userTypingObj });
    },
    getTypingUser: (userTypingObj, uid) => {
        if (userTypingObj) {
            const otherUserTypingObj = userTypingObj.filter((item) => (item.id != uid && item.status === true));
            // Extract all the names from the array
            const typingUsers = otherUserTypingObj.map(item => item.id);
            // Join the names into a comma-separated string
            return typingUsers.join(', ');

        }
        return '';
    }
}

export default chatQuery