const tmdbKey = "21e97a8fc51cf37acd7a39261f6f8853";
const tmdbBaseUrl = "https://api.themoviedb.org/3/";

// hide like/dislike buttons unless movie is loaded
document.getElementById("feedback").style.visibility = "hidden";
// hide the liked/disliked list while we're at it
document.getElementById("outputz").style.visibility = "hidden";

const getGenres = async () => {
  const urlToFetch = tmdbBaseUrl + "genre/movie/list?api_key=" + tmdbKey;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
        const jsonResponse = await response.json();
        const genres = jsonResponse.genres;
        return genres;
    }
  } catch(error) {
    console.log(error);
  }
};

const populateGenreDropdown = (genres) => {
    const select = document.getElementById("genres");

    for (const genre of genres) {
        let option = document.createElement("option");
        option.value = genre.id;
        option.text = genre.name;
        select.appendChild(option);
    }
};

const loadMovies = async () => {
    const selectedGenre = document.getElementById("genres").value;

    // clear old movie posters/text if they exist
    document.getElementById("moviePoster").innerHTML = "";
    document.getElementById("movieTitle").innerHTML = "";
    document.getElementById("movieOverview").innerHTML = "";

    // could fetch the total number of pages and then use that as an upper limit, but this is good enough and avoids a second API call
    const randomPage = Math.floor(Math.random() * 100) + 1; // +1 because page cannot be 0
    const urlToFetch = tmdbBaseUrl + "discover/movie?api_key=" + tmdbKey + "&with_genres=" + selectedGenre + "&page=" + randomPage;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            const randomMovie = jsonResponse.results[Math.floor(Math.random() * 20)];

            const moviePosterUrl = `https://image.tmdb.org/t/p/original/${randomMovie.poster_path}`;
            const posterImg = document.createElement("img");
            posterImg.setAttribute("src", moviePosterUrl);
            posterImg.setAttribute("id", "moviePoster");
            posterImg.setAttribute("alt", randomMovie.title);
            document.getElementById("moviePoster").appendChild(posterImg);

            const movieTitleText = document.createElement("h1");
            movieTitleText.innerHTML = randomMovie.title;
            movieTitleText.setAttribute("id", "curMovieTitle");
            document.getElementById("movieTitle").appendChild(movieTitleText);

            const movieOverview = document.createElement("p");
            movieOverview.innerHTML = randomMovie.overview;
            document.getElementById("movieOverview").appendChild(movieOverview);

            // show like/dislike now that a movie has loaded
            document.getElementById("feedback").style.visibility = "visible";
        }
    } catch(error) {
        console.log(error);
    }
};

const deleteItem = (e) => {
    document.getElementById(e.target.value).remove();
}

const feedbackFunc = (e) => {
    let listName = "likedList"
    if (e.target.id === "dislikeButton") listName = "dislikedList";
    const listItem = document.createElement("li");
    listItem.innerHTML = document.getElementById("curMovieTitle").innerHTML;
    listItem.setAttribute("id", listItem.innerHTML);
    document.getElementById(listName).appendChild(listItem);
    document.getElementById("outputz").style.visibility = "visible";
    const xBox = document.createElement("button");
    xBox.innerHTML = "X";
    xBox.setAttribute("type", "button");
    xBox.style.float = "right";
    xBox.value = listItem.innerHTML;
    xBox.addEventListener("click", deleteItem);
    listItem.appendChild(xBox);
    loadMovies();
}

getGenres().then(populateGenreDropdown);
document.getElementById("playButton").addEventListener("click", loadMovies);
document.getElementById("likeButton").addEventListener("click", (e) => feedbackFunc(e));
document.getElementById("dislikeButton").addEventListener("click", (e) => feedbackFunc(e));
