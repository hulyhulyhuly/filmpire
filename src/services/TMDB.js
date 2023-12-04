import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
const tmdbApiToken = process.env.REACT_APP_TMDB_TOKEN;

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3',
    prepareHeaders: (headers) => {
      if (tmdbApiToken) {
        headers.set('Authorization', `Bearer ${tmdbApiToken}`);
        headers.set('accept', 'application/json');
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    /* Get Genres */
    getGenres: builder.query({
      query: () => 'genre/movie/list',
    }),

    /* Get Movies by [Type] */
    getMovies: builder.query({
      query: ({ genreIdOrCateName, page, searchQuery }) => {
        // * Get Movies by Search
        if (searchQuery) {
          return `search/movie?query=${searchQuery}&page=${page}`;
        }

        // * Get Movies by Cate
        if (genreIdOrCateName && typeof genreIdOrCateName === 'string') {
          return `movie/${genreIdOrCateName}?page=${page}`;
        }

        // * Get Movies by Genre
        if (genreIdOrCateName && typeof genreIdOrCateName === 'number') {
          return `discover/movie?with_genres=${genreIdOrCateName}&page=${page}`;
        }

        // * Get Popular Movies by Default
        return `movie/popular?page=${page}`;
      },
    }),

    getMovie: builder.query({
      query: (id) => `movie/${id}?append_to_response=videos,credits`,
    }),
  }),
});

export const {
  useGetGenresQuery,
  useGetMoviesQuery,
  useGetMovieQuery,
} = tmdbApi;
