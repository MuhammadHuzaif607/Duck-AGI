import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Link,
  Grid,
  Paper,
} from '@mui/material';
import Globe from './images/globe_pur.png';
import Email from './images/mail_pur.png';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
  return (
    <section className='contact-sec'>
      <Container maxWidth='lg' className='contact-container'>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box className='contact-header'>
              <h4>{t('联系我们')}</h4>
              <Typography variant='body1'>
                {t('如需支持和咨询，请通过以下方式联系我们的支持团队')}
              </Typography>
            </Box>

            <Box className='contact-section'>
              <Typography variant='subtitle1'>{t('主站接口地址')}</Typography>
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
              <Typography variant='h6'>{t('给我们留言')}</Typography>
              <form>
                <div className='contact-field'>
                  <label htmlFor=''>{t('您的电子邮件地址')}</label>
                  <input type='email' />
                </div>
                <div className='contact-field'>
                  <label htmlFor=''>{t('你的全名')}</label>
                  <input type='text' />
                </div>
                <div className='contact-field'>
                  <label htmlFor=''>{t('信息')}</label>
                  <textarea name='' id=''></textarea>
                </div>
                <div className='contact-field'>
                  <button>{t('发送消息')}</button>
                </div>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <div className='announcement'>
        <p>
        📢{' '} {t(
            '截至12/07，最新的OpenAI AI模型{a1-d8}（升级版）和{r1}-pro-all（S200-package）现已支持图像识别',
          )}
        </p>
        
      </div>
    </section>
  );
};

export default Contact;
