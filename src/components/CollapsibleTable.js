import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(Date, Token, Group, Type, Model, Spent, Prompt) {
  return {
    Date,
    Token,
    Group,
    Type,
    Model,
    Spent,
    Prompt,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.Date}
        </TableCell>
        <TableCell align='left'>{row.Token}</TableCell>
        <TableCell align='left'>{row.Group}</TableCell>
        <TableCell align='left'>{row.Type}</TableCell>
        <TableCell align='left'>{row.Model}</TableCell>
        <TableCell align='left'>{row.Spent}</TableCell>
        <TableCell align='left'>{row.Prompt}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Completion <strong>12-Aug-2022 12:25 am</strong> Details{' '}
                <strong>Request successfully completed </strong>
              </Typography>
              {/*
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align='right'>Amount</TableCell>
                    <TableCell align='right'>Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component='th' scope='row'>
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align='right'>{historyRow.amount}</TableCell>
                      <TableCell align='right'>
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table> */}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData(
    '12 Aug 2022 - 12:25 am',
    5,
    'My APIs',
    'Request',
    'A25',
    40340.0,
    'Action Prompt',
  ),
  createData(
    '12 Aug 2022 - 12:25 am',
    5,
    'My APIs',
    'Request',
    'A25',
    40340.0,
    'Action Prompt',
  ),
  createData(
    '12 Aug 2022 - 12:25 am',
    5,
    'My APIs',
    'Request',
    'A25',
    40340.0,
    'Action Prompt',
    'Request successfully completed',
  ),
  createData(
    '12 Aug 2022 - 12:25 am',
    5,
    'My APIs',
    'Request',
    'A25',
    40340.0,
    'Action Prompt',
  ),
  createData(
    '12 Aug 2022 - 12:25 am',
    5,
    'My APIs',
    'Request',
    'A25',
    40340.0,
    'Action Prompt',
  ),
  createData(
    '12 Aug 2022 - 12:25 am',
    5,
    'My APIs',
    'Request',
    'A25',
    40340.0,
    'Action Prompt',
  ),
  createData(
    '12 Aug 2022 - 12:25 am',
    5,
    'My APIs',
    'Request',
    'A25',
    40340.0,
    'Action Prompt',
  ),
  createData(
    '12 Aug 2022 - 12:25 am',
    5,
    'My APIs',
    'Request',
    'A25',
    40340.0,
    'Action Prompt',
  ),
  createData(
    '12 Aug 2022 - 12:25 am',
    5,
    'My APIs',
    'Request',
    'A25',
    40340.0,
    'Action Prompt',
  ),
  createData(
    '12 Aug 2022 - 12:25 am',
    5,
    'My APIs',
    'Request',
    'A25',
    40340.0,
    'Action Prompt',
  ),
  createData(
    '12 Aug 2022 - 12:25 am',
    5,
    'My APIs',
    'Request',
    'A25',
    40340.0,
    'Action Prompt',
  ),
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Date/Time</TableCell>
            <TableCell align='left'>Tokens</TableCell>
            <TableCell align='left'>Group</TableCell>
            <TableCell align='left'>Type</TableCell>
            <TableCell align='left'>Model</TableCell>
            <TableCell align='left'>Spent</TableCell>
            <TableCell align='left'>Prompt</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
