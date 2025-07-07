import axios from 'axios'
import type { Movie } from '../types/movie'

const BASE_URL = 'https://api.themoviedb.org/3';
const API_TOKEN = import.meta.env.VITE_API_TOKEN;


interface MovieServiceProps {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}



export default async function fetchMovies(query: string, page: number): Promise<{results: Movie[]; total_pages: number}> {

    try {

        const response = await axios.get<MovieServiceProps>(`${BASE_URL}/search/movie`,
            {
                params: {
                    query,
                    page,
                },
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                },
            }
        );

        const { results, total_pages } = response.data;

        return { results, total_pages };
        


    } catch {

        throw new Error('Failed to load movies. Please, ensure your connection and try again')
    }

    
}