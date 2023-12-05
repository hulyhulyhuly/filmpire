import React from 'react';
import { Box, Typography } from '@mui/material';

import { Movie } from '..';

const RatedCards = ({ title, data }) => (
  <Box>
    <Typography variant="h5" gutterBottom>{title}</Typography>
    <Box display="flex" flexWrap="wrap" className={cls.ratedContainer}>
      { data?.results.map((m, i) => <Movie key={m.id} movie={m} i={i} />) }
    </Box>
  </Box>
);

export default RatedCards;
