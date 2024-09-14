import { NextResponse } from 'next/server';
import axios from 'axios';

// API route handler for movie search
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
        return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    try {
        const apiKey = process.env.TMDB_API_KEY;
        const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
        );
        const movieData = response.data.results[0];

        if (movieData) {
            return NextResponse.json(movieData, { status: 200 });
        } else {
            return NextResponse.json({ error: 'No movie found' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}
