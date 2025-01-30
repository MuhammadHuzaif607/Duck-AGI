import React, { useEffect, useState } from 'react';
import { API, showError } from '../../helpers';
import { marked } from 'marked';
import { Layout } from '@douyinfe/semi-ui';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import DashboardImage from './images/about-1.png';
import InnovationImage from './images/about-2.png';

const About = () => {
  return (
    <div className='hero-container'>
      {/* First Section */}
      <Container maxWidth='lg'>
        <Grid container spacing={4} className='hero-section'>
          <Grid xs={12} md={6} className='content-left'>
            <div className='about-sec'>
              <Typography variant='h1'>
                We are Duck <span>AGI</span>
              </Typography>
              <Typography variant='body1'>
                At DuckAGI, we strive to harness the power of artificial
                intelligence to simplify complex processes and make the
                impossible possible. Our mission is to create cutting-edge AGI
                technologies and breakthrough solutions that seamlessly
                integrate with everyday life, empowering individuals and
                businesses to achieve more with less effort.
              </Typography>
              <div className='button-group'>
                <button className='btn'>Create an account</button>
                <button className='sec-button'>See Pricing</button>
              </div>
            </div>
          </Grid>
          <Grid xs={12} md={6} className='image-container'>
            <img src={DashboardImage} alt='Dashboard' className='hero-image' />
          </Grid>
        </Grid>

        {/* Second Section */}
        <Grid container spacing={4} className='hero-section reverse'>
          <Grid xs={12} md={6} className='image-container'>
            <img
              src={InnovationImage}
              alt='Innovation'
              className='hero-image innovation'
            />
          </Grid>
          <Grid xs={12} md={6} className='content-right'>
            <div className='about-sec'>
              <Typography variant='h2'>
                Driven by Innovation & AI Data
              </Typography>
              <Typography variant='body1' className='hero-description'>
                We are driven by innovation, guided by a commitment to ethical
                AI, and inspired by the transformative potential of technology.
                DuckAGI's platform is designed to be intuitive, adaptive, and
                reliable, addressing diverse needs across industries with
                precision and efficiency.
              </Typography>
              <Typography variant='body1' className='hero-description'>
                Whether you're automating workflows, optimizing decision-making,
                or exploring new frontiers of creativity, DuckAGI is here to
                support your journey. Together, we're shaping a smarter, more
                connected future.
              </Typography>
              <div className='button-group'>
                <button className='sec-button'>See Pricing</button>
                <button className='btn'>Create an account</button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default About;
