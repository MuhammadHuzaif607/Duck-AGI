import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Layout, Card } from '@douyinfe/semi-ui';
import { useTranslation } from 'react-i18next';
import { StyleContext } from '../../context/Style';
import { Grid, TextField, Typography } from '@mui/material';
import line from '../../../public/line.svg';
import { IoIosArrowDown } from 'react-icons/io';
import User from './images/user-img.png';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [styleState, styleDispatch] = React.useContext(StyleContext);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { t } = useTranslation();

  return (
    <Layout>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='basic tabs example'
          >
            <Tab label='Account Settings' {...a11yProps(0)} />
            <Tab label='KYC Verification' {...a11yProps(1)} />
            <Tab label='Devices' {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0} className='p-0'>
          <Grid container spacing={4}>
            <Grid item lg={6} xs={12}>
              <Card className='panel-desc-card balance'>
                <div className='title'>
                  <h3>Account Summary</h3>
                </div>
                <div className='stats'>
                  <div className='stat w-1/3'>
                    <h4>Current Bal</h4>
                    <p> $12,030.00</p>
                  </div>
                  <div className='stat w-1/3'>
                    <h4>Consumption</h4>
                    <div className='detail-stat'>
                      <p> $20,040.00</p>
                    </div>
                  </div>
                  <div className='stat w-1/3'>
                    <h4>Requests</h4>
                    <div className='detail-stat'>
                      <p>
                        {' '}
                        1.1K <span>+56%</span>{' '}
                      </p>
                    </div>
                  </div>
                </div>
                <div className='line'>
                  <img src={line} alt='' />
                </div>
              </Card>
            </Grid>
            <Grid item lg={6} xs={12}>
              <Card className='panel-desc-card '>
                <div className='title'>
                  <h3>Invites</h3>
                  <div class='arrow'>
                    <p>This Week</p>
                    <IoIosArrowDown className='ml-2' />
                  </div>
                </div>

                <div className='stats'>
                  <div className='stat w-1/3'>
                    <h4>Proceeds To be used</h4>
                    <p> $12,204.00</p>
                  </div>
                  <div className='stat w-1/3'>
                    <h4>Total Rev</h4>
                    <div className='detail-stat'>
                      <p> $95,594.44</p>
                    </div>
                  </div>
                  <div className='stat w-1/3'>
                    <h4>Count</h4>
                    <div className='detail-stat'>
                      <p>
                        2K <span>+0.00%</span>{' '}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item lg={6} xs={12}>
              <div className='user-info'>
                <div className='user-img'>
                  <img src={User} alt='' />
                </div>
                <form>
                  <div class='contact-field'>
                    <label for=''>First Name</label>
                    <input type='text'></input>
                  </div>
                  <div class='contact-field'>
                    <label for=''>Last Name</label>
                    <input type='text'></input>
                  </div>
                  <div class='contact-field'>
                    <label for=''>Other(optional)</label>
                    <input type='text'></input>
                  </div>
                  <div class='contact-field'>
                    <label for=''>Email address</label>
                    <input type='email'></input>
                  </div>
                </form>
              </div>
            </Grid>
            <Grid item lg={6} xs={12}></Grid>
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          KYC Verification
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Devices
        </CustomTabPanel>
      </Box>
    </Layout>
  );
}
