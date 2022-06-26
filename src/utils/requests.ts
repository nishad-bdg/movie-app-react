import { apiUrl, apiKey } from "../constants"

const requests = {
  fetchTrending: `${apiUrl}/trending/all/week?api_key=${apiKey}&language=en-US`,
  fetchNetflixOriginals: `${apiUrl}/discover/movie?api_key=${apiKey}&with_networks=213`,
  fetchTopRated: `${apiUrl}/movie/top_rated?api_key=${apiKey}&language=en-US`,
  fetchActionMovies: `${apiUrl}/discover/movie?api_key=${apiKey}&language=en-US&with_genres=28`,
  fetchComedyMovies: `${apiUrl}/discover/movie?api_key=${apiKey}&language=en-US&with_genres=35`,
  fetchHorrorMovies: `${apiUrl}/discover/movie?api_key=${apiKey}&language=en-US&with_genres=27`,
  fetchRomanceMovies: `${apiUrl}/discover/movie?api_key=${apiKey}&language=en-US&with_genres=10749`,
  fetchDocumentaries: `${apiUrl}/discover/movie?api_key=${apiKey}&language=en-US&with_genres=99`,
}

export default requests