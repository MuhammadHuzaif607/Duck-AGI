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
          {row.submissionDateTime}
        </TableCell>
        <TableCell align='left'>{row.endTime}</TableCell>
        <TableCell align='left'>{row.type}</TableCell>
        <TableCell align='left'>{row.platform}</TableCell>
        <TableCell align='left'>{row.schedule}</TableCell>
        <TableCell align='left'>{row.spentTime}</TableCell>
        <TableCell align='left'>{row.prompt}</TableCell>
      </TableRow>
      <TableRow
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={7}
          className='child_row'
        >
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <p>
                TaskID <strong className='blue-text'>9273909s</strong>
                <span className='failure-reason'>
                  Cause Of Failure <strong>Connection Failed</strong>
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
    submissionDateTime: '12 Aug 2022 - 12:25 am',
    endTime: 5,
    type: 'My APIs',
    platform: 'AA87',
    schedule: 'A25',
    spentTime: '12 Aug 2022 - 12:25 am',
    prompt: 'Action Prompt',
  },
  {
    submissionDateTime: '12 Aug 2022 - 12:25 am',
    endTime: 5,
    type: 'My APIs',
    platform: 'AA87',
    schedule: 'A25',
    spentTime: '12 Aug 2022 - 12:25 am',
    prompt: 'Action Prompt',
  },
  {
    submissionDateTime: '12 Aug 2022 - 12:25 am',
    endTime: 5,
    type: 'My APIs',
    platform: 'AA87',
    schedule: 'A25',
    spentTime: '12 Aug 2022 - 12:25 am',
    prompt: 'Action Prompt',
  },
  {
    submissionDateTime: '12 Aug 2022 - 12:25 am',
    endTime: 5,
    type: 'My APIs',
    platform: 'AA87',
    schedule: 'A25',
    spentTime: '12 Aug 2022 - 12:25 am',
    prompt: 'Action Prompt',
  },
  {
    submissionDateTime: '12 Aug 2022 - 12:25 am',
    endTime: 5,
    type: 'My APIs',
    platform: 'AA87',
    schedule: 'A25',
    spentTime: '12 Aug 2022 - 12:25 am',
    prompt: 'Action Prompt',
  },
  {
    submissionDateTime: '12 Aug 2022 - 12:25 am',
    endTime: 5,
    type: 'My APIs',
    platform: 'AA87',
    schedule: 'A25',
    spentTime: '12 Aug 2022 - 12:25 am',
    prompt: 'Action Prompt',
  },
  {
    submissionDateTime: '12 Aug 2022 - 12:25 am',
    endTime: 5,
    type: 'My APIs',
    platform: 'AA87',
    schedule: 'A25',
    spentTime: '12 Aug 2022 - 12:25 am',
    prompt: 'Action Prompt',
  },
];

export default function TasksTable() {
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
              <TableCell>Submission Date/Time</TableCell>
              <TableCell align='left'>End Time</TableCell>
              <TableCell align='left'>Type</TableCell>
              <TableCell align='left'>Platform</TableCell>
              <TableCell align='left'>Schedule</TableCell>
              <TableCell align='left'>Spent Time</TableCell>
              <TableCell align='left'>Prompt</TableCell>
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
