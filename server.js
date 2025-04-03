const express = require("express");
const mongoose = require("mongoose");
const Movie = require("./models/movie");
const methodOverride = require("method-override");
require("dotenv").config();

const server = express();
const port = 3000;
const dbURI = process.env.DB_URI;

server.set("view engine", "ejs");
server.use(express.static("public"));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(methodOverride("_method"));

mongoose
  .connect(dbURI)
  .then((result) =>
    server.listen(port, () => {
      console.log(`Listening on port ${port}\nConnected to db`);
    })
  )
  .catch((error) => console.log(error));

server.get("/movies", async (request, response) => {
  const { filter } = request.query;
  const movies = await Movie.find();
  if (filter !== "all") {
    console.log(filter);
    const filteredMovies = movies.filter((movie) => movie.ageRating === filter);
    response.render("moviesIndex", { movies: filteredMovies });
  } else {
    response.render("moviesIndex", { movies });
  }
});

server.post("/movies", async (request, response) => {
  const { title, year, rating, poster, director, cast } = request.body;
  //   console.log(newMovie);
  const addNewMovie = new Movie({
    title,
    year,
    rating,
    poster,
    director,
    cast,
  });
  await addNewMovie
    .save()
    .then((result) => response.redirect("/movies"))
    .catch((error) => console.log(error));
});

server.get("/movies/new", (request, response) => {
  response.render("moviesNew");
});

server.get("/movies/:id/edit", async (request, response) => {
  const { id } = request.params;
  const editMovie = await Movie.findById(id)
    .then((result) => response.render("moviesEdit", { editMovie: result }))
    .catch((error) => console.log(error));
});

server.get("/movies/:id", async (request, response) => {
  const { id } = request.params;
  const showMovie = await Movie.findById(id);
  response.render("movieShow", { showMovie });
});

server.delete("/movies/:id", async (request, response) => {
  const { id } = request.params;
  await Movie.findByIdAndDelete(id)
    .then((result) => response.redirect("/movies"))
    .catch((error) => console.log(error));
});

server.patch("/movies/:id", async (request, response) => {
  const { id } = request.params;
  const updates = request.body;
  await Movie.findByIdAndUpdate(id, updates);
  await response.redirect("/movies");
});

server.get("/movies/tickets/:id", async (request, response) => {
  const { id } = request.params;
  const movie = await Movie.findById(id);
  response.render("movieTicketsNew", { movie });
});
