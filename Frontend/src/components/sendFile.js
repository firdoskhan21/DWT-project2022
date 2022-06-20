import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import PublishIcon from "@material-ui/icons/Publish";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ReplayIcon from "@material-ui/icons/Replay";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
  },
  input: {
    display: "none",
  },
  margin: {
    margin: theme.spacing(2),
  },
  size: {
    height: 150,
    width: 150,
  },
  textFieldWidth: {
    width: 500,
    marginTop: theme.spacing(5),
  },
}));

export default function SendFile() {
  const classes = useStyles();
  const [fileName, setFileName] = React.useState("");
  const [fileCode, setFileCode] = React.useState("");
  const [addFile, setAddFile] = React.useState(true);

  const uploadFile = (e) => {
    console.log(e.target.files[0]);
    setFileName(e.target.files[0].name);
    setAddFile(false);
  };

  const getCode = () => {
    console.log("getCode");
    setFileName("");
    setFileCode("lkavlajvoiejv23FKLF25JKN");
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className={classes.root}>
      {addFile && (
        <>
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
        </>
      )}
      {fileName.length > 0 && (
        <>
          <TextField
            className={classes.textFieldWidth}
            id="input-with-icon-grid"
            label="File Name"
            variant="outlined"
            value={fileName}
          />
          <br />
          <Button
            className={classes.margin}
            variant="contained"
            color="primary"
            endIcon={<PublishIcon />}
            onClick={getCode}
          >
            Upload
          </Button>
          <Button
            className={classes.margin}
            variant="contained"
            endIcon={<DeleteIcon />}
            onClick={() => setFileName("")}
          >
            Delete
          </Button>
        </>
      )}

      {fileCode.length > 0 && (
        <>
          <TextField
            className={classes.textFieldWidth}
            id="input-with-icon-grid"
            label="copy code"
            variant="outlined"
            value={fileCode}
          />
          <br />
          <p className={classes.margin}>
            <b>Note:</b> Directly enter the code in the downloads section to
            Download Your Files
          </p>
          <Button
            className={classes.margin}
            variant="contained"
            color="primary"
            endIcon={<FileCopyIcon />}
          >
            Copy
          </Button>
          <Button
            className={classes.margin}
            variant="contained"
            endIcon={<ReplayIcon />}
            onClick={refreshPage}
          >
            Reload
          </Button>
        </>
      )}
    </div>
  );
}
