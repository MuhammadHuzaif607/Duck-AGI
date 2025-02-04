import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Layout, Card, Col, Row } from '@douyinfe/semi-ui';
import { useTranslation } from 'react-i18next';
import { StyleContext } from '../../context/Style';
import { Button, Grid, TextField, Typography } from '@mui/material';
import line from '../../../public/line.svg';
import { IoIosArrowDown } from 'react-icons/io';
import User from './images/user-img.png';
import Message from './images/Frame 6367.png';
import Github from './images/image (3).png';
import Wechat from './images/image (2).png';
import Telegram from './images/image (1).png';
import TelegramCopy from './images/image.png';
import { FaCheck, FaChevronDown, FaEnvelope, FaPhone, FaUser } from 'react-icons/fa';
import FilterModal from '../Token_example/_components/FilterModal';
import { IoSearch } from 'react-icons/io5';
import Download from '/download.png';
import Down from './images/fi_chevron-down.png';
import DeviceTable from './Operation/DeviceTable';

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
              <Card className='panel-desc-card'  style={{ backgroundColor: '#f5f6f8'}}>
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
          <Grid container spacing={4} marginTop={2}>
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
            <Grid item lg={6} xs={12}>
            <Card className='panel-desc-card ' style={{ backgroundColor: '#f5f6f8', minHeight: '420px', display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '20px', gap: '10px' }}>
                <div style={{ display: 'flex', padding: '5px 8px', borderRadius: '25%', backgroundColor: '#f0f0f0', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#b0b2b8'}}>
                      ID
                    </span>
                    <span style={{ color: '#007aff'}}>
                      14930
                    </span>
                </div>
                <div style={{ display: 'flex', padding: '5px 8px', borderRadius: '25%', backgroundColor: '#f0f0f0', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#b0b2b8'}}>
                    Joined since 
                    </span>
                    <span style={{ color: '#007aff'}}>
                    12 Nov 2024
                    </span>
                </div>

                <div style={{ display: 'flex', padding: '5px 8px', borderRadius: '25%', backgroundColor: '#f0f0f0', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#b0b2b8'}}>
                    Type 
                    </span>
                    <span style={{ color: '#007aff'}}>
                    Normal
                    </span>
                </div>
              </div>

              <div>
                <h1 style={{ color: '#b0b2b8', fontSize: '18px'}}>
                Personal Infomation
                </h1>

              </div>

              <div style={{ display: 'flex', flexDirection: 'column', margin: '20px 0px', alignItems: 'center', gap: '10px' }}>
                 <div style={{ backgroundColor: '#ffffff', padding: '10px', borderRadius: '10px', width: '100%', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'space-between' }}>
                 <div style={{ display: 'flex', gap: '10px', alignItems: 'center'}}>
                    <div>
                      <img src={Message} alt='message'/>
                    </div>
                    <div>
                      <p style={{ paddingBottom: '4px'}}>
                      Mail
                      </p>
                    </div>
                    </div>
   
   <div style={{ display: 'flex', gap: '10px', alignItems: 'center'}}>
<div>
  <p>Not Bound</p>
</div>
<div style={{ color: '#3c99ff', backgroundColor: '#f0f7ff', padding: '5px', borderRadius: '25%',  }}>
  <p>Bind</p>
</div>
</div>    
                    
                 </div>


                 <div style={{ backgroundColor: '#ffffff', padding: '10px', borderRadius: '10px', width: '100%', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'space-between' }}>
                 <div style={{ display: 'flex', gap: '10px', alignItems: 'center'}}>
                    <div>
                      <img src={Github} alt='message'/>
                    </div>
                    <div>
                      <p style={{ paddingBottom: '4px'}}>
                      Git Hub
                      </p>
                    </div>
                    <div>
                      <p style={{ marginLeft: '10px', fontSize: '12px'}}>
                      Not Enabled
                      </p>
                    </div>
                    </div>                  
                 </div>

                 <div style={{ backgroundColor: '#ffffff', padding: '10px', borderRadius: '10px', width: '100%', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'space-between' }}>
                 <div style={{ display: 'flex', gap: '10px', alignItems: 'center'}}>
                    <div>
                      <img src={Wechat} alt='message'/>
                    </div>
                    <div>
                      <p style={{ paddingBottom: '4px'}}>
                      WeChat
                      </p>
                    </div>
                    <div>
                      <p style={{ marginLeft: '10px', fontSize: '12px'}}>
                      Not Enabled
                      </p>
                    </div>
                    </div>                  
                 </div>

                 <div style={{ backgroundColor: '#ffffff', padding: '10px', borderRadius: '10px', width: '100%', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'space-between' }}>
                 <div style={{ display: 'flex', gap: '10px', alignItems: 'center'}}>
                    <div>
                      <img src={Telegram} alt='message'/>
                    </div>
                    <div>
                      <p style={{ paddingBottom: '4px'}}>
                      Telegram
                      </p>
                    </div>
                    <div>
                      <p style={{ marginLeft: '10px', fontSize: '12px'}}>
                      Not Enabled
                      </p>
                    </div>
                    </div>                  
                 </div>

                 <div style={{ backgroundColor: '#ffffff', padding: '10px', borderRadius: '10px', width: '100%', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'space-between' }}>
                 <div style={{ display: 'flex', gap: '10px', alignItems: 'center'}}>
                    <div>
                      <img src={TelegramCopy} alt='message'/>
                    </div>
                    <div>
                      <p style={{ paddingBottom: '4px'}}>
                      Telegram
                      </p>
                    </div>
                    <div>
                      <p style={{ marginLeft: '10px', fontSize: '12px'}}>
                      Not Enabled
                      </p>
                    </div>
                    </div>                  
                 </div>


              </div>

            </Card>
            </Grid>
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h1 style={{ fontSize: '20px'}}>KYC Verification</h1>
              <Button variant="contained" style={{ backgroundColor: '#6175de', color: '#ffffff', borderRadius: '5px', fontWeight: 'bold' }}>
                Save
                </Button>  
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>

    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      alignItems: 'center',
      border: '2px solid green', // Green outline
      borderRadius: '8px',       // Border radius of 8px
      padding: '20px',
      width: '400px',            // Adjust width
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' // Optional for some shadow
    }}>
      {/* First Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between', // Ensures icons are on opposite sides
        alignItems: 'center',
        width: '100%' // Make sure the section takes up full width
      }}>
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <FaPhone size={16} style={{ alignSelf: 'start', marginTop: '2px', marginRight: '5px'}} color="black" />
          <div>
            <span style={{ fontWeight: 'bold' }}>Phone number</span>
            <div>+1 32 3999234</div>
          </div>
        </div>
        <FaCheck size={20} color="green" />
      </div>

      {/* Second Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-start', // Aligns the date to the left
        width: '100%', // Full width for the date section
        marginTop: '10px'
      }}>
        <span>Date: 12 Nov 2024 12:24 am</span>
      </div>
    </div>

    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      alignItems: 'center',
      border: '2px solid green', // Green outline
      borderRadius: '8px',       // Border radius of 8px
      padding: '20px',
      width: '400px',            // Adjust width
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' // Optional for some shadow
    }}>
      {/* First Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between', // Ensures icons are on opposite sides
        alignItems: 'center',
        width: '100%' // Make sure the section takes up full width
      }}>
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <FaEnvelope size={16} style={{ alignSelf: 'start', marginTop: '2px', marginRight: '5px'}} color="black" />
          <div>
            <span style={{ fontWeight: 'bold' }}>Email</span>
            <div>+1 32 3999234</div>
          </div>
        </div>
        <FaCheck size={20} color="green" />
      </div>

      {/* Second Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-start', // Aligns the date to the left
        width: '100%', // Full width for the date section
        marginTop: '10px'
      }}>
        <span>Date: 12 Nov 2024 12:24 am</span>
      </div>
    </div>

    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      alignItems: 'center',
      border: '2px solid green', // Green outline
      borderRadius: '8px',       // Border radius of 8px
      padding: '20px',
      width: '400px',            // Adjust width
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' // Optional for some shadow
    }}>
      {/* First Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between', // Ensures icons are on opposite sides
        alignItems: 'center',
        width: '100%' // Make sure the section takes up full width
      }}>
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <FaUser size={16} style={{ alignSelf: 'start', marginTop: '2px', marginRight: '5px'}} color="black" />
          <div>
            <span style={{ fontWeight: 'bold' }}>Facial Verification</span>
            <div style={{ color: '#409bff'}}>Download photo</div>
          </div>
        </div>
        <FaCheck size={20} color="green" />
      </div>

      {/* Second Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-start', // Aligns the date to the left
        width: '100%', // Full width for the date section
        marginTop: '10px'
      }}>
        <span>Date: 12 Nov 2024 12:24 am</span>
      </div>
    </div>

              </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          
          <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h1 style={{ fontSize: '20px'}}>Devices</h1>
              <Button variant="contained" style={{ backgroundColor: '#6175de', color: '#ffffff', borderRadius: '5px', fontWeight: 'bold' }}>
                Save
                </Button>  
              </div>


        <Row
          gutter={{ xs: 16, sm: 16, md: 16, lg: 24, xl: 24, xxl: 24 }}
          style={{ marginTop: 20 }}
          type='flex'
          justify='space-between'
          className='search-bar'
        >
          <Col className='search-actions'>
            <form action='' className='search-bar'>
              <IoSearch width={30} height={30} />
              <input type='text' placeholder='Search devices' />
            </form>
             
            <FilterModal />
            <button type='button' className='download-btn'>
              <img src={Download} alt='' />
            </button>

            <button type='button' className='download-btn'>
              Bulk Action 
              <img src={Down} alt='' style={{ marginLeft: '8px', paddingTop: '3px' }} />
            </button>
          </Col>
        </Row>

        
        <DeviceTable />

          </div>
        </CustomTabPanel>
      </Box>
    </Layout>
  );
}
