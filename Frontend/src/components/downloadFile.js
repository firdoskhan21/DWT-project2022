import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import GetAppIcon from "@material-ui/icons/GetApp";
import ReplayIcon from "@material-ui/icons/Replay";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
  },
  margin: {
    margin: theme.spacing(2),
  },
  textFieldWidth: {
    width: 500,
    marginTop: theme.spacing(5),
  },
}));

export default function DownloadFile() {
  const classes = useStyles();
  const [fileCode, setFileCode] = React.useState("");
  const [checkError, setCheckError] = React.useState(false);

  const download = () => {
    console.log("download");
    setCheckError(true);
  };

  const error = (e) => {
    setFileCode(e.target.value);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className={classes.root}>
      <TextField
        error={checkError}
        className={classes.textFieldWidth}
        id="input-with-icon-grid"
        label="Enter download code"
        variant="outlined"
        value={fileCode}
        onChange={(e) => error(e)}
        helperText={checkError && "Incorrect code"}
      />
      <br />
      <Button
        className={classes.margin}
        variant="contained"
        color="primary"
        endIcon={<GetAppIcon />}
        onClick={download}
      >
        Download
      </Button>
      <Button
        className={classes.margin}
        variant="contained"
        endIcon={<ReplayIcon />}
        onClick={refreshPage}
      >
        Reload
      </Button>
    </div>
  );
}
