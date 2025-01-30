import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { Container, Typography, Box, Grid, Chip, Avatar } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import styles from './SingleBlogPage.module.css';
import formatDate from '../../helpers/formatdate';
import Markdown from './_component/Markdown';

const SingleBlogPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const baseUrl = 'http://localhost:1337';
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:1337/api/articles?filters[slug][$eq]=${slug}&status=published&locale=en&populate=*`,
        );
        setBlog(response.data.data[0]); // Access the first item in the array
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]); // Add slug as dependency
  console.log(blog);
  const markdown = blog?.blocks.filter(
    (item) => item.__component === 'shared.rich-text',
  );
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Container maxWidth='lg' className={styles.blogContainer}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <article className={styles.mainContent}>
            <h1 className={styles.blogTitle}>{blog?.title}</h1>
            <Box className={styles.metaInfo}>
              <Chip
                icon={<CalendarTodayIcon />}
                label={formatDate(blog?.publishedAt)}
                variant='outlined'
                size='small'
                className={styles.chip}
              />
              {/* <Chip
                icon={<AccessTimeIcon />}
                label='8 min read'
                variant='outlined'
                size='small'
                className={styles.chip}
              /> */}
            </Box>
            <Box className={styles.authorInfo}>
              <Avatar
                src='/placeholder.svg?height=50&width=50'
                className={styles.avatar}
              />
              <h6 className={styles.authorName}>{blog?.author?.name}</h6>
            </Box>
            <div className='blog-featured-image'>
              <img
                src={`${baseUrl}${blog?.cover?.formats?.thumbnail?.url}`}
                alt={blog?.cover?.formats?.thumbnail?.name}
                className={styles.featuredImage}
              />
            </div>
            <div className='blog-content'>
              <Markdown items={markdown} />
            </div>
            {/* <Typography variant='body1' className={styles.blogContent}>
              AI is rapidly evolving and APIs are getting more flexible to
              deploy and manage with the help of AI. In this article, we'll
              explore how to ship scalable products across teams using
              AI-powered APIs.
            </Typography>
            <Typography variant='body1' className={styles.blogContent}>
              The integration of AI into API development has revolutionized how
              we approach scalability and management. By leveraging machine
              learning algorithms, we can now create APIs that adapt to changing
              loads, predict usage patterns, and optimize performance in
              real-time.
            </Typography>
            <Typography variant='h2' className={styles.sectionTitle}>
              Key Benefits of AI-Powered APIs
            </Typography>
            <ul className={styles.blogList}>
              <li>Automatic scaling based on predicted traffic patterns</li>
              <li>Intelligent request routing for optimal performance</li>
              <li>Anomaly detection and proactive error handling</li>
              <li>Continuous optimization through machine learning</li>
            </ul>
            <Typography variant='body1' className={styles.blogContent}>
              By implementing these AI-driven features, development teams can
              focus on building innovative features while the API infrastructure
              handles scalability and performance concerns automatically.
            </Typography> */}
          </article>
        </Grid>
        {/* <Grid item xs={12} md={4}>
          <aside className={styles.sidebar}>
            <Typography variant="h2" className={styles.sidebarTitle}>
              Recent Posts
            </Typography>
            {[1, 2, 3].map((post) => (
              <div key={post} className={styles.recentPost}>
                <img
                  src={`/placeholder.svg?height=80&width=80`}
                  alt={`Recent post ${post}`}
                  className={styles.recentPostImage}
                />
                <div className={styles.recentPostContent}>
                  <Typography variant="subtitle1" className={styles.recentPostTitle}>
                    The future of AI for seamless APIs
                  </Typography>
                  <Typography variant="caption" className={styles.recentPostMeta}>
                    5 min read
                  </Typography>
                </div>
              </div>
            ))}
          </aside>
        </Grid> */}
      </Grid>
    </Container>
  );
};

export default SingleBlogPage;
