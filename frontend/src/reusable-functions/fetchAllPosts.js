const fetchAllPosts = async (apiUrl) => {
    let response = await fetch(`${apiUrl}/posts`);
    let data = await response.json();
    return data;
}

export default fetchAllPosts;