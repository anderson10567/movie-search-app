import React, { useEffect, useState } from 'react'
import LoadingSpinner from '../spinner/spinner'
import MovieList from '../movieList/movieList'
import SearchBar from '../searchbar/searchbar'
import { fetchMovies, createGuestSession, fetchRatedMovies, fetchGenres, postRate } from '../../services/api'
import AlertEmpty from '../alert-empty/alert-empty'
import AlertError from '../alert-error/alert-error'
import PaginationList from '../pagination/pagination'
import Tab from '../tab/tab'
import './app.css'
import { GenreContext } from '../genrecontext/genrecontext'

const App = () => {
    const [movies, setMovies] = useState([])
    const [ratedMovies, setRatedMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [genres, setGenres] = useState([])
    const [searchPerformed, setSearchPerformed] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalMovies, setTotalMovies] = useState(0)
    const [searchQuery, setSearchQuery] = useState('')
    const [guestSessionId, setGuestSessionId] = useState('')
    const [selectedTab, setSelectedTab] = useState('Search')
    const [totalRatedMovies, setTotalRatedMovies] = useState(0)
    const [error, setError] = useState(false)



    useEffect(() => {

        console.log({ movies, searchPerformed, selectedTab, movieslength: movies.length === 0 })
    }, [movies, searchPerformed, selectedTab])
    useEffect(() => {

        if (ratedMovies?.length) {
            setTotalRatedMovies(Object.keys(ratedMovies).length)
        }
    }, [ratedMovies])

    useEffect(() => {
        const initializeGuestSession = async () => {
            try {
                const sessionId = await createGuestSession()
                setGuestSessionId(sessionId)
                await getRatedMovies(sessionId)
                const genresList = await fetchGenres()
                setGenres(genresList)
            } catch (err) {
                console.error('Failed to create guest session:', err);
            }
        }
        initializeGuestSession()
    }, [])


    const getRatedMovies = async () => {
        if (!guestSessionId) return

        setLoading(true)

        try {
            const data = await fetchRatedMovies(guestSessionId)
            const ratings = data?.results?.reduce((acc, movie) => {
                acc[movie.id] = movie?.rating || 0
                return acc
            }, {})

            setRatedMovies(ratings)
        } catch (err) { console.log(err) }
        finally {
            setLoading(false)
        }
    }


    const rateMovie = async (value, id) => {
        if (!guestSessionId) return

        try {
            await postRate(value, id, guestSessionId)

            setRatedMovies((prevRatedMovies) => ({
                ...prevRatedMovies,
                [id]: value,
            }))
        } catch (err) {
            console.log('Ошибка при оценке фильма');
        }
    };

    const fetchMoviesData = async (query, page = 1) => {
        if (!query) {
            setMovies([])
            setSearchPerformed(false)
            setTotalMovies(0)
            return
        }

        setLoading(true)


        try {
            const data = await fetchMovies(query, page)
            setMovies(data.results)
            setTotalMovies(data.total_results)
            setSearchPerformed(true)
            setCurrentPage(page)
            setError(false)
        } catch (err) {
            setError(true)
        }

        finally {
            setLoading(false)
        }
    }

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim() === '') {
            fetchMoviesData('Venom');
        } else {
            fetchMoviesData(query);
        }
    };

    const handlePageChange = (page) => {
        fetchMoviesData(searchQuery, page)
    }

    const getRatedMoviesList = () => {
        return Object.entries(ratedMovies)
            .map(([id, rating]) => {
                const movie = movies.find((movie) => movie.id === parseInt(id))
                return movie
                    ? {
                        ...movie,
                        rating,
                    }
                    : null
            })
            .filter((movie) => movie !== null)
    }

    const getMoviesWithRatings = () => {
        return movies.map((movie) => ({
            ...movie,
            user_rating: ratedMovies && ratedMovies[movie.id] ? ratedMovies[movie.id] : null,
        }))
    }

    const isError = !loading && ((selectedTab === 'Search' && error) || (selectedTab === 'Rated' && Object.keys(ratedMovies || {}).length === 0))
    const isEmpty = !loading && !isError && selectedTab === 'Search' && searchPerformed && movies.length === 0

    return (
        <GenreContext.Provider value={genres}>
            <section className="app">
                <div>
                    <section>
                        <Tab getRated={getRatedMovies} setSelectedTab={setSelectedTab} getSearch={() => setSearchPerformed(true)} />
                    </section>
                    {selectedTab === 'Search' && <SearchBar onChange={handleSearch} />}
                    {loading && <LoadingSpinner />}
                    {isError && <AlertError />}

                    {isEmpty && <AlertEmpty />}
                    {selectedTab === 'Search' && searchPerformed && movies.length > 0 && (
                        <>
                            <MovieList movies={getMoviesWithRatings()} rateMovie={rateMovie} />
                            <PaginationList
                                totalMovies={totalMovies}
                                currentPage={currentPage}
                                getPageSearch={handlePageChange}
                                isSearching={!!searchQuery}
                            />
                        </>
                    )}

                    {selectedTab === 'Rated' && Object.keys(ratedMovies || {}).length > 0 && (
                        <>
                            <MovieList movies={getRatedMoviesList()} withUserRating={true} rateMovie={rateMovie} />
                            <PaginationList
                                totalMovies={totalRatedMovies}
                                currentPage={currentPage}
                                getPageSearch={handlePageChange}
                                isSearching={false}
                            />
                        </>
                    )}
                </div>
            </section>
        </GenreContext.Provider>
    )
}
export default App
