import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Tick from '../images/verify-tick.png';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow
        sx={{ '& > *': { borderBottom: 'unset' } }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <TableCell component='th' scope='row'>
          {row.available ? (
            <img src={Tick} alt='tick' />
          ) : (
            <img src='' alt='cross' />
          )}
        </TableCell>
        <TableCell align='left'>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                display: 'inline-block',
                width: ' 4px',
                height: ' 14px',
                backgroundColor: ' #519C66',
                marginRight: ' 8px',
                borderRadius: ' 15px',
              }}
            ></span>
            {row.model}
          </div>
        </TableCell>
        <TableCell align='left'>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                display: 'inline-block',
                width: ' 4px',
                height: ' 14px',
                backgroundColor: ' #AF52DE',
                marginRight: ' 8px',
                borderRadius: ' 15px',
              }}
            ></span>
            {row.billingType}
          </div>
        </TableCell>
        <TableCell align='left'>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {row.groups.map((group, index) => (
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: ' 4px',
                    height: ' 14px',
                    backgroundColor: `${group === 'default' ? '#6175DE' : '#FFCC00'}`,
                    marginRight: ' 8px',
                    borderRadius: ' 15px',
                  }}
                ></span>
                {group}
              </div>
            ))}
          </div>
        </TableCell>
      </TableRow>
      <TableRow
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={7}
          className='child-row'
        >
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <p>
                Completion
                <strong>
                  Model ratio：0.25 | Completion ratio：3 | Group ratio：1
                </strong>
                <span className='failure-reason'>
                  Model Price{' '}
                  <strong>
                    Prompt $0.5 / 1M tokens | Completion $1.5 / 1M tokens
                  </strong>
                </span>
              </p>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    submissionDateTime: PropTypes.string.isRequired,
    spendTime: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    request: PropTypes.string.isRequired,
    taskId: PropTypes.string.isRequired,
    schedule: PropTypes.string.isRequired,
    result: PropTypes.string.isRequired,
    remarks: PropTypes.string,
  }).isRequired,
};

const rows = [
  {
    id: 1,
    model: 'gto-3.5-turbo',
    available: true,

    billingType: 'pay-as-you-go',
    groups: ['default', 'token-billing'],
  },
  {
    id: 2,
    available: true,
    model: 'gto-3.5-turbo',
    billingType: 'pay-as-you-go',
    groups: ['default', 'token-billing'],
  },
  {
    id: 3,
    available: true,
    model: 'gto-3.5-turbo',
    billingType: 'pay-as-you-go',
    groups: ['default', 'token-billing'],
  },
  {
    id: 4,
    available: true,
    model: 'gto-3.5-turbo',
    billingType: 'pay-as-you-go',
    groups: ['default', 'token-billing'],
  },
  {
    id: 5,
    available: true,
    model: 'gto-3.5-turbo',
    billingType: 'pay-as-you-go',
    groups: ['default', 'token-billing'],
  },
  {
    id: 6,
    available: true,
    model: 'gto-3.5-turbo',
    billingType: 'pay-as-you-go',
    groups: ['default', 'token-billing'],
  },
  {
    id: 7,
    available: true,
    model: 'gto-3.5-turbo',
    billingType: 'pay-as-you-go',
    groups: ['default', 'token-billing'],
  },
  {
    id: 8,
    available: true,
    model: 'gto-3.5-turbo',
    billingType: 'pay-as-you-go',
    groups: ['default', 'token-billing'],
  },
];

export default function PricingTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const currentPageRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );
  return (
    <Paper>
      <TableContainer>
        <Table aria-label='collapsible table' className='drawing-table'>
          <TableHead>
            <TableRow>
              <TableCell>Availability</TableCell>
              <TableCell align='left'>Model</TableCell>
              <TableCell align='left'>Billing Type</TableCell>
              <TableCell align='left'>Available Groups</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <Row key={index} row={row} />
            ))}
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
  );
}
