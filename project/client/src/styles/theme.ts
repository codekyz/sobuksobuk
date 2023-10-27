import { red, green, blueGrey, grey } from "@mui/material/colors";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      background: {
        default: grey[200],
      },
      primary: {
        main: blueGrey[300],
        light: blueGrey[100],
        dark: blueGrey[900],
      },
      text: {
        primary: grey[800],
        secondary: grey[50],
      },
      error: {
        main: red[500],
      },
      success: {
        main: green[500],
      },
    },
  }),
);

export default theme;