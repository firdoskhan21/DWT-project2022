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

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
  size: {
    height: 12,
    width: 12,
  },
}));

export default function EnhancedTableToolbar(props) {
  const classes = useToolbarStyles();
  const { numSelected } = props;
  const [open, setOpen] = React.useState(false);

  const [filter, setFilter] = React.useState("allFiles");

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
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {/* File sharing */}
        </Typography>
      )}

      {numSelected > 0 ? (
        <>
          <Tooltip title="download">
            <IconButton aria-label="download" onClick={handleClickOpen}>
              <GetAppIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" onClick={handleClickOpen}>
            <IconButton aria-label="delete">
              <BlockIcon />
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
                  <IconButton
                  size="small"
                    aria-label="Upload file"
                  >
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
              <MenuItem value={"allFiles"}>All files</MenuItem>
              <MenuItem value={"blockedFiles"}>Blocked files</MenuItem>
            </Select>
          </FormControl>
          <Tooltip title="Upload file">
            <IconButton aria-label="Upload file" onClick={handleClickOpen}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
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
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
