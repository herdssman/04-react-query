import { useEffect, useState } from 'react'
import css from './App.module.css'
import { Toaster, toast } from 'react-hot-toast'
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import type { Movie } from '../../types/movie'
import fetchMovies from '../../services/movieService'
import SearchBar from '../SearchBar/SearchBar'
import Loader from '../Loader/Loader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import MovieGrid from '../MovieGrid/MovieGrid'
import MovieModal from '../MovieModal/MovieModal'




export default function App() {

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [movie, setMovie] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['movies', movie, currentPage],
    queryFn: () => fetchMovies(movie, currentPage),
    enabled: movie !== '',
    placeholderData: keepPreviousData,
  })

  const totalPages = data?.total_pages ?? 0;


  const openModal = (movie:Movie) => setSelectedMovie(movie);
  const closeModal = () => setSelectedMovie(null);

  const handleSearch = async (query: string) => {
    setMovie(query);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (data?.results.length === 0) {
      toast.error("No movies found for your request.")
    }
  }, [data]);

  
  return (
    <div className={css.app}>

      <Toaster />

      <SearchBar onSubmit={handleSearch} />

      {isSuccess && totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          forcePage={currentPage - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}


      {selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal} />}

      <MovieGrid movies={data?.results ?? []} onSelect={openModal}/>

    </div>
  )
}
