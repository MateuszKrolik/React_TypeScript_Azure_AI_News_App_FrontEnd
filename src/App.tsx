import React, { useState } from 'react';
import { Grid, Container, Typography, Button } from '@mui/material';
import { useNewsApp } from './hooks/useNewsApp';
import CitySelector from './components/CitySelector';
import NewsList from './components/NewsList';
import Chat from './components/Chat';

const App: React.FC = () => {
  const {
    cities,
    news,
    chatMessages,
    userMessage,
    setUserMessage,
    fetchNews,
    handleSendMessage,
  } = useNewsApp();

  const [selectedCity, setSelectedCity] = useState<string>('');

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: '100vh' }}
    >
      <Grid item xs={12} sm={8} md={6}>
        <Container>
          <Typography variant="h4" gutterBottom>
            Local News App
          </Typography>
          <CitySelector
            cities={cities}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => fetchNews(selectedCity)}
          >
            Get News
          </Button>
          <NewsList news={news} />
          <Chat
            chatMessages={chatMessages}
            userMessage={userMessage}
            setUserMessage={setUserMessage}
            handleSendMessage={handleSendMessage}
          />
        </Container>
      </Grid>
    </Grid>
  );
};

export default App;
