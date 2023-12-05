import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  featuredCardContainer: {
    marginBottom: '1.25rem',
    display: 'flex',
    justifyContent: 'center',
    height: '490px',
    textDecoration: 'none',
  },

  cardRoot: {
    position: 'relative',
  },

  card: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },

  cardMedia: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.575)',
    backgroundBlendMode: 'darken',
  },

  cardContentRoot: {
    position: 'relative',
    backgroundColor: 'transparent',
  },

  cardContent: {
    color: '#fff',
    width: '40%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));
