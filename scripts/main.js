//TODO: Add loading animation(message) Remove after load

//TODO: Get all movies from Glitch DB

//TODO: Create a form for user to add favorite movie

$("#add-movie-button").on("click", function (event) {
  event.preventDefault();
  const movie = {
    title: document.getElementById("movie-title-input").value,
  };
  let movieTitle = movie.title.toLowerCase();
  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${movieTitle}&include_adult=false&language=en-US&page=1`,
    options
  )
    .then((movie) => movie.json())
    .then((movie) => {
      $("#search-results-container").empty();
      movie.results.forEach(function (item, index) {
        let dBTitle = item.title.toLowerCase();

        if (
          // movieTitle === dBTitle &&
          item.poster_path !== null &&
          item.vote_count > 1000
        ) {
          let posterPath = item.poster_path;
          let url = `https://image.tmdb.org/t/p/original${posterPath}`;
          let img = $("<img/>", {
            src: url,
            alt: "Movie poster",
            class: "side-movie-posters card-img-top w-100",
          });

          $("#search-results-container").append(`
            <div class="card sideCard bg-dark border-light m-3 text-center">
              <img src="https://image.tmdb.org/t/p/original${posterPath}" alt="">
              <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <p class="card-text">Release Date: ${item.release_date}</p>
                <select class="form-select m-1" aria-label="Default select example" id="stars-${index}">
                <option selected>Rate this Movie</option>
                <option value="1">⭐️</option>
                <option value="2">⭐️⭐️</option>
                <option value="3">⭐️⭐️⭐️</option>
                <option value="4">⭐️⭐️⭐️⭐️</option>
                <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
                </select>

                <button class="btn w-100 m-1" id="${index}">Add to favorites</button>
               
              </div>
            </div>`);
          console.log(index);
          $(`#${index}`).on("click", function () {
            let movieStars = $(`#stars-${index}`).find(":selected").val();
            // console.log(movieStars);

            const movie = {
              title: item.title,
              rating: parseInt(movieStars),
            };
            const url = "https://lava-tranquil-chance.glitch.me/movies";
            const addMovieOptions = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(movie),
            };
            fetch(url, addMovieOptions)
              .then((movie) => movie.json())
              .then((movie) => {
                $("#image-container").empty();
                renderMovieData();
                console.log(`${movie.title} has been added to Glitch`);
              }) /* review was created successfully */
              .catch((error) => console.error(error)); /* handle errors */
          });
          // img.appendTo("#sideCard-img")
        }
      });
    })
    .catch((err) => console.error(err));
});

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
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZTQ3NWZkMTdjMGIyMDQyOTdkODI1M2VhNzBmOTY0MCIsInN1YiI6IjVjNDdjY2JiYzNhMzY4NDc4OTg3Njk0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rVwEd19kyUs8rZsU3h_i-dZk2Xe-qe07Ge6tA0WGMuE",
  },
};

let renderMovieData = () => {
  fetch("https://lava-tranquil-chance.glitch.me/movies")
    .then((response) =>
      response.json().then((favoriteMovie) => {
        favoriteMovie.forEach(function (movie, index) {
          let title = movie.title;
          let dbID = movie.id;
          fetch(
            `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`,
            options
          )
            .then((movie) => movie.json())
            .then((movie) => {
              movie.results.forEach(function (item) {
                let dBTitle = item.title;

                if (
                  title === dBTitle &&
                  item.poster_path !== null &&
                  item.vote_count > 1000
                ) {
                  console.log(title);
                  // console.log(`${favoriteMovie.id}: ${item.title}:${index}`);
                  let posterPath = item.poster_path;
                  let bannerPath = item.backdrop_path;
                  let url = `https://image.tmdb.org/t/p/original${posterPath}`;
                  let img = $("<img/>", {
                    src: url,
                    alt: "Movie poster",
                    class: "side-movie-posters card-img-top w-100",
                  });

                  $("#image-container").append(`<!-- Button trigger modal -->
               <img src="https://image.tmdb.org/t/p/original${posterPath}" class="m-2 btn poster-modal" data-bs-toggle="modal" data-bs-target="#movieDetails-${index}" id="modal-${index}" >

            <!-- Modal -->
            <div class="modal fade" id="movieDetails-${index}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">${item.title}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <img src="https://image.tmdb.org/t/p/original${bannerPath}" alt="" class="w-100">
                    <h6>Release Date: ${item.release_date}</h6>
                    
                    <h3>Movie Overview:</h3>
                    <p>${item.overview}</p>
                  </div>
                  <div class="modal-footer d-flex justify-content-center">
                    <button type="button" class="btn justify-start mx-3" data-bs-dismiss="modal">Close</button>
                    <button type="button" id="delete-${dbID}" class="btn mx-3" data-bs-dismiss="modal">Delete Movie</button>
                  </div>
                </div>
              </div>
            </div>`);
                  $(`#delete-${dbID}`).on("click", function () {
                    fetch(
                      `https://lava-tranquil-chance.glitch.me/movies/${dbID}`,
                      {
                        method: "DELETE",
                      }
                    )
                      .then((movie) => movie.json())
                      .then((movie) => {
                        $("#image-container").empty();
                        console.log(
                          `${movie.title} has been removed from Glitch`
                        );
                      })
                      .then(() => {
                        renderMovieData();
                        return;
                      }) /* review was deleted successfully */
                      .catch((error) => console.error(error))

                      .catch((err) => console.error(err));
                  });
                }
              });
            })
            .catch((err) => console.error(err));
        });
      })
    )
    .catch((err) => console.error(err));
};

renderMovieData();
