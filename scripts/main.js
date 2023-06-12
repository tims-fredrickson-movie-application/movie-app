const renderSearchCards =
  // -----------------------------Add Movie Function----------------------
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
          if (
            // movieTitle === dBTitle &&
            item.poster_path !== null &&
            item.vote_count > 1000
          ) {
            let posterPath = item.poster_path;
            let url = `https://image.tmdb.org/t/p/original${posterPath}`;

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

            $(`#${index}`).on("click", function () {
              let movieStars = $(`#stars-${index}`).find(":selected").val();

              // console.log(movieStars);

              const movie = {
                title: item.title,
                rating: parseInt(movieStars),
                TMDBID: item.id,
                movieOverview: item.overview,
                movieGenres: item.genre_ids,
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
                }) /* review was created successfully */
                .catch((error) => console.error(error)); /* handle errors */
            });
          }
        });
      })
      .catch((err) => console.error(err));
  });

// --------------------------Render Movies from Glitch DB w/ TMDB Data-----------
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZTQ3NWZkMTdjMGIyMDQyOTdkODI1M2VhNzBmOTY0MCIsInN1YiI6IjVjNDdjY2JiYzNhMzY4NDc4OTg3Njk0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rVwEd19kyUs8rZsU3h_i-dZk2Xe-qe07Ge6tA0WGMuE`,
  },
};

let renderMovieData = () => {
  fetch("https://lava-tranquil-chance.glitch.me/movies")
    .then((response) =>
      response.json().then((favoriteMovie) => {
        const loader = document.querySelector(".loader");
        const loadingMessage = document.querySelector("#loading-message");
        loadingMessage.classList.add("loader-hidden");
        loader.classList.add("loader-hidden");

        favoriteMovie.forEach(function (movie, index) {
          let title = movie.title;
          let dbID = movie.id;
          let rating = movie.rating;
          let tmdbID = movie.TMDBID;
          let movieGenres = movie.movieGenres;

          let stars = "";
          if (rating === 1) {
            stars = "⭐️";
          } else if (rating === 2) {
            stars = "⭐️⭐️";
          } else if (rating === 3) {
            stars = "⭐️⭐️⭐️";
          } else if (rating === 4) {
            stars = "⭐️⭐️⭐️⭐️";
          } else if (rating === 5) {
            stars = "⭐️⭐️⭐️⭐️⭐️";
          } else {
            stars = "Oops I forgot to rate the movie.";
          }
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
                  let posterPath = item.poster_path;
                  let bannerPath = item.backdrop_path;
                  let tmdbGenres = [
                    {
                      id: 28,
                      name: "Action",
                    },
                    {
                      id: 12,
                      name: "Adventure",
                    },
                    {
                      id: 16,
                      name: "Animation",
                    },
                    {
                      id: 35,
                      name: "Comedy",
                    },
                    {
                      id: 80,
                      name: "Crime",
                    },
                    {
                      id: 99,
                      name: "Documentary",
                    },
                    {
                      id: 18,
                      name: "Drama",
                    },
                    {
                      id: 10751,
                      name: "Family",
                    },
                    {
                      id: 14,
                      name: "Fantasy",
                    },
                    {
                      id: 36,
                      name: "History",
                    },
                    {
                      id: 27,
                      name: "Horror",
                    },
                    {
                      id: 10402,
                      name: "Music",
                    },
                    {
                      id: 9648,
                      name: "Mystery",
                    },
                    {
                      id: 10749,
                      name: "Romance",
                    },
                    {
                      id: 878,
                      name: "Science Fiction",
                    },
                    {
                      id: 10770,
                      name: "TV Movie",
                    },
                    {
                      id: 53,
                      name: "Thriller",
                    },
                    {
                      id: 10752,
                      name: "War",
                    },
                    {
                      id: 37,
                      name: "Western",
                    },
                  ];
                  let formatDate = item.release_date;

                  let updatedGenres = [];
                  movieGenres.forEach((glitchMovie) => {
                    tmdbGenres.forEach((tmdbMovie) => {
                      if (tmdbMovie.id === glitchMovie) {
                        updatedGenres.push(tmdbMovie.name);
                      }
                    });
                  });

                  let genre = updatedGenres.join(" ");
                  $("#image-container").append(
                    `<!-- Button trigger modal -->
               <img src="https://image.tmdb.org/t/p/original${posterPath}" class="m-2 btn poster-modal" data-bs-toggle="modal" data-bs-target="#movieDetails-${index}" id="modal-${index}" >

            <!-- Modal -->
            <div class="modal fade" id="movieDetails-${index}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title display-6 " id="exampleModalLabel">${item.title}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <img src="https://image.tmdb.org/t/p/original${bannerPath}" alt="" class="w-100 my-2">
                    <p class="my-2">Category: ${genre}</p>
                    <h6 class="my-2">Release Date: ${formatDate}</h6>
                    
                    <h3 class="my-2">Movie Overview:</h3>
                    <p>${item.overview}</p>
                    <h3 class="my-2">My Rating: <h4>${stars}</h4></h3>
                    
                      <iframe id="trailer-player-${dbID}" class="w-100 my-2" height="315"  title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                  </div>
                  
                  <div id="delete-confirm-${dbID}" class="delete-confirm text-center"><button  id="delete-button-${dbID}" class="text-center delete-confirm-button btn my-2" data-bs-dismiss="modal">Confirm Delete</button></div>
                  <div>
                  
                  
                  <form action="" id="edit-form-${dbID}" class="edit-form text-center p-2 ">
                  <div class="input-group mb-3">
                    <input type="text" class="form-control" id="new-title-${dbID}" placeholder="${item.title}" aria-label="Movie Title" aria-describedby="basic-addon2">
                    <span class="input-group-text" id="basic-addon2">Movie Title</span>
                  </div>
                  <div class="input-group mb-3">
                     <input type="text" id="new-movie-${dbID}" class="form-control" placeholder="Number of Stars" aria-label="Movie Rating" aria-describedby="basic-addon2">
                     <span class="input-group-text" id="basic-addon2">Movie Rating</span>
                   </div>
                   <div class="input-group mb-3">
                    <input type="text" class="form-control" id="new-genre-${dbID}" placeholder="${genre}" aria-label="Movie Genre" aria-describedby="basic-addon2">
                    <span class="input-group-text" id="basic-addon2">Genre</span>
                   </div>
                   <div class="input-group mb-3">
                    <textarea type="text" id="new-overview-${dbID}" class="form-control" placeholder="${item.overview}" aria-label="Recipient's username" aria-describedby="basic-addon2"></textarea>
                    <span class="input-group-text" id="basic-addon2">Movie Description</span>
                   </div>



                  <button class="btn my-2" id="updateTitle-${dbID}" data-bs-dismiss="modal" data-bs-dismiss="modal">Update Movie</button>
                  </form>
                
                  </div>
                  <div class="modal-footer d-flex justify-content-center m-2">
                    <button  type="button" class="btn justify-start mx-3" id="edit-button-${dbID}" >Edit Movie</button>
                    
                    <button type="button" id="delete-${dbID}" class="btn mx-3" >Delete Movie</button>
                  </div>
                </div>
              </div>
            </div>`
                  );
                  fetch(
                    `https://api.themoviedb.org/3/movie/${tmdbID}/videos?language=en-US`,
                    options
                  )
                    .then((movie) => movie.json())
                    .then((movie) => {
                      movie.results.forEach((item) => {
                        if (
                          item.site === "YouTube" &&
                          item.type === "Trailer"
                        ) {
                          let trailerSrc = `https://www.youtube-nocookie.com/embed/${item.key}`;
                          $(`#trailer-player-${dbID}`).attr(
                            "src",
                            `${trailerSrc}`
                          );
                        }
                      });
                    })
                    .catch((err) => console.error(err));

                  // ;

                  // -----------------------Delete Movie Function-----------------

                  $(`#delete-${dbID}`).on("click", function (event) {
                    event.preventDefault();
                    $(`#delete-confirm-${dbID}`).toggle();
                    $(`#delete-button-${dbID}`).on("click", (event) => {
                      event.preventDefault();
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
                        }) /* review was deleted successfully */
                        .catch((error) => console.error(error))

                        .catch((err) => console.error(err));
                    });
                  });
                }
              });
            })
            // --------------------------Edit Movie Function-------------------
            .then(() => {
              $(`#edit-button-${dbID}`).on("click", (event) => {
                event.preventDefault();
                console.log("edit button clicked");
                $(`#edit-form-${dbID}`).toggle();
              });
            })
            .then(() => {
              $(`#updateTitle-${dbID}`).on("click", (event) => {
                event.preventDefault();
                let newTmdbGenres = [
                  {
                    id: 28,
                    name: "Action",
                  },
                  {
                    id: 12,
                    name: "Adventure",
                  },
                  {
                    id: 16,
                    name: "Animation",
                  },
                  {
                    id: 35,
                    name: "Comedy",
                  },
                  {
                    id: 80,
                    name: "Crime",
                  },
                  {
                    id: 99,
                    name: "Documentary",
                  },
                  {
                    id: 18,
                    name: "Drama",
                  },
                  {
                    id: 10751,
                    name: "Family",
                  },
                  {
                    id: 14,
                    name: "Fantasy",
                  },
                  {
                    id: 36,
                    name: "History",
                  },
                  {
                    id: 27,
                    name: "Horror",
                  },
                  {
                    id: 10402,
                    name: "Music",
                  },
                  {
                    id: 9648,
                    name: "Mystery",
                  },
                  {
                    id: 10749,
                    name: "Romance",
                  },
                  {
                    id: 878,
                    name: "Science Fiction",
                  },
                  {
                    id: 10770,
                    name: "TV Movie",
                  },
                  {
                    id: 53,
                    name: "Thriller",
                  },
                  {
                    id: 10752,
                    name: "War",
                  },
                  {
                    id: 37,
                    name: "Western",
                  },
                ];
                const newGenres = [];
                newTmdbGenres.forEach((tmdbItem) => {
                  if (tmdbItem.name === $(`#new-genre-${dbID}`).val()) {
                    newGenres.push(tmdbItem.id);
                  }
                });
                console.log(newGenres);
                const newTitle = $(`#new-title-${dbID}`).val();
                fetch(
                  `https://api.themoviedb.org/3/search/movie?query=${newTitle}&include_adult=false&language=en-US&page=1`,
                  options
                )
                  .then((newMovie) => newMovie.json())
                  .then((newMovie) => {
                    newMovie.results.forEach(function (item) {
                      let newMovieTitle = item.title;
                      if (
                        newTitle === newMovieTitle &&
                        item.poster_path !== null &&
                        item.vote_count > 1000
                      ) {
                        fetch(
                          `https://lava-tranquil-chance.glitch.me/movies/${dbID}`,
                          {
                            method: "PUT",
                            headers: { "content-type": "application/json" },
                            body: JSON.stringify({
                              title: newTitle,
                              rating: parseInt($(`#new-movie-${dbID}`).val()),
                              movieOverview: $(`#new-overview-${dbID}`).val(),
                              movieGenres: newGenres,
                              TMDBID: item.id,
                              id: `${dbID}`,
                            }),
                          }
                        )
                          .then((movie) => movie.json())
                          .then(() => {
                            updateGenres = [];
                            $("#image-container").empty();
                            renderMovieData();
                          })
                          /* review was deleted successfully */
                          .catch((error) => console.error(error));
                      }
                    });
                  })

                  .catch((err) => console.error(err));
              });
            });
        });
      })
    )
    .catch((err) => console.error(err));
};

renderMovieData();
