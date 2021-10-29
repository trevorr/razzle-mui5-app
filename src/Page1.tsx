import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link } from "react-router-dom";

export default function Page1() {
  return (
    <Container>
      <Typography variant="h3">This is page 1</Typography>
      <Button variant="contained" component={Link} to="/">
        Go home
      </Button>
    </Container>
  );
}
