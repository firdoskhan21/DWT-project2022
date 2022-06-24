import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import Card from "@material-ui/core/Card";
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import GetAppIcon from "@material-ui/icons/GetApp";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FileStatusModal from './fileStatusModal';
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(6),
  },
  paper: {
    padding: "10px 50px",
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  size: {
    height: 20,
    width: 20,
  },
}));

function createData(name, size, date, disabled, code) {
  return { name, size, date, disabled, code };
}

const rows = [
  createData("Cupcake", 305, 4.3, true, '1lkvwvnekwweijwenfqwo'),
  createData("Donut", 452, 4.9, false, '2lkvwvnekwweijwenfqwo'),
  createData("Eclair", 262, 6.0, false, '3lkvwvnekwweijwenfqwo'),
  createData("Frozen yoghurt", 159, 4.0, false, '4lkvwvnekwweijwenfqwo'),
  createData("Gingerbread", 356, 3.9, true, '5lkvwvnekwweijwenfqwo'),
  createData("Honeycomb", 408, 6.5, false, '6lkvwvnekwweijwenfqwo'),
  createData("Ice cream sandwich", 237, 4.3, false, '7lkvwvnekwweijwenfqwo'),
  createData("Jelly Bean", 375, 0.0, true, '8lkvwvnekwweijwenfqwo'),
  createData("KitKat", 518, 7.0, false, '9lkvwvnekwweijwenfqwo'),
  createData("Lollipop", 392, 0.0, false, '10lkvwvnekwweijwenfqwo'),
  createData("Marshmallow", 318, 2.0, false, '11lkvwvnekwweijwenfqwo'),
  createData("Nougat", 360, 37.0, true, '12lkvwvnekwweijwenfqwo'),
  createData("Oreo", 437, 4.0, false, '13lkvwvnekwweijwenfqwo'),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("size");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const admin = window.localStorage.getItem('user') === 'admin user';
  const [open, setOpen] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [action, setAction] = React.useState("");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleChangeDense = (event) => {
  //   setDense(event.target.checked);
  // };
  const handleClose = () => {
    setCode('')
    setOpen(false);
    setAction('')
  };

  const handleClickOpen = (code, action) => {
    setAction(action)
    setCode(code)
    setOpen(true);
  }
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Card variant="outlined" className={classes.root}>
      <div className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      // style={{ opacity: row.disabled ? ".5" : "1" }}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          // disabled={row.disabled}
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                          onClick={(event) => handleClick(event, row.name)}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.size}</TableCell>
                      <TableCell align="right">{row.date}</TableCell>
                      <TableCell align="right">
                        <Tooltip title="download file">
                          <IconButton size="small" disabled={row.disabled} onClick={() => handleClickOpen(row.code, 'download')}>
                          <GetAppIcon className={classes.size} />
                        </IconButton>
                        </Tooltip>
                        <Tooltip title={row.disabled ? "Unblock file" :"Block file"} disableFocusListener={!row.disabled}>
                          <IconButton size="small" onClick={() => handleClickOpen(row.code, row.disabled ? "unblock" :"block")}> 
                            {row.disabled ? <LockIcon className={classes.size} /> :
                            <LockOpenIcon className={classes.size} />}
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <FileStatusModal open={open} handleClose={handleClose} code={code} action={action}/>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Card>
  );
}
