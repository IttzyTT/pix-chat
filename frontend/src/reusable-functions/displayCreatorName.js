// use similarly like this:
// displayCreatorName(post, globalStore.allUsers)

// see Postcard.jsx-component for an example

function displayCreatorName({ createdById }, allUsers) {
    for (let user of allUsers) {
        if (user['_id'] === createdById) {
            return user.name;
        }
    }
}

export default displayCreatorName;