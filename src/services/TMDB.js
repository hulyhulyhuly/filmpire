import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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

    // * Get Movie by ID
    getMovie: builder.query({
      query: (id) => `movie/${id}?append_to_response=videos,credits`,
    }),

    // * Get User Specific List
    getList: builder.query({
      query: ({ listName, accountId, page }) => `/account/${accountId}/${listName}?page=${page}`,
    }),

    // * Get User Specific Lists
    getRecommendations: builder.query({
      query: ({ id, list }) => `/movie/${id}/${list}`,
    }),

    // * Get Actor by ID
    getActor: builder.query({
      query: (id) => `/person/${id}`,
    }),

    getMovieByActorId: builder.query({
      query: (id) => `/discover/movie?with_cast=${id}`,
    }),

    changeList: builder.mutation({
      query: ({ user_id, type, body }) => ({
        method: 'POST',
        url: `/account/${user_id}/${type}`,
        params: {
          session_id: localStorage.getItem('session_id'),
        },
        body,
      }),
    }),
  }),
});

export const {
  useGetGenresQuery,
  useGetMoviesQuery,
  useGetMovieQuery,
  useGetListQuery,
  useGetRecommendationsQuery,
  useGetActorQuery,
  useGetMovieByActorIdQuery,
  useChangeListMutation,
} = tmdbApi;
