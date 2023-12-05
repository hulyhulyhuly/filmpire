import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  pageBtn: {
    margin: '2rem 0.25rem',
  },

  pageNum: {
    margin: '0 1.5rem !important',
    color: theme.palette.text.primary,
  },
}));
