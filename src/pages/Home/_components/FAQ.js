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

const faqData = [
  {
    question: 'What is the transit API? Why should I use the transit API?',
    answer:
      "First of all, if you use GPT-4, the use GPT-4 is not your daily system. I am OpenAI's GPT-3 model. The reason for this is that the training data of GPT-4 that OpenAI opens to API calls was before December 2021. After the system was trained, it is not possible that the knowledge base will not be updated. Therefore, if you want to use GPT-4 to get the latest information, the information obtained through the transit must be wrong.",
  },
  {
    question: "Why can ChatGPT Plus's GPT-4 answer that it is GPT-4?",
    answer: 'Detailed answer about ChatGPT Plus and GPT-4...',
  },
  {
    question: 'How do I determine whether it is GPT-4 model?',
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
  return (
    <section className='faq-section'>
      <Container maxWidth='lg' className='faq-container'>
        <Typography variant='h4' className='faq-title'>
          Frequently Asked Questions
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

        <button className='sec-button'>See more</button>
      </Container>
    </section>
  );
};

export default FAQ;
