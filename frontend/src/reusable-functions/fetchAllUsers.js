async function fetchAllUsers(apiUrl) {
    let response = await fetch(`${apiUrl}/users`);
    let data = await response.json();
    return data;
}

export default fetchAllUsers;