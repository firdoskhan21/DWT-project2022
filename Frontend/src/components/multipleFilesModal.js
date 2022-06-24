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
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    // marginTop: 100,
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

export default function MultipleFilesModal(props) {
  const { open, handleClose } = props;
  const classes = useStyles();
  const [files, setFiles] = React.useState({});
  const [fileCode, setFileCode] = React.useState([]);
  const [addFile, setAddFile] = React.useState(true);

  React.useEffect(() => {
    setAddFile(true);
    setFileCode([]);
    setFiles({});
  }, [open]);

  const uploadFile = (e) => {
    setFiles(e.target.files);
    setAddFile(false);
  };

  const getCode = () => {
    console.log("getCode");
    setFileCode(["lkavlajvoiejv23FKLF25JKN", "kjanvkjvnavenwe"]);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Use Google's location service?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
        <div className={classes.root}>
          {addFile && (
            <>
              <input
                className={classes.input}
                id="icon-button-file"
                type="file"
                onChange={uploadFile}
                multiple
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

          {fileCode.length === 0 &&
            Object.keys(files).map((key) => (
              <div key={key}>
                <TextField
                  className={classes.textFieldWidth}
                  id="input-with-icon-grid"
                  label="File Name"
                  variant="outlined"
                  value={files[key].name}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small" aria-label="Delete file">
                          <DeleteIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            ))}

          {fileCode.length > 0 && (
            <>
              <p className={classes.margin}>
                <b>Note:</b> Directly enter the code in the downloads section to
                Download Your Files
              </p>
              {fileCode.map((code) => (
                <div key={code}>
                  <TextField
                    className={classes.textFieldWidth}
                    id="input-with-icon-grid"
                    label="copy code"
                    variant="outlined"
                    value={code}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton size="small" aria-label="copy file">
                            <FileCopyIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </DialogContent>
      <DialogActions style={{ margin: 20 }}>
        <Button onClick={handleClose} variant="contained">
          Cancel
        </Button>
        {fileCode.length > 0 ? (
          <Button
            className={classes.margin}
            variant="contained"
            color="primary"
          >
            Copy in JSON
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={getCode}
            disabled={Object.keys(files).length === 0}
          >
            Upload
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

MultipleFilesModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
