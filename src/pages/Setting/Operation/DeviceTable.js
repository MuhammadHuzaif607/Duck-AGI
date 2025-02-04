import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import Copy from '../../../../public/copy.png';
import { showSuccess } from '../../../helpers';
import HeaderImage from "../images/sort.png";

function createData(
  token_name,
  status,
  qouta_used,
  qouta_bal,
  created,
  expiration,
) {
  return {
    token_name,
    status,
    qouta_used,
    qouta_bal,
    created,
    expiration,
  };
}

const rows = [
  createData(
    '12 Aug 2022 - 12:25 am',
    '5',
    'Web',
    'Windows',
    '102.03.33.0.1',
  ),
  createData(
    '12 Aug 2022 - 12:25 am',
    '5',
    'Web',
    'Windows',
    '102.03.33.0.1',
  ),
  createData(
    '12 Aug 2022 - 12:25 am',
    '5',
    'Web',
    'Windows',
    '102.03.33.0.1',
  ),
  createData(
    '12 Aug 2022 - 12:25 am',
    '5',
    'Web',
    'Windows',
    '102.03.33.0.1',
  ),
  createData(
    '12 Aug 2022 - 12:25 am',
    '5',
    'Web',
    'Windows',
    '102.03.33.0.1',
  ),
  createData(
    '12 Aug 2022 - 12:25 am',
    '5',
    'Web',
    'Windows',
    '102.03.33.0.1',
  ),
  createData(
    '12 Aug 2022 - 12:25 am',
    '5',
    'Web',
    'Windows',
    '102.03.33.0.1',
  ),
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
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: 'date_time',
    numeric: false,
    disablePadding: true,
    label: 'Date/Time',
  },
  {
    id: 'session',
    numeric: true,
    disablePadding: false,
    label: 'Session',
  },
  {
    id: 'type',
    numeric: true,
    disablePadding: false,
    label: 'Type',
  },
  {
    id: 'os',
    numeric: true,
    disablePadding: false,
    label: 'OS',
  },
  {
    id: 'ip',
    numeric: true,
    disablePadding: false,
    label: 'IP',
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='left'
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              hideSortIcon 
            >
              {headCell.label}
              <img src={HeaderImage} alt='sort icon' style={{ marginLeft: 5 }} />
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;
  return (
    <> </>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function DeviceTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('token_name');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(11);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.token_name);

      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
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

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage],
  );

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showSuccess('Copied to clipboard!');
    } catch (err) {
      showError('Failed to copy');
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer className='wallet-table token-table'>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby='tableTitle'
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.token_name);
                const labelId = `enhanced-table-checkbox-${index}`;

                // Define the color based on the status
                const getStatusColor = (status) => {
                  switch (status) {
                    case 'Active':
                      return '#519C66';
                    case 'Disabled':
                      return '#CC5F5F';
                    case 'Expired':
                      return '#FFCC00';
                    default:
                      return 'gray';
                  }
                };

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.token_name)}
                    role='checkbox'
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.token_name}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}

                  >
                    <TableCell padding='checkbox'>
                      <Checkbox
                        color='primary'
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component='th'
                      id={labelId}
                      scope='row'
                      padding='none'
                      className='trans-id'
                    >
                      {row.token_name}
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(row.token_name);
                        }}
                      >
                        {/* <img src={Copy} alt='copy' /> */}
                      </span>
                    </TableCell>
                    <TableCell align='left'>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {row.status}
                      </div>
                    </TableCell>
                    <TableCell align='left'>{row.qouta_used}</TableCell>
                    <TableCell align='left' className='bold'>
                      {row.qouta_bal}
                    </TableCell>
                    <TableCell align='left'>{row.created}</TableCell>
                   
                    <TableCell
                                align='left'
        >
          {row.expiration}

        </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      
    </Box>
  );
}
