import React from 'react';
import { Box, Typography } from '@mui/material';

import useStyles from './styles';
import { Movie } from '..';

const RatedCards = ({ title, data }) => {
  const cls = useStyles();

  return (
    <Box>
      <Typography variant="h5" gutterBottom>{title}</Typography>
      <Box display="flex" flexWrap="wrap" className={cls.ratedContainer}>
        { data?.results.map((m, i) => <Movie key={m.id} movie={m} i={i} />) }
      </Box>
    </Box>
  );
};

export default RatedCards;
