import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#ffa500",
    },
    secondary: {
      main: "#FFFFFF",
    },
  },
  typography: {
    fontWeightMedium: 600,
    // fontFamily: "'Nunito', sans-serif",
    fontFamily: "'Open Sans', sans-serif",
    fontSize: 17,
    h1: {
      fontSize: "2.7rem",
      fontWeight: 700,
      color: "#000000",
      fontFamily: "Bitter",
      textShadow: ' 0 1px 1px #fccc74',
    },
    h2: {
      fontSize: "2.2rem",
      fontWeight: 700,
      color: "#000000",
      fontFamily: "'Raleway',sans-serif",
      textAlign: "center", 
      textTransform: 'uppercase',
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 700,
      lineHeight: 1.25,
      color: "#000000",
    },
    h4: {
      fontSize: "1.3rem",
      fontWeight: 600,
      lineHeight: 1.25,
      color: "#000000",
    },
    body1: {
      fontSize: "1.15rem",
    },
    body2: {
      fontSize: "1rem",
    },
    caption: {
      fontSize: "0.9rem",
      fontWceight: 400,
      // lineHeight: 1.5,
      color: "#85858B",
    },
    subtitle1: {
      fontSize: "1.0rem",
      fontWceight: 400,
      lineHeight: 1.5,
      color: "#85858B",
    },
    subtitle2: {
      fontSize: "0.8rem",
      fontWeight: 400,
      lineHeight: 1.5,
      color: "#BBBBC1",
    },
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "12px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: "12px",
          overflow: "hidden",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#ffa500" ,
        },
      },
    },
  }
});

export default theme;