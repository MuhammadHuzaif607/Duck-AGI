// import * as React from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Tabs,
//   Tab,
//   Box,
//   TextField,
//   Select,
//   MenuItem,
//   Typography,
//   InputAdornment,
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import Filter from '/filter.png';

// const StyledDialog = styled(Dialog)(({ theme }) => ({
//   '& .MuiDialog-paper': {
//     borderRadius: '12px',
//     minWidth: '400px',
//   },
// }));

// const StyledTab = styled(Tab)({
//   textTransform: 'none',
//   fontSize: '14px',
//   fontWeight: 'normal',
//   '&.Mui-selected': {
//     color: '#4318FF',
//     fontWeight: '500',
//   },
// });

// const StyledTextField = styled(TextField)({
//   '& .MuiOutlinedInput-root': {
//     borderRadius: '8px',
//   },
// });

// export default function FilterModal() {
//   const [open, setOpen] = React.useState(false);
//   const [tabValue, setTabValue] = React.useState(0);
//   const [status, setStatus] = React.useState('all');

//   const handleClickOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const handleTabChange = (event, newValue) => setTabValue(newValue);

//   return (
//     <>
//       <Button
//         variant='outlined'
//         onClick={handleClickOpen}
//         className='filter-btn'
//       >
//         Filter
//         <img src={Filter} alt='' />
//       </Button>

//       <StyledDialog open={open} onClose={handleClose}>
//         <Box sx={{ p: 3 }}>
//           <DialogTitle sx={{ p: 0, mb: 2 }}>
//             <Typography variant='h6' sx={{ fontWeight: 600 }}>
//               Filter By
//             </Typography>
//           </DialogTitle>

//           <DialogContent sx={{ p: 0 }}>
//             <Tabs
//               value={tabValue}
//               onChange={handleTabChange}
//               sx={{
//                 borderBottom: 1,
//                 borderColor: 'divider',
//                 mb: 3,
//               }}
//             >
//               <StyledTab label='Parameters' />
//               <StyledTab label='Date' />
//             </Tabs>

          //   <Box sx={{ mb: 3 }}>
          //     <Typography sx={{ mb: 1, fontSize: '14px' }}>Status</Typography>
          //     <Select
          //       fullWidth
          //       value={status}
          //       onChange={(e) => setStatus(e.target.value)}
          //       size='small'
          //       sx={{ borderRadius: '8px' }}
          //     >
          //       <MenuItem value='all'>All</MenuItem>
          //       <MenuItem value='active'>Active</MenuItem>
          //       <MenuItem value='inactive'>Inactive</MenuItem>
          //     </Select>
          //   </Box>

          //   <Typography sx={{ mb: 1, fontSize: '14px' }}>Quota Used</Typography>
          //   <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          //     <StyledTextField
          //       size='small'
          //       placeholder='From'
          //       InputProps={{
          //         startAdornment: (
          //           <InputAdornment position='start'>$</InputAdornment>
          //         ),
          //       }}
          //       defaultValue='0.00'
          //     />
          //     <StyledTextField
          //       size='small'
          //       placeholder='To'
          //       InputProps={{
          //         startAdornment: (
          //           <InputAdornment position='start'>$</InputAdornment>
          //         ),
          //       }}
          //       defaultValue='0.00'
          //     />
          //   </Box>

          //   <Typography sx={{ mb: 1, fontSize: '14px' }}>Quota Left</Typography>
          //   <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          //     <StyledTextField
          //       size='small'
          //       placeholder='From'
          //       InputProps={{
          //         startAdornment: (
          //           <InputAdornment position='start'>$</InputAdornment>
          //         ),
          //       }}
          //       defaultValue='0.00'
          //     />
          //     <StyledTextField
          //       size='small'
          //       placeholder='To'
          //       InputProps={{
          //         startAdornment: (
          //           <InputAdornment position='start'>$</InputAdornment>
          //         ),
          //       }}
          //       defaultValue='0.00'
          //     />
          //   </Box>

          //   <LocalizationProvider dateAdapter={AdapterDayjs}>
          //     <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          //       <DatePicker
          //         label='Created'
          //         slotProps={{ textField: { size: 'small' } }}
          //         sx={{ flex: 1 }}
          //       />
          //       <DatePicker
          //         label='Expiration'
          //         slotProps={{ textField: { size: 'small' } }}
          //         sx={{ flex: 1 }}
          //       />
          //     </Box>
          //   </LocalizationProvider>
          // </DialogContent>

//           <DialogActions sx={{ p: 0, mt: 2 }}>
//             <Button
//               fullWidth
//               variant='contained'
//               onClick={handleClose}
//               sx={{
//                 textTransform: 'none',
//                 backgroundColor: '#4318FF',
//                 borderRadius: '8px',
//                 py: 1.5,
//               }}
//             >
//               Filter
//             </Button>
//           </DialogActions>
//         </Box>
//       </StyledDialog>
//     </>
//   );
// }

import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
  Box,
  TextField,
  Select,
  MenuItem,
  Typography,
  InputAdornment,
  Checkbox,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Filter from '/filter.png';
import { t } from 'i18next';
import DateCalendarValue from './DateModal';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '12px',
    minWidth: '400px',
  },
}));

