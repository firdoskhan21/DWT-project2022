import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
  },
  input: {
    display: "none",
  },
  margin: {
    marginTop: theme.spacing(5),
  },
  size: {
    height: 150,
    width: 150,
  },
}));

export default function SendFile() {
  const classes = useStyles();

  const uploadFile = (e) => {
    console.log(e.target.files[0]);
  };
  return (
    <div className={classes.root}>
      <input
        className={classes.input}
        id="icon-button-file"
        type="file"
        onChange={uploadFile}
      />
      <label htmlFor="icon-button-file">
        <IconButton
          className={classes.margin}
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <AddCircleIcon className={classes.size} />
        </IconButton>
        <p>Add File</p>
      </label>
      <TextField
        className={classes.margin}
        id="input-with-icon-grid"
        label="File Name"
        variant="outlined"
        value={"myFile.js"}
      />
      <br />
      <Button
        className={classes.margin}
        size="lg"
        variant="contained"
        color="primary"
      >
        Upload
      </Button>

      {/* <TextField className={classes.margin} id="input-with-icon-grid" label="copy code" variant="outlined" value={'wl78fefwef43'}/><br />
      <p className={classes.margin}><b>Note:</b> Directly enter the code in the downloads section to Download Your Files</p>
      <Button className={classes.margin} size='lg' variant="contained" color="primary"> Copy </Button> */}
    </div>
  );
}
