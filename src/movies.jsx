import React, { Component } from "react";
import { getMovies } from "./services/fakeMovieService";


class Movies extends React.Component {
    
    state = {
        movies: getMovies(),
    }
    
    //This generates the table containing the available movies  
    generateTable = (movies) => {
        if(movies.length === 0) return <p>There are no movies to display.</p>;
        return (
            movies.map(movie => {
                return(
                    <tr>
                        {/* <th scope="row"></th> */}
                        <td>{movie.title}</td>
                        <td>{movie.genre.name}</td>
                        <td>{movie.numberInStock}</td>
                        <td>{movie.dailyRentalRate}</td>
                        <td><button onClick={ () => this.handleDelete(movie._id) } type="button" class="btn btn-danger">Delete</button></td>
                    </tr>
                )
            })
        );
    }

    // Helper method to display the content properly
    getContent = (movies) => {

        if(movies.length === 0) return( <h1>There are no movies to show </h1> );
        
        // else
        return (
            <div>
                <h1>Showing {movies.length} movies on current page</h1>
                <div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Genre</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.generateTable(this.state.movies) }
                        </tbody>
                    </table>
                </div>
            </div>
            );
    }

    // To handle the delete event, uses the setState method 
    handleDelete = (id) => {
        this.setState({ movies:this.state.movies.filter(movie => movie._id !== id) });
    }

    render() {     
        return ( this.getContent(this.state.movies) );
    }
}
 
export default Movies;