import { toast } from "react-toastify";

const commonHelper = {
    showToats: (status, message) => {
        if (status) {
            toast.success(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            toast.error(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    },
    convertToTime: (serverTime) => {
        if (serverTime?.seconds) {
            const date = new Date(serverTime?.seconds * 1000);
            return date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            })
        }
    },
    userAlphabeticallyListing: (users) => {
        console.log(users);
        const userAlphabetically = []
        if (users) {

            for (const user of users) {
                const firstName = user.firstName;
                const firstLetter = firstName.charAt(0);
                const alphabetobj = userAlphabetically.find(user => user.alphabet === firstLetter);
                if (!alphabetobj) {
                    userAlphabetically.push({ alphabet: firstLetter, user: [user] });
                } else {
                    const indexToUpdate = userAlphabetically.findIndex(user => user.alphabet === firstLetter);
                    const exisitingUser = userAlphabetically[indexToUpdate].user;
                    userAlphabetically[indexToUpdate].user = [...exisitingUser, user];
                }
            }

            userAlphabetically.sort((a, b) => {
                if (a.alphabet < b.alphabet) {
                    return -1;
                }
                if (a.alphabet > b.alphabet) {
                    return 1;
                }
                return 0;
            });

        }


        return userAlphabetically;
    },
    capitalizeFirstLetter: (string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    defaultProfileImage: (selectedImage, profile) => {
        if( selectedImage ){
            return selectedImage;
        }else if(profile?.profile){
            return profile?.profile;
        }else if(profile?.firstName ){
            return `https://ui-avatars.com/api/?name=${profile?.firstName?.charAt(0).toUpperCase()}`;
        }else{
            return `https://ui-avatars.com/api`;
        }
        
    }
}
export default commonHelper;