import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./commons/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./commons/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";

class Movies extends React.Component {
  state = {
    // movies: getMovies().map((movie) => (movie.heart = false)),
    movies: [],
    genres: [],
    selectedGenre: null,
    pageSize: 4,
    currentPage: 1,
  };

  // a lifetime hookup, called when this component is rendered
  componentDidMount() {
    // this is how you add an additional option, a fake genre "All Genres"
    // Since this "All Genres" object has no property "id" therefor it will return null
    // hence satisfying our ternary operator condition to skip the filter method
    const genres = [{ name: "All Genres" }, ...getGenres()];

    this.setState({ movies: getMovies(), genres });
  }

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    // movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  // To handle the delete event, uses the setState method
  handleDelete = (thisMovie) => {
    this.setState({
      movies: this.state.movies.filter((movie) => movie._id !== thisMovie._id),
    });
  };

  onGenreClick = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  render() {
    const { movies, selectedGenre, currentPage, pageSize } = this.state;
    if (movies.length === 0) return <h2>There are no movies to show </h2>;

    const filtered =
      selectedGenre && selectedGenre._id
        ? movies.filter((m) => m.genre._id === selectedGenre._id)
        : movies;
    const currentMovies = paginate(filtered, currentPage, pageSize);

    return (
      <div className="row m-2">
        <div className="col-2 m-2">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            handleGenre={this.onGenreClick}
          />
        </div>
        <div className="col m-2">
          <p>
            Showing {filtered.length}{" "}
            {filtered.length === 1 ? "movie" : "movies"} on current page
          </p>
          <MoviesTable
            movies={currentMovies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
          />
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
