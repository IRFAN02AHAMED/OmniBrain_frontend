import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6C5CE7',
      light: '#8B7CF6',
      contrastText: '#F8FAFC',
    },
    secondary: {
      main: '#fc929b',
      contrastText: '#111827',
    },
    background: {
      default: '#0B1120',
      paper: '#111827',
      sidebar: '#0D1423',
      card: '#151D2C',
      border: '#273244',
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#94A3B8',
    },
    outline: {
      main: '#273244',
    }
  },
  typography: {
    fontFamily: '"Geist", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '48px',
      lineHeight: 1.1,
      fontWeight: 600,
      letterSpacing: '-0.02em',
      color: '#F8FAFC',
    },
    h2: {
      fontSize: '32px',
      lineHeight: 1.2,
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: '#F8FAFC',
    },
    h3: {
      fontSize: '28px',
      lineHeight: 1.2,
      fontWeight: 600,
      color: '#F8FAFC',
    },
    body1: {
      fontSize: '18px',
      lineHeight: 1.6,
      fontWeight: 400,
      color: '#F8FAFC',
    },
    body2: {
      fontSize: '16px',
      lineHeight: 1.5,
      fontWeight: 400,
      color: '#94A3B8',
    },
    button: {
      fontSize: '14px',
      lineHeight: 1.4,
      fontWeight: 500,
      textTransform: 'none',
    },
    caption: {
      fontSize: '12px',
      lineHeight: 1.2,
      fontWeight: 600,
      color: '#94A3B8',
    }
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0B1120',
          color: '#F8FAFC',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '10px 24px',
          fontWeight: 600,
          transition: 'all 0.2s ease-in-out',
          '&:active': {
            transform: 'scale(0.98)',
          },
        },
        containedPrimary: {
          backgroundColor: '#6C5CE7',
          color: '#F8FAFC',
          '&:hover': {
            backgroundColor: '#5b4dcf',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          backgroundColor: 'rgba(17, 24, 39, 0.8)',
          color: '#F8FAFC',
          transition: 'all 0.2s',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#273244',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#94A3B8',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#6C5CE7',
            borderWidth: '2px',
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: '#94A3B8',
          '&.Mui-checked': {
            color: '#6C5CE7',
            '& + .MuiSwitch-track': {
              backgroundColor: '#6C5CE7',
            },
          },
        },
        track: {
          backgroundColor: '#273244',
        },
      },
    },
  },
});

export default darkTheme;
