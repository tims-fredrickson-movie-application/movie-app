
    //TODO: Add loading animation(message) Remove after load

//TODO: Get all movies from Glitch DB


    fetch("https://lava-tranquil-chance.glitch.me/movies"
    ).then((response) =>
        response.json().then((favoriteMovie) => {
            console.log(favoriteMovie);}

    )).catch(err => console.error(err));



//TODO: Create a form for user to add favorite movie

//TODO: On submit post new movie to Glitch DB, w/ prevent default(stop page reload)

//TODO: Edit an existing movie with  different form

//TODO: Prepopulate form with selected movie w/ prevent default

//TODO: add "X" button to delete movie from favorites(Glitch DB) via a DELETE request

//TODO: use bootstrap disable button feature during request, once request comes back enable button

//TODO: Use modals or other cool bootstrap utilities to make forms look cool

//TODO: Add extra data to movie cards from Movie DB

//TODO: Allow sorting by rating, title, genre

//TODO: Allow user to search through movies by title, genre, or rating.

//TODO: Connect to TMDB API
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZTQ3NWZkMTdjMGIyMDQyOTdkODI1M2VhNzBmOTY0MCIsInN1YiI6IjVjNDdjY2JiYzNhMzY4NDc4OTg3Njk0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rVwEd19kyUs8rZsU3h_i-dZk2Xe-qe07Ge6tA0WGMuE'
        }
    };
    fetch("https://lava-tranquil-chance.glitch.me/movies"
    ).then((response) =>
        response.json().then((favoriteMovie) => {
            favoriteMovie.forEach(
                function (movie){
                   let title = movie.title
                    fetch(`https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`, options)
                        .then(movie => movie.json())
                        .then(movie => {
                            console.log(movie)
                            movie.results.forEach(function (item) {
                                if(item.poster_path !== null && item.vote_count > 1000 ) {
                                    console.log(item.title)
                                    let posterPath = item.poster_path
                                    let url = `https://image.tmdb.org/t/p/original${posterPath}`
                                    var img = $('<img />', {
                                        src: url,
                                        alt: 'Movie poster',
                                        class: 'movie-posters m-2'
                                    });
                                    img.appendTo($('#image-container'));

                                }

                            })
                        })
                        .catch(err => console.error(err));
                }
            )

        }

        )).catch(err => console.error(err));










