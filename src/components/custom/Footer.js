import React from 'react';
import Duck from '/duck.png';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';
const WebFooter = () => {
  return (
    <>
      <div style={{ marginTop: 'auto', minHeight: '50%' }}></div>
      <div className='announcementFooter'>
        The latest OpenAI AI model, {`{a1-d8}`} (upgraded version) and {`{r1}`}
        -pro-all (S200-package), now supports image recognition as of 12/07
      </div>
      <Container maxWidth='lg'>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px',
          }}
          className='footer-sec'
        >
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <img src={Duck} alt='logo'></img>
            <span style={{ fontWeight: 'bold' }}>DUCKAGI</span>
          </div>
          <div>
            <ul
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                listStyle: 'none',
              }}
            >
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

export default WebFooter;
