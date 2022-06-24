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
import GetAppIcon from "@material-ui/icons/GetApp";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

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
  textFieldWidth: {
    marginTop: theme.spacing(2),
    width: 500,
  },
  success: {
    color: "green",
    height: 150,
    width: 150,
  },
  error: {
    color: "red",
    height: 120,
    width: 120,
  },
}));

export default function FileStatusModal(props) {
  const { open, handleClose, code, action } = props;
  const classes = useStyles();
  const [fileCode, setFileCode] = React.useState("");
  const [checkError, setCheckError] = React.useState(false);
  const [actionPerformed, setActionPerformed] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  React.useEffect(() => {
    setFileCode("");
    setCheckError(false);
    setActionPerformed(false);
    setIsSuccess(false);
  }, [open]);

  const confirm = () => {
    setCheckError(fileCode.length < 10 ? false : true);
    if (fileCode.length < 10) {
      setActionPerformed(true);
      setIsSuccess(true);
    }
  };

  const error = (e) => {
    setFileCode(e.target.value);
    if (e.target.value.length === 0) {
      setCheckError(false);
    }
  };

  const handleCloseDialog = () => {
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
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
          {actionPerformed ? (
            <div>
              {isSuccess ? (
                <CheckCircleIcon className={classes.success} />
              ) : (
                <CancelIcon className={classes.error} />
              )}
            </div>
          ) : (
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
          )}
        </div>
      </DialogContent>
      <DialogActions style={{ margin: 20 }}>
        <Button onClick={handleCloseDialog} variant="contained">
          {actionPerformed ? "Close" : "Cancel"}
        </Button>
        {!actionPerformed && (
          <Button
            onClick={confirm}
            color="primary"
            autoFocus
            variant="contained"
            disabled={fileCode.length === 0}
          >
            {action === "download" ? "Download" : "Confirm"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

FileStatusModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
};