const StyledTab = styled(Tab)({
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: 'normal',
  '&.Mui-selected': {
    color: '#4318FF',
    fontWeight: '500',
  },
});

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
  },
});

export default function FilterModal() {
  const [open, setOpen] = React.useState(false);
  const [tabValue, setTabValue] = React.useState(0);
  const [status, setStatus] = React.useState('all');
  const [dateFilters, setDateFilters] = React.useState({
    thisWeek: false,
    lastWeek: false,
    thisMonth: false,
    lastMonth: false,
    thisYear: false,
    lastYear: false,
    dateRange: false,
  });
  const [select, setSelect] = React.useState(false);
  const [value, setValue] = React.useState(Date.now());
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleTabChange = (event, newValue) => setTabValue(newValue);
  const handleCheckboxChange = (event) => {
    setDateFilters({ ...dateFilters, [event.target.name]: event.target.checked });
  };

  return (
    <>
      <button variant='outlined' onClick={handleClickOpen} className='filter-btn'>
      <img src={Filter} alt='filter' />
        {/* Filter */}
        {t('筛选')}
      </button>
      <StyledDialog open={open} onClose={handleClose}>
        <Box sx={{ p: 3 }}>
          <DialogTitle sx={{ p: 0, mb: 2 }}>
            <Typography variant='h6' sx={{ fontWeight: 600 }}>Filter By</Typography>
          </DialogTitle>

          <DialogContent sx={{ p: 0 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
            >
              <StyledTab label='Parameters' />
              <StyledTab label='Date' />
            </Tabs>

            {tabValue === 0 && (
<>
        
              <Box sx={{ mb: 3 }}>
              <Typography sx={{ mb: 1, fontSize: '14px' }}>Status</Typography>
              <Select
                fullWidth
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                size='small'
                sx={{ borderRadius: '8px' }}
              >
                <MenuItem value='all'>All</MenuItem>
                <MenuItem value='active'>Active</MenuItem>
                <MenuItem value='inactive'>Inactive</MenuItem>
              </Select>
            </Box>

            <Typography sx={{ mb: 1, fontSize: '14px' }}>Quota Used</Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <StyledTextField
                size='small'
                placeholder='From'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>$</InputAdornment>
                  ),
                }}
                defaultValue='0.00'
                sx={{ flex: 1 }}
              />
              <StyledTextField
                size='small'
                placeholder='To'
                
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>$</InputAdornment>
                  ),
                }}
                sx={{ flex: 1 }}
                defaultValue='0.00'
              />
            </Box>

            <Typography sx={{ mb: 1, fontSize: '14px' }}>Quota Left</Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <StyledTextField
                size='small'
                placeholder='From'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>$</InputAdornment>
                  ),
                }}
                sx={{ flex: 1 }}
                defaultValue='0.00'
              />
              <StyledTextField
                size='small'
                placeholder='To'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>$</InputAdornment>
                  ),
                }}
                sx={{ flex: 1 }}
                defaultValue='0.00'
              />
            </Box>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
                <DatePicker
                  label='Created'
                  slotProps={{ textField: { size: 'small' } }}
                  sx={{ flex: 1 }}
                />
                <DatePicker
                  label='Expiration'
                  slotProps={{ textField: { size: 'small' } }}
                  sx={{ flex: 1 }}
                />
              </Box>
            </LocalizationProvider>
         

          </>
            )}

{tabValue === 1 && (
              <Box>
                {[
                  ['thisWeek', 'This Week', 'lastWeek', 'Last Week'],
                  ['thisMonth', 'This Month', 'lastMonth', 'Last Month'],
                  ['thisYear', 'This Year', 'lastYear', 'Last Year'],
                ].map(([leftKey, leftLabel, rightKey, rightLabel]) => (
                  <Box key={leftKey} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Checkbox
                      checked={dateFilters[leftKey]}
                      onChange={handleCheckboxChange}
                      name={leftKey}
                    />
                    <Typography sx={{ flex: 1, textAlign: 'start' }}>{leftLabel}</Typography>
                    <Checkbox
                      checked={dateFilters[rightKey]}
                      onChange={handleCheckboxChange}
                      name={rightKey}
                    />
                    <Typography sx={{ textAlign: 'start' }}>{rightLabel}</Typography>
                  </Box>
                ))}

                <hr style={{ margin: '16px 0' }} />
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Checkbox
                    checked={dateFilters.dateRange}
                    onChange={() => {
                      handleCheckboxChange
                      setSelect(!select)
                    }
                  }
                    name='dateRange'
                  />
                  <Typography sx={{ flex: 1, textAlign: 'start' }}>Date Range</Typography>
                </Box>
                {
                  select && (
                    <DateCalendarValue />
                  )
                }
              </Box>
            )}
          </DialogContent>

          <DialogActions sx={{ p: 0, mt: 2 }}>
            <Button
              fullWidth
              variant='contained'
              onClick={handleClose}
              sx={{ textTransform: 'none', backgroundColor: '#4318FF', borderRadius: '8px', py: 1.5 }}
            >
              Filter
            </Button>
          </DialogActions>
        </Box>
      </StyledDialog>
    </>
  );
}
