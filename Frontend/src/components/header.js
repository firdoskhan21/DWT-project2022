import React from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  titleSpace: {
    marginRight: 50,
    cursor: "pointer",
  },
  appBar: {
    marginBottom: 100,
  }
}));

export default function Header() {
  const classes = useStyles();
  const navigate = useNavigate();
  const user = window.localStorage.getItem('user');

  const login = () => {
    navigate("/login");
  };

  const changePath = (value) => {
    navigate(`/${value}`);
  };

  return (
    <div className={classes.appBar}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" noWrap className={classes.titleSpace} onClick={() => changePath("")}>
            File sharing
          </Typography>
          <Button color="inherit" onClick={() => changePath("send")}>
            Send
          </Button>
          <Button color="inherit" onClick={() => changePath("download")}>
            Download
          </Button>

          {user && <Button color="inherit" onClick={() => changePath("list")}>
            All Files
          </Button>}

          <div className={classes.grow} />
          <Button color="inherit" onClick={login}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
