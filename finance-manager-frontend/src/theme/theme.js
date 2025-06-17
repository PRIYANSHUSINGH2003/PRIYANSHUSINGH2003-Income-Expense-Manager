import { createTheme } from '@mui/material/styles';

const glassmorphism = {
  background: 'rgba(255, 255, 255, 0.15)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
};

const theme = (darkMode) => createTheme({
  palette: {
    mode: darkMode ? 'dark' : 'light',
    primary: {
      main: darkMode ? '#90caf9' : '#1976d2',
      contrastText: '#fff',
    },
    secondary: {
      main: '#43a047',
    },
    background: {
      default: darkMode ? '#181c24' : '#f6f8fb',
      paper: darkMode ? '#232a36' : '#fff',
      glass: glassmorphism.background,
      gradient: darkMode
        ? 'linear-gradient(120deg, #232a36 0%, #181c24 100%)'
        : 'linear-gradient(120deg, #e3f0fc 0%, #f6f8fb 100%)',
    },
    divider: darkMode ? '#232a36' : '#e3eaf2',
  },
  shape: { borderRadius: 18 },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    h1: { fontWeight: 900, fontSize: 36, letterSpacing: 1 },
    h2: { fontWeight: 800, fontSize: 28 },
    h3: { fontWeight: 700, fontSize: 22 },
    h4: { fontWeight: 700, fontSize: 20 },
    h5: { fontWeight: 700, fontSize: 18 },
    h6: { fontWeight: 700, fontSize: 16 },
    subtitle1: { fontWeight: 600 },
    subtitle2: { fontWeight: 500 },
    button: { fontWeight: 700, textTransform: 'none' },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          ...glassmorphism,
          transition: 'box-shadow 0.3s, background 0.3s',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: darkMode
            ? 'linear-gradient(120deg, #232a36 0%, #181c24 100%)'
            : 'linear-gradient(120deg, #e3f0fc 0%, #f6f8fb 100%)',
          borderRight: 'none',
          boxShadow: glassmorphism.boxShadow,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 12px 0 rgba(33, 150, 243, 0.12)',
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          transition: 'background 0.5s',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px 0 rgba(33,150,243,0.10)',
          borderRadius: 12,
          transition: 'box-shadow 0.2s',
        },
      },
    },
  },
});

export default theme;
