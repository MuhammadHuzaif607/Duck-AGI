import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';

const faqData = [
  {
    question: t('什么是交通 API？为什么应该使用中转 API？'),
    answer:
      t('首先，如果你使用GPT-4，那么使用GPT-4并不是你日常使用的系统。我是OpenAI的GPT-3模型。原因是OpenAI开放给API调用的GPT-4的训练数据是2021年12月之前的，系统训练完后，知识库不更新是不可能的。因此，如果想要使用GPT-4来获取最新的信息，那么通过中转获取到的信息一定是错误的。'),
  },
  {
    question: t('如何判断是否是GPT-4型号？'),
    answer: 'Information about determining GPT-4 model...',
  },
  {
    question:
      'Why does the token created in the backend not show the used amount?',
    answer: 'Explanation about token usage visibility...',
  },
  {
    question: 'Unable to Login',
    answer: 'Troubleshooting steps for login issues...',
  },
];

const FAQ = () => {
  const {t} = useTranslation();
  return (
    <section className='faq-section'>
      <Container maxWidth='lg' className='faq-container'>
        <Typography variant='h4' className='faq-title'>
        {t('常见问题')}
        </Typography>

        <div className='faq-list'>
          {faqData.map((faq, index) => (
            <Accordion key={index} className='faq-accordion'>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                className='faq-summary'
              >
                <Typography>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails className='faq-details'>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>

        <button className='sec-button'>{t('查看更多')}</button>
      </Container>
    </section>
  );
};

export default FAQ;
