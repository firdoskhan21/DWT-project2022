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
    marginTop: 100,
  },
  title: {
    paddingBottom: 50,
    paddingTop: 50,
    textAlign: 'center'
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
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const authentication = (isAuth) => {
    if(isAuth){
        console.log(userName, password)
        window.localStorage.setItem('user', userName);
        navigate("/");
    } else {
        navigate("/");
        window.localStorage.clear();
    }
  };
  return (
    <Box mx="auto" className={classes.root}>
      <Card className={classes.cardStyle} variant="outlined">
        <CardContent>
          <Typography className={classes.title} variant="h5" component="h2">
            Sign in
          </Typography>

          <form className={classes.form} noValidate autoComplete="off">
            <TextField id="useName" label="User Name" variant="outlined" value={userName} onChange={(e)=>{setUserName(e.target.value)}} />
            <br />
            <TextField id="password" label="Password" variant="outlined" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
          </form>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button variant="contained" onClick={()=> authentication(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={()=> authentication(true)}>
            Submit
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
