import { Theme } from "@mui/material";
import { indigo, orange } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const theme = createTheme({
  palette: {
    primary: orange,
    secondary: indigo,
  },
});

export default theme;
