"use client";

import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faDice } from '@fortawesome/free-solid-svg-icons';

interface Movie {
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to search for a specific movie based on the query
  const searchMovie = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query) return;

    try {
      const response = await axios.get(`/api/movie?query=${query}`);
      const movieData: Movie = response.data;

      if (movieData) {
        setMovie(movieData);
        setError(null);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setError('No movie found.');
      } else {
        setError('An error occurred while fetching the movie data.');
      }
      setMovie(null);
    }
  };

  // Function to fetch a random movie from the server
  const getRandomMovie = async () => {
    try {
      const response = await axios.get('/api/random-movie');
      const randomMovie = response.data;

      if (randomMovie) {
        setMovie(randomMovie);
        setError(null);
      }
    } catch (error) {
      setError('Failed to fetch a random movie.');
      setMovie(null);
    }
  };

  return (
      <div className="min-h-screen bg-[#0d0c22] text-white">
        <div className="max-w-2xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Movie Search App</h1>
          </div>

          {/* Search Form and Get Lucky Button in Line */}
          <div className="flex flex-col sm:flex-row items-center justify-center mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
            <form onSubmit={searchMovie} className="flex flex-col sm:flex-row justify-center items-center w-full sm:w-auto">
              <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for a movie"
                  className="border border-gray-300 p-2 rounded-lg w-full sm:w-64 max-w-md mb-4 sm:mb-0 bg-white text-gray-900"
              />
              <button
                  type="submit"
                  className="bg-blue-600 text-white p-2 rounded-lg sm:ml-2 w-full sm:w-auto flex justify-center items-center"
              >
                <FontAwesomeIcon icon={faSearch} className="w-4 h-4 mr-2" />
                Search
              </button>
            </form>

            {/* Get Lucky Button */}
            <button
                onClick={getRandomMovie}
                className="bg-green-600 text-white p-2 rounded-lg w-full sm:w-auto flex justify-center items-center"
            >
              <FontAwesomeIcon icon={faDice} className="w-4 h-4 mr-2" />
              Get Lucky
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-600 text-center">{error}</p>}

          {/* Movie Details */}
          {movie && (
              <div
                  className="bg-blue-950 shadow-lg shadow-blue-950/50 rounded overflow-hidden flex flex-col sm:flex-row p-4">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full sm:w-40 rounded-lg mb-4 sm:mb-0"
                />
                <div className="ml-0 sm:ml-4">
                  <h2 className="text-2xl font-bold mb-2 text-white-500">{movie.title}</h2>
                  <p className="text-[#a6a3df] mb-2">{movie.overview}</p>
                  <p className="text-teal-400">Release Date: {movie.release_date}</p>
                  <p className="text-teal-400">Rating: {movie.vote_average}</p>
                </div>
              </div>
          )}
        </div>
      </div>
  );
}
