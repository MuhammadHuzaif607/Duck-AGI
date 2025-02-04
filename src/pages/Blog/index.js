import React, { useEffect, useState } from 'react';
import {
  Container,
  TextField,
  Typography,
  Card,
  CardContent,
  CardMedia,
  InputAdornment,
  Box,
  Grid,
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { Spin } from '@douyinfe/semi-ui';
import { Link } from 'react-router-dom';
import WebFooter from '../../components/custom/Footer';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [blogs, setBlogs] = useState([]); // Fetched blogs
  const [filteredBlogs, setFilteredBlogs] = useState([]); // Filtered blogs
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch blog data from Strapi
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          'http://localhost:1337/api/articles?populate=*',
        );
        setBlogs(response.data.data); // Set the original blog data
        setFilteredBlogs(response.data.data); // Initially, filtered blogs are the same as the fetched blogs
        setLoading(false); // Data fetched, stop loading
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchBlogs();
  }, []);

  const baseUrl = 'http://localhost:1337';
  if (loading) {
    return <CircularProgress color='secondary' />;
  }

  const searchHandler = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    // Filter the blogs based on the search term without mutating the original blogs state
    const filteredPosts = blogs.filter((post) => {
      const title = post.title || '';
      const description = post.description || '';
      return (
        title.toLowerCase().includes(searchValue) ||
        description.toLowerCase().includes(searchValue)
      );
    });
    setFilteredBlogs(filteredPosts); // Set the filtered blogs
  };
  return (
    <>
    <Container maxWidth='lg' className='blog-container'>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box className='blog-header'>
            <Typography variant='h4' className='blog-title'>
              Our Blog
            </Typography>

            <TextField
              fullWidth
              placeholder='Search'
              variant='outlined'
              className='search-field'
              value={searchTerm}
              onChange={searchHandler}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <div className='blogs'>
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((post) => (
                <Grid xs={12} md={6} key={post.id}>
                  <Card className='blog-card'>
                    <Link to={`/blog/${post.slug}`}>
                      <CardMedia
                        component='img'
                        height='200'
                        image={`${baseUrl}${post.cover.formats.thumbnail.url}`}
                        alt={post.title}
                        className='blog-card-media'
                      />
                      <CardContent className='blog-card-content'>
                        <Typography variant='h6' className='blog-card-title'>
                          {post.title}
                        </Typography>
                        <Typography
                          variant='body2'
                          className='blog-card-description'
                        >
                          {post.description}
                        </Typography>
                        <p className='blog-card-date'>
                          Posted on{' '}
                          <span>{new Date(post.createdAt).toDateString()}</span>
                        </p>
                      </CardContent>
                    </Link>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography>No blogs found</Typography>
            )}
          </div>
        </Grid>
      </Grid>
    </Container>
          
    <WebFooter />
    </>
  );
};

export default Blog;
