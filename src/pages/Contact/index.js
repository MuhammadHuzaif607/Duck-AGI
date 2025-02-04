import React from 'react';
import {
  Box,
  Typography,
  Container,
  Link,
  Grid,
} from '@mui/material';
import Globe from './images/globe_pur.png';
import Email from './images/mail_pur.png';
import Duck from '/duck.png';

const Contact = () => {
  return (
    <>
    <Container maxWidth='lg' className='contact-container'>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box className='contact-header'>
            <h4>Contact us</h4>
            <Typography variant='body1'>
              For support and enquiries reach out to our support team via
            </Typography>
          </Box>

          <Box className='contact-section'>
            <Typography variant='subtitle1'>
              Main station interface address
            </Typography>
            <ul>
              <li>
                <a href='#'>
                  {' '}
                  <img src={Email} alt='' />
                  support@duckapi.com
                </a>
              </li>
              <li>
                <a href='#'>
                  <img src={Globe} alt='' />
                  support@duckapi.com
                </a>
              </li>
            </ul>
            <Typography variant='subtitle1'>API</Typography>
            <ul style={{ paddingBottom: '0px' }}>
              <li>
                <a href='#'>https://api.duckapi.com</a>
              </li>
              <li>
                <a href='#'>https://api.duckapi.com/v1</a>
              </li>
              <li>
                <a href='#'>https://api.duckapi.com/chat/completions</a>
              </li>
            </ul>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box className='contact-form'>
            <Typography variant='h6'>Drop us a message</Typography>
            <form>
              <div className='contact-field'>
                <label htmlFor=''>Your Email address</label>
                <input type='email' />
              </div>
              <div className='contact-field'>
                <label htmlFor=''>Your Full Name</label>
                <input type='text' />
              </div>
              <div className='contact-field'>
                <label htmlFor=''>Message</label>
                <textarea name='' id=''></textarea>
              </div>
              <div className='contact-field'>
                <button>Send Message</button>
              </div>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>

        <div className='announcementFooter'>
          The latest OpenAI AI model, {{a1-d8}} (upgraded version) and{' '}
          {{r1}}
          -pro-all (S200-package), now supports image recognition as of 12/07
        </div>
        <Container maxWidth='lg'> 
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px'}}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center'}}>
          <img src={Duck} alt='logo'></img>
          <span style={{ fontWeight: 'bold'}}>DUCKAGI</span>
          </div>
          <div>
            <ul style={{ display: 'flex', alignItems: 'center', gap: '20px', listStyle: 'none'}}>
              <li>
              <Link to={'/'}>Home</Link>
              </li>
              <li>
              <Link to={'/token'}>Console</Link>
              </li>
              <li>
              <Link to={'/pricing'}>Pricing</Link>             
              </li>
              <li>
              <Link>Documentation</Link>
              </li>
              <li>
              <Link to={'/about'}>About</Link> 
              </li>
            </ul>
          </div>
        </div>   
        </Container> 
</>
  );
};

export default Contact;