import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { Link, useHistory } from "react-router-dom";

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
  const history = useHistory();
  const page2Click = React.useCallback(() => {
    history.push("/page2");
  }, [history]);
  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h3">
        Razzle Typescript/MUI 5/React Router 5 Example
      </Typography>
      <Typography variant="body1">
        Click the buttons below to test routing.
      </Typography>
      <Box mt={1}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/page1"
        >
          Page 1
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ ml: 1 }}
          onClick={page2Click}
        >
          Page 2
        </Button>
      </Box>
    </Paper>
  );
};

export default Home;
