import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { InputAdornment, TextField } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

import { searchMovie } from '../../features/currentGenreOrCate';
import useStyles from './styles';

const Search = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const cls = useStyles();

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') dispatch(searchMovie(query));
  };

  return (
    <div className={cls.searchContainer}>
      <TextField
        onKeyDown={handleKeyPress}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="standard"
        InputProps={{
          className: cls.input,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default Search;
