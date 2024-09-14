import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
    try {
        // Generate a random page number between 1 and 500
        const randomPage = Math.floor(Math.random() * 500) + 1;

        // Fetch popular movies from the TMDb API
        const apiKey = process.env.TMDB_API_KEY; // Use your TMDb API key from environment variables
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${randomPage}`
        );

        const movies = response.data.results;

        // If movies were returned, pick a random one
        if (movies.length > 0) {
            const randomMovie = movies[Math.floor(Math.random() * movies.length)];

            // Disable caching completely by setting the Cache-Control header
            const res = NextResponse.json(randomMovie);
            res.headers.set('Cache-Control', 'no-store, max-age=0'); // Prevent caching

            return res;
        } else {
            return NextResponse.json({ error: 'No movies found' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch random movie' }, { status: 500 });
    }
}
