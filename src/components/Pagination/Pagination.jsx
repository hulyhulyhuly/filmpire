import React from 'react';
import { Button, Typography } from '@mui/material';

import useStyles from './styles';

const Pagination = ({ currentPage, setPage, totalPages }) => {
  const cls = useStyles();

  const handlePrev = () => {
    if (currentPage !== 1) {
      setPage(() => currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage !== totalPages) {
      setPage(() => currentPage + 1);
    }
  };

  return (
    <div className={cls.pageContainer}>
      <Button className={cls.pageBtn} variant="contained" color="primary" type="button" onClick={handlePrev}>Prev</Button>
      <Typography variant="h4" className={cls.pageNum}>{currentPage}</Typography>
      <Button className={cls.pageBtn} variant="contained" color="primary" type="button" onClick={handleNext}>Next</Button>
    </div>
  );
};

export default Pagination;
