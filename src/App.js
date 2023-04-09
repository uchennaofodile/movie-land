//import React, { useEffect, useState } from 'react';
import React, {useState} from 'react';
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./components/MovieCard";

// b9ce7ee4

const API_URL = 'https://www.omdbapi.com?apikey=b9ce7ee4'
//Test Data
// const movie1 = {
//     "Title": "Italian Spiderman",
//     "Year": "2007",
//     "imdbID": "tt2705436",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BYjFhN2RjZTctMzA2Ni00NzE2LWJmYjMtNDAyYTllOTkyMmY3XkEyXkFqcGdeQXVyNTA0OTU0OTQ@._V1_SX300.jpg"
// }
const App = () => {
    //array destructuring = equal to the useState hook, sets the default value of our movies to 
    //an empty array because we're getting an array of movie objects which starts out as empty
    const [movies, setMovies] = useState([]);
    //Search term at the start is an empty string
    //what we will do is dynamically change our search
    //the default state of the searchTerm variable is an empty string
    //The value of the input can be dynamically set by setting the 
    //input value to searchTerm e.g.: value={searchTerm}
    const[searchTerm, setSearchTerm] = useState('');
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }


    //useEffect(() => { searchMovies('Spiderman') }, []);

    return (

        <div className='app'>
            //<h1>MovieLand</h1>
            <img href="./MovieLand-Logo.png" alt="MovieLand Logo"></img>


            <div className="search">
                <input placeholder="Search for movies" 
                value={searchTerm} 
                //e is coming from callback function
                //e is synonymous event
                //e.target.value just means change to the value the 
                //user enters
                onChange={(e) => {setSearchTerm(e.target.value) }} 
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      searchMovies(searchTerm);
                    }
                  }}
                />
                <img src={SearchIcon} 
                alt="search" 
                onClick={() => searchMovies(searchTerm)} />
            </div>
            {
                // Dyanmically looping through movies array 
                //which is fetched from an api
                //dynamincally pass each individual movie as a prop to
                //our movie card resulting in the rendering of the movie
                movies?.length > 0 
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )}


        </div>
    );

}

export default App;
