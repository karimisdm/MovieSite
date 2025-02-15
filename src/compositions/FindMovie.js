const searchMovie = async (id) => {
    const response = await fetch(`https://moviesapi.codingfront.dev/api/v1/movies/${id}`);
    if (response.ok) {
        const result = await response.json();
        information.value = result;
    } else {
        return;
    }
};
