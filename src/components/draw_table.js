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
import { useTranslation } from 'react-i18next';

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
        <TableCell align='left'>{row.spendTime}</TableCell>
        <TableCell align='left'>{row.type}</TableCell>
        <TableCell align='left'>{row.request}</TableCell>
        <TableCell align='left'>{row.taskId}</TableCell>
        <TableCell align='left'>{row.schedule}</TableCell>
        <TableCell align='left'>{row.result}</TableCell>
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
                PromptEN <strong>Action 003</strong>{' '}
                <span className='failure-reason'>
                  Failure reason <strong>Connection Failed</strong>
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
    spendTime: 5,
    type: 'My APIs',
    request: 'Request',
    taskId: 'A25',
    schedule: '$40,340.00',
    result: 'Action Prompt',
  },
  {
    submissionDateTime: '12 Aug 2022 - 12:25 am',
    spendTime: 5,
    type: 'My APIs',
    request: 'Request',
    taskId: 'A25',
    schedule: '$40,340.00',
    result: 'Action Prompt',
  },
  {
    submissionDateTime: '12 Aug 2022 - 12:25 am',
    spendTime: 5,
    type: 'My APIs',
    request: 'Request',
    taskId: 'A25',
    schedule: '$40,340.00',
    result: 'Action Prompt',
    remarks: 'Connection Failed',
  },
  {
    submissionDateTime: '12 Aug 2022 - 12:25 am',
    spendTime: 5,
    type: 'My APIs',
    request: 'Request',
    taskId: 'A25',
    schedule: '$40,340.00',
    result: 'Action Prompt',
  },
  {
    submissionDateTime: '12 Aug 2022 - 12:25 am',
    spendTime: 5,
    type: 'My APIs',
    request: 'Request',
    taskId: 'A25',
    schedule: '$40,340.00',
    result: 'Action Prompt',
  },
  {
    submissionDateTime: '12 Aug 2022 - 12:25 am',
    spendTime: 5,
    type: 'My APIs',
    request: 'Request',
    taskId: 'A25',
    schedule: '$40,340.00',
    result: 'Action Prompt',
  },
  {
    submissionDateTime: '12 Aug 2022 - 12:25 am',
    spendTime: 5,
    type: 'My APIs',
    request: 'Request',
    taskId: 'A25',
    schedule: '$40,340.00',
    result: 'Action Prompt',
  },
  {
    submissionDateTime: '12 Aug 2022 - 12:25 am',
    spendTime: 5,
    type: 'My APIs',
    request: 'Request',
    taskId: 'A25',
    schedule: '$40,340.00',
    result: 'Action Prompt',
  },
  {
    submissionDateTime: '12 Aug 2022 - 12:25 am',
    spendTime: 5,
    type: 'My APIs',
    request: 'Request',
    taskId: 'A25',
    schedule: '$40,340.00',
    result: 'Action Prompt',
  },
  {
    submissionDateTime: '12 Aug 2022 - 12:25 am',
    spendTime: 5,
    type: 'My APIs',
    request: 'Request',
    taskId: 'A25',
    schedule: '$40,340.00',
    result: 'Action Prompt',
  },
  {
    submissionDateTime: '12 Aug 2022 - 12:25 am',
    spendTime: 5,
    type: 'My APIs',
    request: 'Request',
    taskId: 'A25',
    schedule: '$40,340.00',
    result: 'Action Prompt',
  },
];

export default function CollapsibleTable() {
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
  const {t} = useTranslation();
  return (
    <Paper>
      <TableContainer>
        <Table aria-label='collapsible table' className='drawing-table'>
          <TableHead>
            <TableRow>
              <TableCell>{t('提交日期/时间')}</TableCell>
              <TableCell align='left'>{t('花费时间')}</TableCell>
              <TableCell align='left'>{t('类型')}</TableCell>
              <TableCell align='left'>{t('任务 ID')}</TableCell>
              <TableCell align='left'>{t('计划')}</TableCell>
              <TableCell align='left'>{t('结果')}</TableCell>
              <TableCell align='left'>{t('提示')}</TableCell>
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
