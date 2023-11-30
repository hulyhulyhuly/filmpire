/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const genreOrCate = createSlice({
  name: 'genreOrCate',
  initialState: {
    genreIdOrCateName: '',
    page: 1,
    searchQuery: '',
  },
  reducers: {
    selectGenreOrCate: (state, action) => {
      state.genreIdOrCateName = action.payload;
      state.searchQuery = '';
    },
    searchMovie: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { selectGenreOrCate, searchMovie } = genreOrCate.actions;

export default genreOrCate.reducer;
