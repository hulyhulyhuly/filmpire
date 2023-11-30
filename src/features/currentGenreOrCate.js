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
    },
  },
});

export const { selectGenreOrCate } = genreOrCate.actions;

export default genreOrCate.reducer;
