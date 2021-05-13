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

getAllUsers().then(() => { console.log(allUsers) });

//=====================================================================