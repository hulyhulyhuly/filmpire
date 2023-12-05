import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  actorImage: {
    maxWidth: '90%',
    borderRadius: '20px',
    objectFit: 'cover',
    boxShadow: '0.5em 0.5em 1em',
  },

  movie: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },

  castImage: {
    width: '100px',
    margin: '0 auto',
    borderRadius: '10px',
  },
}));
