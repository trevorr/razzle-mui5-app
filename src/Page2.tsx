import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import React from "react";
import { useHistory } from "react-router-dom";

export default function Page2() {
  const history = useHistory();
  const homeClick = React.useCallback(() => {
    history.goBack();
  }, [history]);
  return (
    <Container>
      <Typography variant="h3">This is page 2</Typography>
      <Button variant="contained" color="secondary" onClick={homeClick}>
        Go home
      </Button>
    </Container>
  );
}
