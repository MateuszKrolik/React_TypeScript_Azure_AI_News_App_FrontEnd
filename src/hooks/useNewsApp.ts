import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance'; // Import the axios instance
import { City, NewsArticle } from '../api-client';

export const useNewsApp = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [chatMessages, setChatMessages] = useState<
    { sender: 'User' | 'Bot'; text: string }[]
  >([]);
  const [userMessage, setUserMessage] = useState<string>('');

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axiosInstance.get('/api/cities'); // Use the axios instance
        setCities(response.data);
        console.log('Cities fetched:', response.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []);

  const fetchNews = async (selectedCity: string) => {
    if (selectedCity) {
      try {
        const response = await axiosInstance.post('/api/news', `Recent events in ${selectedCity}.`); // Use the axios instance
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    }
  };

  const handleSendMessage = async () => {
    if (userMessage.trim()) {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'User', text: userMessage },
      ]);
      setUserMessage('');

      try {
        const response = await axiosInstance.post('/api/news', userMessage); // Use the axios instance
        const botResponse = response.data
          .map((article: { title: String; content: String; }) => `${article.title}: ${article.content}`)
          .join('\n');
        setChatMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'Bot', text: botResponse || 'No news found.' },
        ]);
      } catch (error) {
        console.error('Error sending message to chat:', error);
        setChatMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'Bot', text: 'Sorry, I could not process your request.' },
        ]);
      }
    }
  };

  return {
    cities,
    news,
    chatMessages,
    userMessage,
    setUserMessage,
    fetchNews,
    handleSendMessage,
  };
};

// import { useEffect, useState } from 'react';
// import { NewsControllerApi, City, NewsArticle } from '../api-client';

// export const useNewsApp = () => {
//   const [cities, setCities] = useState<City[]>([]);
//   const [news, setNews] = useState<NewsArticle[]>([]);
//   const [chatMessages, setChatMessages] = useState<
//     { sender: 'User' | 'Bot'; text: string }[]
//   >([]);
//   const [userMessage, setUserMessage] = useState<string>('');
//   const apiClient = new NewsControllerApi();

//   useEffect(() => {
//     const fetchCities = async () => {
//       try {
//         const response = await apiClient.getCities();
//         setCities(response.data);
//         console.log('Cities fetched:', response.data);
//       } catch (error) {
//         console.error('Error fetching cities:', error);
//       }
//     };

//     fetchCities();
//   }, []);

//   const fetchNews = async (selectedCity: string) => {
//     if (selectedCity) {
//       try {
//         const response = await apiClient.getNews(
//           `Recent events in ${selectedCity}.`
//         );
//         setNews(response.data);
//       } catch (error) {
//         console.error('Error fetching news:', error);
//       }
//     }
//   };

//   const handleSendMessage = async () => {
//     if (userMessage.trim()) {
//       setChatMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: 'User', text: userMessage },
//       ]);
//       setUserMessage('');

//       try {
//         const response = await apiClient.getNews(userMessage);
//         const botResponse = response.data
//           .map((article) => `${article.title}: ${article.content}`)
//           .join('\n');
//         setChatMessages((prevMessages) => [
//           ...prevMessages,
//           { sender: 'Bot', text: botResponse || 'No news found.' },
//         ]);
//       } catch (error) {
//         console.error('Error sending message to chat:', error);
//         setChatMessages((prevMessages) => [
//           ...prevMessages,
//           { sender: 'Bot', text: 'Sorry, I could not process your request.' },
//         ]);
//       }
//     }
//   };

//   return {
//     cities,
//     news,
//     chatMessages,
//     userMessage,
//     setUserMessage,
//     fetchNews,
//     handleSendMessage,
//   };
// };
