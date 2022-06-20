import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles, theme } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import PublishIcon from "@material-ui/icons/Publish";
import GetAppIcon from '@material-ui/icons/GetApp';

export default function Home() {
  const useStyles = makeStyles((theme) => ({
    root: {
      textAlign: "center",
    },
    margin: {
      margin: theme.spacing(2),
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
      <h3 style={{ marginBotttom: 300 }}>File sharing platform</h3>
      <p className={classes.details}>
        It is a file sharing app which allows you to upload and share a file
        from your pc or mobile and transfer it to anyone across the internet
        quickly and easily.
      </p>
      <div style={{ marginTop: 100 }}>
        <Button
          variant="contained"
          color="primary"
          className={classes.margin}
          onClick={send}
          endIcon={<PublishIcon />}
        >
          Send File
        </Button>
      </div>
      <Button
        variant="contained"
        color="primary"
        className={classes.margin}
        onClick={download}
        endIcon={<GetAppIcon />}
      >
        Download File
      </Button>
    </div>
  );
}
