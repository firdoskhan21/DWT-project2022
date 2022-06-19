import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import AddCircleIcon from "@material-ui/icons/AddCircle";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    display: "flex",
    justifyContent: "center",
    paddingTop: 100,
  },
  input: {
    display: "none",
  },
}));

export default function DownloadFile() {
  const classes = useStyles();

  const uploadFile = (e) => {
    console.log(e.target.files[0]);
  };
  return <div className={classes.root}>Download</div>;
}
