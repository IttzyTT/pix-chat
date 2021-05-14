console.log('test js-file initialized');

//=====================================================================
// get all users

let allUsers;

const getAllUsers = async () => {
    try {
        const response = await fetch('http://localhost:4000/users');
        allUsers = await response.json();
    } catch (error) {
        console.log(error);
    }
};



// get all messages

let allPostMessages;

const allPostMessages = async () => {
    try {
        const response = await fetch('http://localhost:4000/postMessages');
        allPostMessages = await response.json();
    } catch (error) {
        console.log(error);
    }
};

getallPostMessages().then(() => { console.log(allPostMessages) });

//=====================================================================