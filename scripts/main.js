//TODO: Add loading animation(message) Remove after load

//TODO: Get all movies from Glitch DB

let getFavorites = () => {
  fetch("https://lava-tranquil-chance.glitch.me/movies")
    .then((response) =>
      response.json().then((favoriteMovies) => {
        console.log(favoriteMovies);
      })
    )
    .catch((err) => console.error(err));
};

//TODO: Create a form for user to add favorite movie
const searchOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZTQ3NWZkMTdjMGIyMDQyOTdkODI1M2VhNzBmOTY0MCIsInN1YiI6IjVjNDdjY2JiYzNhMzY4NDc4OTg3Njk0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rVwEd19kyUs8rZsU3h_i-dZk2Xe-qe07Ge6tA0WGMuE",
  },
};

// $("#movie-title-input").on("keyup", function () {
//   let typedWord = document.getElementById("movie-title-input").value;
//   fetch(
//     `https://api.themoviedb.org/3/search/movie?query=${typedWord}&include_adult=false&language=en-US&page=1`,
//     searchOptions
//   )
//     .then((movie) => movie.json())
//     .then((movie) => {
//       console.log(typedWord);
//       movie.results.forEach(function (item) {
//         if (
//           item.title === typedWord &&
//           item.poster_path !== null &&
//           item.vote_count > 1000
//         ) {
//           console.log(item.title);
//         }
//       });
//     })
//     .catch((err) => console.error(err));
//
//   // if (movie.title.includes(typedWord)) {
//   // console.log(movie.resuts.title);
//   // let posterPath = movie.poster_path;
//   // let url = `https://image.tmdb.org/t/p/original${posterPath}`;
//   // let img = $("<img />", {
//   //   src: url,
//   //   alt: "Movie poster",
//   //   class: "movie-posters m-3",
//   // });
//   // $("#search-results-list").append(
//   //   `<li class="movie-list-item">${img}</li>`
//   // );
//   // } else {
//   //   console.log(movie.title);
//   // }
// });

$("#add-movie-button").on("click", function (event) {
  event.preventDefault();
  const movie = {
    title: document.getElementById("movie-title-input").value,
  };
  console.log("Button Works");
  console.log(movie.title);
  let movieTitle = movie.title.toLowerCase();
  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${movieTitle}&include_adult=false&language=en-US&page=1`,
    options
  )
    .then((movie) => movie.json())
    .then((movie) => {
      $("#search-results-container").empty()
      movie.results.forEach(function (item, index) {
        let dBTitle = item.title.toLowerCase();
        console.log(item.title);
        if (
          // movieTitle === dBTitle &&
          item.poster_path !== null &&
          item.vote_count > 1000
        ) {
          console.log(item.title);
          console.log(index);
          let posterPath = item.poster_path;
          let url = `https://image.tmdb.org/t/p/original${posterPath}`;
          let img = $("<img/>", {
            src: url,
            alt: "Movie poster",
            class: "side-movie-posters card-img-top w-100",
          });

          $("#search-results-container").append(`
            <div class="card sideCard bg-dark border-light m-3">
              <img src="https://image.tmdb.org/t/p/original${posterPath}" alt="">
              <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <p class="card-text">${item.release_date}</p>
                <button class="btn btn-primary w-100" id="${index}">Add to favorites</button>
              </div>
            </div>`);
          $(`#${index}`).on('click', function(){
            console.log(item.title)
          })
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
        favoriteMovie.forEach(function (movie) {
          let title = movie.title.toLowerCase();
          fetch(
            `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`,
            options
          )
            .then((movie) => movie.json())
            .then((movie) => {
              movie.results.forEach(function (item) {
                let dBTitle = item.title.toLowerCase();
                if (
                  title === dBTitle &&
                  item.poster_path !== null &&
                  item.vote_count > 1000
                ) {
                  console.log(item);
                  let posterPath = item.poster_path;
                  let url = `https://image.tmdb.org/t/p/original${posterPath}`;
                  let img = $("<img />", {
                    src: url,
                    alt: "Movie poster",
                    class: "movie-posters m-3",
                  });
                  img.appendTo("#image-container");
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
