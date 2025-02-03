import { Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import DashboardImage from './images/about-1.png';
import InnovationImage from './images/about-2.png';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  return (
    <div className='hero-container'>
      {/* First Section */}
      <Container maxWidth='lg'>
        <Grid
          container
          spacing={4}
          className='hero-section'
          justifyContent='space-between'
        >
          <Grid xs={12} md={6} className='content-left'>
            <div className='about-sec'>
              <Typography variant='h1'>
                {t('我们是鸭子')} <span>AGI</span>
              </Typography>
              <Typography variant='body1'>
                {t(
                  '在 DuckAGI，我们努力利用人工智能的力量来简化复杂的流程，让不可能成为可能。我们的使命是创造与日常生活无缝集成的尖端 AGI 技术和突破性解决方案，使个人和企业能够事半功倍。',
                )}
              </Typography>
              <div className='button-group'>
                <button className='btn'>{t('创建一个帐户')}</button>
                <button className='sec-button'>{t('查看定价')}</button>
              </div>
            </div>
          </Grid>
          <Grid xs={12} md={6} className='image-container'>
            <img src={DashboardImage} alt='Dashboard' className='hero-image' />
          </Grid>
        </Grid>
        <Grid container spacing={4} className='hero-section reverse' justifyContent='space-between'>
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
                {t('由创新和人工智能数据驱动')}
              </Typography>
              <Typography variant='body1' className='hero-description'>
                {t(
                  '我们以创新为动力，以对人工智能道德的承诺为指导，并受到技术变革潜力的启发。 DuckAGI 的平台设计直观、适应性强且可靠，能够精确、高效地满足各行业的多样化需求。',
                )}
              </Typography>
              <Typography variant='body1' className='hero-description'>
                {t(
                  '无论您是要实现工作流程自动化、优化决策制定，还是探索创造力的新领域，DuckAGI 都能为您的旅程提供支持。我们正在共同塑造一个更智能、更互联的未来',
                )}
              </Typography>
              <div className='button-group'>
                <button className='sec-button'>{t('查看定价')}</button>
                <button className='btn'>{t('创建一个帐户')}</button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default About;
