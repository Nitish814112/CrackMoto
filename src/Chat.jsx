import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('https://server2-ten-umber.vercel.app', {  // Ensure this matches your server URL
  transports: ['websocket'],  // Prefer WebSocket transport
  withCredentials: true
});

function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    socket.on('server message', (msg) => {
      console.log('Message received from server:', msg);
      setMessages(prevMessages => [...prevMessages, msg]);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });

    return () => {
      socket.off('server message');
    };
  }, []);

  const sendMessage = async () => {
    try {
      await axios.post('https://server2-ten-umber.vercel.app/send', { message });
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get('https://server2-ten-umber.vercel.app/receive');
      console.log('Messages from server:', response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
    </div>
  );
}

export default Chat;
