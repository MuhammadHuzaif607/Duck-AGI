import React, { useContext, useEffect } from 'react';
import { API, showError, showNotice, timestamp2string } from '../../helpers';
import { StatusContext } from '../../context/Status';
import { marked } from 'marked';
import { useTranslation } from 'react-i18next';
import DashboardImage from './images/hero-img.png';
import ModelImage from './images/model-img.png';
import { Container, Typography, Grid, Box } from '@mui/material';
import Contact from '../Contact/index.js';
import FAQ from './_components/FAQ.js';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Gift from './images/black_gift.png';
import Zap from './images/zap.png';
import Bag from './images/bag.png';
import Chart from './images/pie_chart.png';
import ApiFast from './images/msg.png';
import Light from './images/light.png';
import Dashboar2 from './images/dashboard-2.png';
import { FaArrowRight } from 'react-icons/fa';

const Home = () => {
  const { t, i18n } = useTranslation();
  const [statusState] = useContext(StatusContext);

  const displayNotice = async () => {
    const res = await API.get('/api/notice');
    const { success, message, data } = res.data;
    if (success) {
      let oldNotice = localStorage.getItem('notice');
      if (data !== oldNotice && data !== '') {
        const htmlNotice = marked(data);
        showNotice(htmlNotice, true);
        localStorage.setItem('notice', data);
      }
    } else {
      showError(message);
    }
  };

  const displayHomePageContent = async () => {
    setHomePageContent(localStorage.getItem('home_page_content') || '');
    const res = await API.get('/api/home_page_content');
    const { success, message, data } = res.data;
    if (success) {
      let content = data;
      if (!data.startsWith('https://')) {
        content = marked.parse(data);
      }
      setHomePageContent(content);
      localStorage.setItem('home_page_content', content);

      // 如果内容是 URL，则发送主题模式
      if (data.startsWith('https://')) {
        const iframe = document.querySelector('iframe');
        if (iframe) {
          const theme = localStorage.getItem('theme-mode') || 'light';
          // 测试是否正确传递theme-mode给iframe
          // console.log('Sending theme-mode to iframe:', theme);
          iframe.onload = () => {
            iframe.contentWindow.postMessage({ themeMode: theme }, '*');
            iframe.contentWindow.postMessage({ lang: i18n.language }, '*');
          };
        }
      }
    } else {
      showError(message);
      setHomePageContent('加载首页内容失败...');
    }
    setHomePageContentLoaded(true);
  };

  const getStartTimeString = () => {
    const timestamp = statusState?.status?.start_time;
    return statusState.status ? timestamp2string(timestamp) : '';
  };

  useEffect(() => {
    displayNotice().then();
    displayHomePageContent().then();
  });

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className='home'>
        <div className='announcement'>
          {t(
            '截至12/07，最新的OpenAI AI模型{a1-d8}（升级版）和{r1}-pro-all（S200-package）现已支持图像识别',
          )}
        </div>
        <section className='hero'>
          <div className='content'>
            <h1>
              {t('新加坡简化数据')} <br /> Duck
              <span>AGI</span>
            </h1>

            <p>
              {t(
                '借助 Singapore DuckAG 的无缝智能解决方案，将复杂数据转化为可行的见解',
              )}
            </p>

            <div className='actions'>
              <button variant='contained' className='btn'>
                {t('创建一个帐户')}
              </button>
              <button variant='outlined' className='sec-button'>
                {t('查看定价')}
              </button>
            </div>

            <div className='dashboard-preview'>
              <img src={DashboardImage} alt='DuckAGI Dashboard' />
            </div>
          </div>
        </section>
        <section className='model-section'>
          <Container maxWidth='lg'>
            <Grid container spacing={6}>
              <Grid xs={12} md={12}>
                <div>
                  <Typography component='h2'>
                    <span>BIG</span>
                    <br />
                    MODEL
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <Grid container gap={10} justifyContent={'space-between'}>
              <Grid xs={12} md={6}>
                <div className='model-image'>
                  <img src={ModelImage} alt='3D Model' />
                </div>
              </Grid>
              <Grid xs={12} md={5}>
                <div className='brand'>
                  <Typography variant='h3'>API Aggregation Brand</Typography>
                  <Typography variant='body1'>
                    We are committed to the achievement of providing a highly
                    stable enterprise-level 2000Mbps bandwidth service. It
                    exclusively utilizes official high-speed enterprise
                    channels, avoiding low-cost alternatives.
                  </Typography>
                </div>

                <div className='model-actions'>
                  <button variant='contained' className='btn'>
                    Create an account
                  </button>
                  <button variant='outlined' className='sec-button'>
                    See Pricing
                  </button>
                </div>
              </Grid>
            </Grid>
          </Container>
        </section>
        <section className='slider-section'>
          <Slider {...settings}>
            {[
              {
                icon: Chart,
                title: 'Pay by Volume',
                description:
                  'Enjoy free enterprise-level cloud database (RDS) with unlimited speed...',
              },
              {
                icon: Bag,
                title: 'Seamless billing solutions',
                description:
                  'The current charging rate of RMB 0.055/GB/month...',
              },
              {
                icon: Zap,
                title: 'Consumption Tracking',
                description:
                  'Detailed usage data on cloud resources such as storage, network, and compute is provided...',
              },
              {
                icon: Gift,
                title: 'Free Quota',
                description:
                  'Receive a free quota for initial instance creation and usage, helping you get started without upfront costs...',
              },
            ].map((item, index) => (
              <div key={index}>
                <div className='slider-item'>
                  <div className='slider-inner'>
                    <div className='icon'>
                      <img src={item.icon} alt={item.title} />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <h6>
                    See Pricing <FaArrowRight />
                  </h6>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        <section className='hero api-fast-sec'>
          <div className='content'>
            <div className='api-fast-head'>
              <img src={ApiFast} alt='' />
              <h1>Get API and start your journey</h1>
            </div>
            <p>
              After logging in, visit and click Token - Add a new token. The
              token limit is set to $1 for every 500,000. After adding
              successfully, you can click Copy APIKEY
            </p>
            <div className='dashboard-preview'>
              <img src={Dashboar2} alt='DuckAGI Dashboard' />
              <img src={Light} alt='' className='light' />
            </div>
          </div>
        </section>
        <section className='support-model'>
          <div className='content'>
            <h3>Support Model</h3>
            <p>
              Real-time update of the latest global models, first-hand sources
            </p>
          </div>
          <Slider {...settings} className='support-model-slider'>
            <div className='slider-item'>
              <div className='slider-inner'>
                <h3>Pay by Volume</h3>
                <p>
                  Enjoy free enterprise-level cloud database (RDS) with
                  unlimited speed, high concurrency, and intelligent load
                  balancing. It ensures fast responses and reduced failure rates
                  without risks of quota expiration or account suspension.
                </p>
              </div>
              <h6>
                See Pricing <FaArrowRight />
              </h6>
            </div>
            <div className='slider-item'>
              <div className='slider-inner'>
                <h3>Seamless billing solutions</h3>
                <p>
                  The current charging rate of RMB 0.055/GB/month is used for
                  billing. This rate is applied similarly to all instances using
                  the same configuration, providing a straightforward and
                  transparent billing experience.
                </p>
              </div>
              <h6>
                See Pricing <FaArrowRight />
              </h6>
            </div>
            <div className='slider-item'>
              <div className='slider-inner'>
                <h3>Consumption Tracking</h3>
                <p>
                  Detailed usage data on cloud resources such as storage,
                  network, and compute is provided. This allows you to track and
                  manage your consumption according to your business needs.
                </p>
              </div>
              <h6>
                See Pricing <FaArrowRight />
              </h6>
            </div>
            <div className='slider-item'>
              <div className='slider-inner'>
                <h3>Free Quota</h3>
                <p>
                  Receive a free quota for initial instance creation and usage,
                  helping you get started without upfront costs.
                </p>
              </div>
              <h6>
                See Pricing <FaArrowRight />
              </h6>
            </div>
          </Slider>
          <Container maxWidth='lg' className='guide-container'>
            <Grid container spacing={4} alignItems='center' gap={8}>
              <Grid xs={12} md={6}>
                <div className='guide-left'>
                  <Typography variant='h4' className='guide-title'>
                    Quick start guide
                  </Typography>

                  <Typography variant='body1' className='guide-steps'>
                    1 second use: Click on the token , create a token, and click
                    [Chat] behind the token to import and use it with one click
                  </Typography>

                  <div className='guide-actions'>
                    <button className='sec-button'>See Pricing</button>
                    <button className='btn'>Create an account</button>
                  </div>
                </div>
              </Grid>
              <Grid xs={12} md={5}>
                <p className='guide-description'>
                  Our program has been redeveloped (can be deployed on behalf of
                  others) and supports the use of all models on our website.
                  After selecting a model, there will be an upload button. It
                  supports uploading all types of files for analysis, official
                  multimodal analysis, speech to text (whisper-1), text to
                  speech (tts1), GPTS, 🎨 Midjourney drawing. If you cannot find
                  the model you need, please enter the model name in the custom
                  model and select it.
                </p>
              </Grid>
            </Grid>
          </Container>
        </section>
        <FAQ />
        <section>
          <Container
            maxWidth='lg'
            className='contact-container access-container'
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box className='contact-header'>
                  <h4>{t('访问教程')}</h4>
                  <Typography variant='body1'>
                    {t(
                      '默认情况下启用 CC 和 DDOS 保护。对于高并发用户（每秒超过1000次），请提前联系我们将其添加到白名单中，否则您可能无法访问或请求',
                    )}
                  </Typography>
                </Box>
                <Box className='contact-section'>
                  <Typography variant='subtitle1'>
                    {t('主站接口地址')}
                  </Typography>
                  <ul>
                    <li>
                      <a href='#'>support@duckapi.com</a>
                    </li>
                    <li>
                      <a href='#'>support@duckapi.com</a>
                    </li>
                  </ul>
                  <Typography variant='subtitle1'>
                    Different clients need to fill in different BASE_URL, please
                    try the following address
                  </Typography>
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
                <div className='access-button'>
                  <button className='sec-button'>
                    Mid Journey {t('使用权')}
                  </button>
                </div>
              </Grid>
              <Grid item xs={12} md={6} className='tutorial-container'>
                <Box className='tutorial-content'>
                  <Typography variant='h5' className='tutorial-title'>
                    Python Call
                  </Typography>

                  <Box className='tutorial-steps'>
                    <Typography variant='h6'>{t('方法一')}</Typography>
                    <Box className='code-block'>
                      <Typography>
                        import openai openai.api_base =
                        "https://api.duckagi.com/v1"
                      </Typography>
                    </Box>

                    <Typography variant='h6'>
                      {t('方法2（如果方法1不起作用，则使用此方法）')}
                    </Typography>
                    <Typography>{t('修改环境变量')}</Typography>
                    <Typography>
                      {t(
                        'OPENAI_API_BASE。请搜索如何更改每个系统的环境变量。如果修改环境变量不起作用，请重新启动系统。',
                      )}
                    </Typography>

                    <Typography>OPENAI_API_BASE = </Typography>
                    <Box className='code-block'>
                      <Typography>https://api.duckagi.com/v1</Typography>
                    </Box>

                    <Box className='link-text'>
                      <Typography>{t('点击查看接入文档')}</Typography>
                    </Box>
                  </Box>

                  <KeyboardArrowUpIcon className='collapse-icon' />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </section>
        <Contact />
      </div>
    </>
  );
};

export default Home;
