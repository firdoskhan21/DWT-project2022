import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles, theme } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const useStyles = makeStyles((theme) => ({
    root: {
      textAlign: "center",
    },
    margin: {
      marginTop: theme.spacing(5),
    },
    details: {
      width: 400,
      margin: "0 auto",
    },
  }));
  const classes = useStyles();
  const navigate = useNavigate();

  const send = () => {
    navigate("/send");
  };
  const download = () => {
    navigate("/download");
  };
  return (
    <div className={classes.root}>
      <h3 className={classes.margin}>File sharing platform</h3>
      <p className={classes.details}>
        It is a file sharing app which allows you to upload and share a file
        from your pc or mobile and transfer it to anyone across the internet
        quickly and easily.
      </p>
      <div>
        <Button
          variant="contained"
          size="large"
          color="primary"
          className={classes.margin}
          onClick={send}
        >
          Send File
        </Button>
      </div>
      <Button
        variant="contained"
        size="large"
        color="primary"
        className={classes.margin}
        onClick={download}
      >
        Download File
      </Button>
    </div>
  );
}
