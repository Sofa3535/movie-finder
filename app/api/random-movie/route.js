import { NextResponse } from 'next/server';

// Disable caching for this API route
export const fetchCache = 'force-no-store'; // This works with fetch, but only for fetch calls.

export async function GET() {
    try {
        // Generate a random page number between 1 and 500
        const randomPage = Math.floor(Math.random() * 500) + 1;

        // Fetch popular movies from the TMDb API using fetch with cache: 'no-store'
        const apiKey = process.env.TMDB_API_KEY; // Use your TMDb API key from environment variables
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${randomPage}`,
            { cache: 'no-store' } // Ensure that the response isn't cached
        );

        // Handle errors from the TMDb API response
        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch data from TMDb' }, { status: response.status });
        }

        const data = await response.json();
        const movies = data.results;

        // If movies were returned, pick a random one
        if (movies.length > 0) {
            const randomMovie = movies[Math.floor(Math.random() * movies.length)];

            // Return the random movie as a JSON response
            return NextResponse.json(randomMovie);
        } else {
            return NextResponse.json({ error: 'No movies found' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch random movie' }, { status: 500 });
    }
}
