import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#2E4053", // Set your desired background color here
    },
    primary: {
      main: "#42A5F5",
    },
  },
  typography: {
    fontFamily: [
      'Heebo',
      'sans-serif',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
components:{
  MuiPaper:{
    styleOverrides:{
      root:{
        background: '#577ba1'
      }
    }
  }
}
});

export default theme;
