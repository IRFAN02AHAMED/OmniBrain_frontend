import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3b6758',
      container: '#acdbc9',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#99434c',
      container: '#fc929b',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ba1a1a',
    },
    background: {
      default: '#f8faf9',
      paper: '#ffffff',
      container: '#eceeed',
      containerLow: '#f2f4f3',
      containerHigh: '#e6e9e8',
      containerHighest: '#e1e3e2',
    },
    text: {
      primary: '#191c1c',
      secondary: '#414945',
      hint: '#717975',
    },
    outline: {
      main: '#717975',
      variant: '#c0c8c3',
    }
  },
  typography: {
    fontFamily: '"Geist", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '48px',
      lineHeight: 1.1,
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '32px',
      lineHeight: 1.2,
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '28px',
      lineHeight: 1.2,
      fontWeight: 600,
    },
    body1: {
      fontSize: '18px',
      lineHeight: 1.6,
      fontWeight: 400,
    },
    body2: {
      fontSize: '16px',
      lineHeight: 1.5,
      fontWeight: 400,
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
    }
  },
  shape: {
    borderRadius: 8,
  },
  components: {
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
          boxShadow: '0px 8px 32px 0px rgba(59, 103, 88, 0.08)',
          '&:hover': {
            backgroundColor: '#2e5145',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          transition: 'all 0.2s',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#c0c8c3',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#3b6758',
            borderWidth: '2px',
          },
        },
        notchedOutline: {
          borderColor: '#c0c8c3',
        },
      },
    },
  },
});

export default lightTheme;
