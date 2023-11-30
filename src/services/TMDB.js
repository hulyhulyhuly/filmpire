import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
const tmdbApiToken = process.env.REACT_APP_TMDB_TOKEN;
const page = 1;

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
      query: () => `movie/popular?page=${page}`,
    }),
  }),
});

export const {
  useGetGenresQuery,
  useGetMoviesQuery,
} = tmdbApi;
