import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { NewsArticle } from '../api-client';

interface NewsListProps {
  news: NewsArticle[]; 
}

const NewsList: React.FC<NewsListProps> = ({ news }) => {
  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ marginTop: '20px' }}>
        News Articles
      </Typography>
      <List>
        {news.map((article) => (
          <ListItem key={article.title || 'Untitled'}>
            <ListItemText
              primary={article.title || 'Untitled'}
              secondary={article.content || 'No content available'}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default NewsList;
