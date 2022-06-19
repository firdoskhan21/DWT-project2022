import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 100,
  },
  cardStyle: {
    minWidth: 400,
    minHeight: 450,
    textAlign: "center",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    paddingBottom: 50,
    paddingTop: 50,
  },
  pos: {
    marginBottom: 12,
  },
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: 350,
    },
  },
  cardActions: {
    margin: theme.spacing(4),
    display: "flex",
    justifyContent: "right",
  },
}));

export default function Login() {
  const classes = useStyles();
  const navigate = useNavigate();

  const authentication = () => {
    console.log("lkwvowen");
    navigate("/");
  };
  return (
    <Box mx="auto" className={classes.root}>
      <Card className={classes.cardStyle} variant="outlined">
        <CardContent>
          {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography> */}
          <Typography className={classes.title} variant="h5" component="h2">
            File sharing
          </Typography>

          <form className={classes.form} noValidate autoComplete="off">
            <TextField id="useName" label="User Name" variant="outlined" />
            <br />
            <TextField id="password" label="Password" variant="outlined" />
          </form>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button variant="contained">Cancel</Button>
          <Button variant="contained" color="primary" onClick={authentication}>
            Sign in
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
