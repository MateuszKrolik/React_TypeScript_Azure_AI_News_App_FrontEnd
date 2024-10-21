import React from 'react';
import { TextField, Button, Paper, Box, Typography } from '@mui/material';

interface ChatProps {
  chatMessages: { sender: 'User' | 'Bot'; text: string }[];
  userMessage: string;
  setUserMessage: (message: string) => void;
  handleSendMessage: () => void;
}

const Chat: React.FC<ChatProps> = ({
  chatMessages,
  userMessage,
  setUserMessage,
  handleSendMessage,
}) => {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Chat
      </Typography>
      <Paper style={{ maxHeight: '200px', overflowY: 'auto', padding: '10px' }}>
        {chatMessages.map((message, index) => (
          <Box
            key={index}
            style={{ textAlign: message.sender === 'User' ? 'right' : 'left' }}
          >
            <strong>{message.sender}:</strong> {message.text}
          </Box>
        ))}
      </Paper>
      <TextField
        fullWidth
        variant="outlined"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder="Type your message..."
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSendMessage}>
        Send
      </Button>
    </>
  );
};

export default Chat;
