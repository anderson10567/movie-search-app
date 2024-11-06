import axios from 'axios'

const BASE_URL = 'https://api.themoviedb.org/3'



 export const API_KEY ='7735f99484127fb776cc7b4bbffcbe81'



export const createGuestSession = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/authentication/guest_session/new`, {
      params: { api_key: API_KEY },
    })
    const guestSessionId = response.data.guest_session_id
    return guestSessionId
  } catch (error) {
    console.log('Error creating guest session:', error)
  }
}

export const fetchMovies = async (query, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query,
        page,
      },
    })
    return response.data
  } catch (error) {
    console.error('Ошибка при поиске фильмов:', error)
    throw error
  }
}

export async function fetchRatedMovies(guestSessionId, page = 1) {
  const url = `/guest_session/${guestSessionId}/rated/movies`
  const options = {
    params: {
      language: 'en-US',
      page: page,
      sort_by: 'created_at.asc',
    },
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token.x}.${token.y1}${token.y2}.${token.z}`,
    },
  }

  try {
    const response = await axios.get(`${BASE_URL}${url}`, options)

    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const fetchGenres = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/genre/movie/list?language=en`, {
      params: { api_key: API_KEY },
    })
    return response.data.genres
  } catch (error) {
    console.error('Ошибка при получении жанров:', error)
    throw error
  }
}

const token = {
  x: 'eyJhbGciOiJIUzI1NiJ9',
  y1: 'eyJhdWQiOiJiZTkwMmJkNTBmMWVhNWI0M2VkYWJiYjdlZjIxOTZhNiIsIm5iZiI6MTcyNzcxMjY3',
  y2: 'NS4zMTk0MjUsInN1YiI6IjY2ZmFjYmIwM2EwZjVhMDhjOGYxOTdlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ',
  z: 'LUo2KwMUQQOj_h10pe7QItT4sBYHTx51RQFENcsp_ck',
}

export const postRate = async (rate, movieId, sessionId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/movie/${movieId}/rating?guest_session_id=${sessionId}`,
      { value: rate },
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${token.x}.${token.y1}${token.y2}.${token.z}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.log(error)
  }
}
