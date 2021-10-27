import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      margin: theme.spacing(3),
      padding: theme.spacing(3),
    },
  })
);

const Home = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h3">This is a sheet of paper.</Typography>
      <Typography variant="body1">
        Paper can be used to build surface or other elements for your
        application.
      </Typography>
      <Box mt={1}>
        <Button variant="contained" color="primary">
          Click me
        </Button>
        <Button variant="contained" color="secondary" sx={{ ml: 1 }}>
          Or me
        </Button>
      </Box>
    </Paper>
  );
};

export default Home;
