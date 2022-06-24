import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import GetAppIcon from "@material-ui/icons/GetApp";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import BlockIcon from "@material-ui/icons/Block";
import InputAdornment from "@material-ui/core/InputAdornment";
import ClearIcon from "@material-ui/icons/Clear";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import MultipleFilesModal from "./multipleFilesModal";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    display: "flex",
    // justifyContent: "right",
  },
  formControl: {
    marginLeft: theme.spacing(2),
    minWidth: 250,
  },
  size: {
    height: 12,
    width: 12,
  },
  highlight: {
    color: theme.palette.secondary.main,
    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
  },
  title: {
    marginRight: "auto",
  },
}));

export default function EnhancedTableToolbar(props) {
  const classes = useToolbarStyles();
  const { numSelected } = props;
  const [open, setOpen] = React.useState(false);
  const [filter, setFilter] = React.useState("allFiles");
  const admin = window.localStorage.getItem("user") === "admin user";

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 && (
          <Typography color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        )}
      </div>

      {numSelected > 0 ? (
        <>
          {/* <Tooltip title="download all selected files">
            <IconButton aria-label="download" onClick={handleClickOpen}>
              <GetAppIcon />
            </IconButton>
          </Tooltip> */}

          <Tooltip title="Block all selected files">
            <IconButton
              className={classes.buttonMargin}
              aria-label="Block all selected files"
              onClick={handleClickOpen}
              // size="large"
            >
              <LockIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Unblock all selected files">
            <IconButton
              className={classes.buttonMargin}
              aria-label="Unblock all selected files"
              onClick={handleClickOpen}
              // size="large"
            >
              <LockOpenIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
          <TextField
            id="standard-basic"
            label="Search file"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" aria-label="Upload file">
                    <ClearIcon className={classes.size} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Filter list</InputLabel>{" "}
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter}
              onChange={handleChange}
            >
              <MenuItem value={"allFiles"}>All Files</MenuItem>
              <MenuItem value={"blockedFiles"}>Blocked Files</MenuItem>
              <MenuItem value={"unblockedFiles"}>Downloadable Files</MenuItem>

              {admin && (
                <MenuItem value={"requestBlockFiles"}>
                  Requested Block Files
                </MenuItem>
              )}
              {admin && (
                <MenuItem value={"requestUnblockFiles"}>
                  Requested Unblock Files
                </MenuItem>
              )}
            </Select>
          </FormControl>
          <Tooltip title="Upload multiple files">
            <IconButton
              className={classes.buttonMargin}
              aria-label="Upload file"
              onClick={handleClickOpen}
              // size="large"
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </>
      )}

      <MultipleFilesModal open={open} handleClose={handleClose} />
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
