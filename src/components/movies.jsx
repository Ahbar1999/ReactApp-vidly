import React from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./commons/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./commons/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends React.Component {
  state = {
    // movies: getMovies().map((movie) => (movie.heart = false)),
    movies: [],
    genres: [],
    // selectedGenre: null,
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  // a lifetime hookup, called when this component is rendered
  componentDidMount() {
    // this is how you add an additional option, a fake genre "All Genres"
    // Since this "All Genres" object has no property "id" therefor it will return null
    // hence satisfying our ternary operator condition to skip the filter method
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];

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

  handleSort = (sortColumn) => {
    // this method just receives an updated sortColumn object
    // and update thes state accordingly
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const { movies, selectedGenre, currentPage, pageSize, sortColumn } =
      this.state;

    // Note that filtering and sorting is being done in this part of the code
    const filtered =
      selectedGenre && selectedGenre._id
        ? movies.filter((m) => m.genre._id === selectedGenre._id)
        : movies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const currentMovies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: currentMovies };
  };

  render() {
    const { pageSize, currentPage, sortColumn } = this.state;
    const { totalCount, data: currentMovies } = this.getPagedData();

    if (currentMovies.length === 0)
      return <h2>There are no movies to show </h2>;

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
            Showing {currentMovies.length}{" "}
            {currentMovies.length === 1 ? "movie" : "movies"} on current page
          </p>
          <MoviesTable
            movies={currentMovies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
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
